"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UpdateAppointment;
// updateAppointment.ts
const mongo_1 = require("../../mongo/mongo");
const mongodb_1 = require("mongodb");
async function UpdateAppointment(req, res) {
    try {
        const { _id, ...updateData } = req.body;
        if (!_id || typeof _id !== "string") {
            return res.status(400).json({ error: "Invalid appointment ID provided" });
        }
        const updateFields = {
            ...updateData,
            updatedAt: new Date(),
        };
        if (updateFields.fechaHora) {
            updateFields.fechaHora = new Date(updateFields.fechaHora);
        }
        if (updateFields.estado && !isValidStatus(updateFields.estado)) {
            return res.status(400).json({ error: "Invalid appointment status" });
        }
        const updateResult = await (0, mongo_1.collection)("citas").findOneAndUpdate({ _id: new mongodb_1.ObjectId(_id) }, { $set: updateFields }, { returnDocument: "after" });
        if (!updateResult) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        res.status(200).json(updateResult);
    }
    catch (error) {
        console.error("Error updating appointment:", error);
        res
            .status(500)
            .json({ error: "Internal server error", details: error.message });
    }
}
function isValidStatus(status) {
    return ["pendiente", "confirmada", "cancelada", "completada"].includes(status);
}
//# sourceMappingURL=updateAppointment.js.map