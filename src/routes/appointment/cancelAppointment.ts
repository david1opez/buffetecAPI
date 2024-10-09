import { collection } from "../../mongo/mongo";
import { Request, Response } from "express";
import { Appointment } from "./appointmentTypes";
import { ObjectId } from "mongodb";

export default async function CancelAppointment(req: Request, res: Response) {
  try {
    const { _id } = req.body;

    if (!_id || typeof _id !== "string") {
      return res.status(400).json({ error: "Invalid appointment ID provided" });
    }

    const updateFields: Partial<Appointment> = {
      updatedAt: new Date(),
    };

    const existingAppointment = await collection("citas").findOne({
      _id: new ObjectId(_id),
    });

    if (!existingAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    if (existingAppointment.estado === "cancelada") {
      return res.status(400).json({ error: "Appointment is already canceled" });
    }

    const appointmentResult = await collection("citas").findOneAndUpdate(
      { _id: new ObjectId(_id) },
      { $set: { ...updateFields, estado: "cancelada" } },
      { returnDocument: "after" }
    );

    if (!appointmentResult) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    const { fechaHora, abogadoUid } = appointmentResult;

    if (fechaHora && abogadoUid) {
      const fechaHoraDate = new Date(fechaHora);

      const abogadoResult = await collection("abogados").findOneAndUpdate(
        {
          uid: abogadoUid,
          "excepcionesFechas.fechaHora": fechaHoraDate,
        },
        {
          $pull: {
            excepcionesFechas: {
              fechaHora: fechaHoraDate,
            } as never,
          },
          $set: { updatedAt: new Date() },
        },
        { returnDocument: "after" }
      );

      if (!abogadoResult) {
        console.warn(
          `Abogado with uid ${abogadoUid} not found or fechaHora not in excepcionesFechas`
        );
      }
    }

    res.status(200).json(appointmentResult);
  } catch (error) {
    console.error("Error updating appointment:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}
