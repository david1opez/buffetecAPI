// getAppointments.ts
import { collection } from "../../mongo/mongo";
import { Request, Response } from "express";
import { Appointment } from "./appointmentTypes";

export default async function GetAppointments(req: Request, res: Response) {
  try {
    const { userId, userType } = req.query;

    if (!userId || typeof userId !== "string") {
      return res.status(400).send("Invalid user ID provided");
    }

    let query: any = {};
    if (userType === "abogado") {
      query.abogadoUid = userId;
    } else if (userType === "cliente") {
      query.clienteUid = userId;
    } else {
      return res.status(400).send("Invalid user type");
    }

    const appointmentDocs = await collection("citas").find(query).toArray();

    const appointments: Appointment[] = appointmentDocs.map((doc) => ({
      _id: doc._id,
      abogadoUid: doc.abogadoUid,
      clienteUid: doc.clienteUid,
      fechaHora: doc.fechaHora,
      estado: doc.estado,
      notas: doc.notas,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }));

    res.status(200).json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}
