"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GetNews;
const mongo_1 = require("../../mongo/mongo");
async function GetNews(req, res) {
    try {
        const includeApiNews = req.query.includeApiNews === "false";
        let apiNews = [];
        if (includeApiNews) {
            const newsApiUrl = `https://newsapi.org/v2/everything?q=leyes AND monterrey&apiKey=${process.env.NEWS_API_KEY}`;
            apiNews = await fetch(newsApiUrl)
                .then((response) => response.json())
                .then((data) => data.articles.map((article) => {
                return {
                    title: article.title,
                    description: article.description,
                    urlToImage: article.urlToImage,
                    date: article.publishedAt,
                    url: article.url,
                };
            }));
        }
        const databaseNews = (await (0, mongo_1.collection)("noticias").find().toArray()).map((news) => {
            return {
                _id: news._id.toString(),
                title: news.title,
                description: news.description,
                urlToImage: news.image,
                date: news.date,
                url: `https://bufetecweb.vercel.app/noticias/${news._id}`,
            };
        });
        res.status(200).json({
            articles: [...apiNews, ...databaseNews],
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Internal server error",
            details: error.message,
        });
    }
}
//# sourceMappingURL=getNews.js.map