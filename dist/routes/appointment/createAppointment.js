"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreateAppointment;
const mongo_1 = require("../../mongo/mongo");
async function CreateAppointment(req, res) {
    try {
        const appointmentData = req.body;
        if (!isValidAppointment(appointmentData)) {
            console.log("Invalid appointment data", appointmentData);
            return res.status(400).send("Invalid appointment data");
        }
        const newAppointment = {
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
        const result = await (0, mongo_1.collection)("citas").insertOne(newAppointment);
        res.status(201).json({ ...newAppointment, _id: result.insertedId });
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Internal server error", details: error.message });
    }
}
function isValidAppointment(appointment) {
    const requiredFields = [
        "abogadoUid",
        "clienteUid",
        "fechaHora",
        "estado",
        "motivo",
    ];
    return (requiredFields.every((field) => appointment[field] !== undefined) &&
        ["pendiente", "confirmada", "cancelada", "completada"].includes(appointment.estado));
}
async function checkAttorneyAvailability(appointment) {
    const attorney = await (0, mongo_1.collection)("abogados").findOne({
        uid: appointment.abogadoUid,
    });
    if (!attorney)
        return false;
    const appointmentDate = new Date(appointment.fechaHora);
    const options = {
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
    console.log(attorney.horarioSemanal);
    console.log(appointmentHour);
    console.log(appointmentDay);
    if (!attorney.horarioSemanal[appointmentDay?.replaceAll("é", "e")]?.includes(appointmentHour)) {
        return false;
    }
    // Verificar si no hay excepciones para esa fecha y hora
    const hasException = attorney.excepcionesFechas.some((exc) => exc.fechaHora.getTime() === appointmentDate.getTime());
    if (hasException)
        return false;
    // Verificar si no hay otras citas en el mismo horario
    const existingAppointment = await (0, mongo_1.collection)("citas").findOne({
        abogadoUid: appointment.abogadoUid,
        fechaHora: appointment.fechaHora,
        estado: { $in: ["pendiente", "confirmada"] },
    });
    return !existingAppointment;
}
async function addAppointmentDateToExceptions(appointment) {
    const exceptionDate = {
        fechaHora: appointment.fechaHora,
        razon: `Cita programada`,
    };
    await (0, mongo_1.collection)("abogados").updateOne({ uid: appointment.abogadoUid }, {
        $push: {
            excepcionesFechas: exceptionDate,
        },
        $set: {
            updatedAt: new Date(),
        },
    });
}
//# sourceMappingURL=createAppointment.js.map