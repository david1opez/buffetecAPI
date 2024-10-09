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
        const updateResult = await (0, mongo_1.collection)("citas").findOneAndUpdate({ _id: new mongodb_1.ObjectId(_id) }, { $set: { ...updateFields, estatus: "cancelada" } }, { returnDocument: "after" });
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
//# sourceMappingURL=cancelAppointment.js.map