"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CancelAppointment;
// cancelAppointment.ts
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
        if (existingAppointment.estado !== "cancelada" &&
            existingAppointment.estado !== "completada") {
            return res
                .status(400)
                .json({ error: "Appointment has to be canceled to be deleted." });
        }
        const deleteResult = await (0, mongo_1.collection)("citas").deleteOne({
            _id: new mongodb_1.ObjectId(_id),
        });
        if (!deleteResult) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        res.status(200).json("Appointment deleted.");
    }
    catch (error) {
        console.error("Error deleting appointment.", error);
        res
            .status(500)
            .json({ error: "Internal server error", details: error.message });
    }
}
//# sourceMappingURL=deleteAppointment.js.map