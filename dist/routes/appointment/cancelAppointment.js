"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CancelAppointment;
const mongo_1 = require("../../mongo/mongo");
const mongodb_1 = require("mongodb");
async function CancelAppointment(req, res) {
    try {
        const { _id } = req.body;
        if (!_id || typeof _id !== "string") {
            return res.status(400).json({ error: "Invalid appointment ID provided" });
        }
        const updateFields = {
            updatedAt: new Date(),
        };
        const existingAppointment = await (0, mongo_1.collection)("citas").findOne({
            _id: new mongodb_1.ObjectId(_id),
        });
        if (!existingAppointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        if (existingAppointment.estado === "cancelada") {
            return res.status(400).json({ error: "Appointment is already canceled" });
        }
        const appointmentResult = await (0, mongo_1.collection)("citas").findOneAndUpdate({ _id: new mongodb_1.ObjectId(_id) }, { $set: { ...updateFields, estado: "cancelada" } }, { returnDocument: "after" });
        if (!appointmentResult) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        const { fechaHora, abogadoUid } = appointmentResult;
        if (fechaHora && abogadoUid) {
            // Convert fechaHora to a Date object if it's a string
            const fechaHoraDate = new Date(fechaHora);
            const abogadoResult = await (0, mongo_1.collection)("abogados").findOneAndUpdate({
                uid: abogadoUid,
                "excepcionesFechas.fechaHora": fechaHoraDate,
            }, {
                $pull: {
                    excepcionesFechas: {
                        fechaHora: fechaHoraDate,
                    },
                },
                $set: { updatedAt: new Date() },
            }, { returnDocument: "after" });
            if (!abogadoResult) {
                console.warn(`Abogado with uid ${abogadoUid} not found or fechaHora not in excepcionesFechas`);
            }
        }
        res.status(200).json(appointmentResult);
    }
    catch (error) {
        console.error("Error updating appointment:", error);
        res
            .status(500)
            .json({ error: "Internal server error", details: error.message });
    }
}
//# sourceMappingURL=cancelAppointment.js.map