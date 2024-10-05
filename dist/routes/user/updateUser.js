"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UpdateUser;
const mongo_1 = require("../../mongo/mongo");
async function UpdateUser(req, res) {
    try {
        const { uid, ...updateData } = req.body;
        if (!uid || typeof uid !== "string") {
            return res.status(400).json({ error: "Invalid UID provided" });
        }
        const updateFields = {
            ...updateData,
            updatedAt: new Date(),
        };
        if (updateFields.fechaDeNacimiento) {
            updateFields.fechaDeNacimiento = new Date(updateFields.fechaDeNacimiento);
        }
        const updateResult = await (0, mongo_1.collection)("usuarios").findOneAndUpdate({ uid }, { $set: updateFields }, { returnDocument: "after" });
        if (!updateResult) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(updateResult);
    }
    catch (error) {
        console.log("Error updating user:", error);
        res
            .status(500)
            .json({ error: "Internal server error", details: error.message });
    }
}
//# sourceMappingURL=updateUser.js.map