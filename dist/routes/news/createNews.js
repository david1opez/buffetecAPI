"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreateNews;
const mongo_1 = require("../../mongo/mongo");
async function CreateNews(req, res) {
    try {
        const { news } = req.body;
        if (!news) {
            return res.status(400).send("No news provided");
        }
        else if (!news.title ||
            !news.description ||
            !news.image) {
            return res.status(400).send("Missing news fields");
        }
        news.date = new Date().toDateString();
        const result = await (0, mongo_1.collection)("noticias").insertOne(news);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
}
//# sourceMappingURL=createNews.js.map