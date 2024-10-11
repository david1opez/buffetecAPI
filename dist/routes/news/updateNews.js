"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UpdateNews;
// updateNews.ts
const mongo_1 = require("../../mongo/mongo");
const mongodb_1 = require("mongodb");
async function UpdateNews(req, res) {
    try {
        const { id, ...updateData } = req.body;
        if (!id || typeof id !== "string") {
            return res.status(400).json({ error: "Invalid news ID provided" });
        }
        const updateFields = {
            ...updateData,
            updatedAt: new Date(),
        };
        // if (
        //   updateFields.title === undefined ||
        //   updateFields.description === undefined ||
        //   updateFields.image === undefined
        // ) {
        //   return res.status(400).json({ error: "Missing required fields" });
        // }
        const updateResult = await (0, mongo_1.collection)("noticias").findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { $set: updateFields }, { returnDocument: "after" });
        if (!updateResult) {
            return res.status(404).json({ error: "News article not found" });
        }
        res.status(200).json(updateResult);
    }
    catch (error) {
        console.error("Error updating news:", error);
        res
            .status(500)
            .json({ error: "Internal server error", details: error.message });
    }
}
//# sourceMappingURL=updateNews.js.map