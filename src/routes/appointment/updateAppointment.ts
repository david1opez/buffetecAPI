// updateAppointment.ts
import { collection } from "../../mongo/mongo";
import { Request, Response } from "express";
import { Appointment, AppointmentStatus } from "./appointmentTypes";
import { ObjectId } from "mongodb";

export default async function UpdateAppointment(req: Request, res: Response) {
  try {
    const { _id, ...updateData } = req.body;

    if (!_id || typeof _id !== "string") {
      return res.status(400).json({ error: "Invalid appointment ID provided" });
    }

    const updateFields: Partial<Appointment> = {
      ...updateData,
      updatedAt: new Date(),
    };

    if (updateFields.fechaHora) {
      updateFields.fechaHora = new Date(updateFields.fechaHora);
    }

    if (updateFields.estado && !isValidStatus(updateFields.estado)) {
      return res.status(400).json({ error: "Invalid appointment status" });
    }

    const updateResult = await collection("citas").findOneAndUpdate(
      { _id: new ObjectId(_id) },
      { $set: updateFields },
      { returnDocument: "after" }
    );

    if (!updateResult) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json(updateResult);
  } catch (error) {
    console.error("Error updating appointment:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}

function isValidStatus(status: any): status is AppointmentStatus {
  return ["pendiente", "confirmada", "cancelada", "completada"].includes(
    status
  );
}
