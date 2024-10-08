import { collection } from "../../mongo/mongo";
import { Request, Response } from "express";
import { Appointment } from "./appointmentTypes";
import { FechaExcepcion } from "../general/generalTypes";

export default async function CreateAppointment(req: Request, res: Response) {
  try {
    const appointmentData: Omit<
      Appointment,
      "_id" | "createdAt" | "updatedAt"
    > = req.body;

    if (!isValidAppointment(appointmentData)) {
      console.log("Invalid appointment data", appointmentData);
      return res.status(400).send("Invalid appointment data");
    }

    const newAppointment: Appointment = {
      ...appointmentData,
      fechaHora: new Date(appointmentData.fechaHora),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Verificar disponibilidad del abogado
    const isAvailable = await checkAttorneyAvailability(newAppointment);
    if (!isAvailable) {
      return res
        .status(409)
        .json({ error: "El abogado no está disponible en ese horario" });
    }

    // Agregar la fecha de la cita a las excepciones del abogado
    await addAppointmentDateToExceptions(newAppointment);

    const result = await collection("citas").insertOne(newAppointment);
    res.status(201).json({ ...newAppointment, _id: result.insertedId });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}

function isValidAppointment(
  appointment: any
): appointment is Omit<Appointment, "_id" | "createdAt" | "updatedAt"> {
  const requiredFields: (keyof Appointment)[] = [
    "abogadoUid",
    "clienteUid",
    "fechaHora",
    "estado",
  ];
  return (
    requiredFields.every((field) => appointment[field] !== undefined) &&
    ["pendiente", "confirmada", "cancelada", "completada"].includes(
      appointment.estado
    )
  );
}

async function checkAttorneyAvailability(
  appointment: Appointment
): Promise<boolean> {
  const attorney = await collection("abogados").findOne({
    uid: appointment.abogadoUid,
  });
  if (!attorney) return false;

  const appointmentDate = new Date(appointment.fechaHora);

  const options: Intl.DateTimeFormatOptions = {
    timeZone: "America/Monterrey",
    weekday: "short", // Correct type
    hour: "2-digit",
    minute: "2-digit",
  };
  const formatter = new Intl.DateTimeFormat("es-ES", options);

  const appointmentDay = formatter
    .formatToParts(appointmentDate)
    .find((part) => part.type === "weekday")
    ?.value.toLowerCase()
    .slice(0, 3);

  const appointmentHour = formatter
    .formatToParts(appointmentDate)
    .filter((part) => part.type === "hour" || part.type === "minute")
    .map((part) => part.value)
    .join(":");

  // Verificar si el día y la hora están en el horario semanal del abogado

  console.log(attorney.horarioSemanal[appointmentDay]);
  console.log(appointmentHour);
  
  if (!attorney.horarioSemanal[appointmentDay]?.includes(appointmentHour)) {
    return false;
  }

  // Verificar si no hay excepciones para esa fecha y hora
  const hasException = attorney.excepcionesFechas.some(
    (exc) => exc.fechaHora.getTime() === appointmentDate.getTime()
  );
  if (hasException) return false;

  // Verificar si no hay otras citas en el mismo horario
  const existingAppointment = await collection("citas").findOne({
    abogadoUid: appointment.abogadoUid,
    fechaHora: appointment.fechaHora,
    estado: { $in: ["pendiente", "confirmada"] },
  });

  return !existingAppointment;
}

async function addAppointmentDateToExceptions(
  appointment: Appointment
): Promise<void> {
  const exceptionDate: FechaExcepcion = {
    fechaHora: appointment.fechaHora,
    razon: `Cita programada`,
  };

  await collection("abogados").updateOne(
    { uid: appointment.abogadoUid },
    {
      $push: {
        excepcionesFechas: exceptionDate as never,
      },
      $set: {
        updatedAt: new Date(),
      },
    }
  );
}
