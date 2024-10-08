"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DeleteNews;
const mongo_1 = require("../../mongo/mongo");
async function DeleteNews(req, res) {
    const { title, description, image } = req.body;
    try {
        await (0, mongo_1.collection)("noticias").deleteOne({ title, description, image });
        res.status(200).json({
            message: "News deleted successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
}
//# sourceMappingURL=deleteNews.js.map