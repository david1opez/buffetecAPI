"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UpdateAttorney;
// updateAttorney.ts
const mongo_1 = require("../../mongo/mongo");
async function UpdateAttorney(req, res) {
    try {
        const { uid, ...updateData } = req.body;
        if (!uid || typeof uid !== "string") {
            return res.status(400).json({ error: "Invalid attorney UID provided" });
        }
        const updateFields = {
            ...updateData,
            updatedAt: new Date(),
        };
        if (updateFields.excepcionesFechas) {
            updateFields.excepcionesFechas = updateFields.excepcionesFechas.map((exc) => ({
                ...exc,
                fechaHora: new Date(exc.fechaHora),
            }));
        }
        const updateResult = await (0, mongo_1.collection)("abogados").findOneAndUpdate({ uid: uid }, { $set: updateFields }, { returnDocument: "after" });
        if (!updateResult) {
            return res.status(404).json({ error: "Attorney not found" });
        }
        res.status(200).json(updateResult);
    }
    catch (error) {
        console.error("Error updating attorney:", error);
        res
            .status(500)
            .json({ error: "Internal server error", details: error.message });
    }
}
//# sourceMappingURL=updateAttorney.js.map