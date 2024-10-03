import { ObjectId } from "mongodb";
import { collection } from "../../mongo/mongo";
import { Request, Response } from "express";

type News = {
  title: string;
  description: string;
  urlToImage: string;
  date: string;
  url: string;
};

export default async function GetNews(req: Request, res: Response) {
  try {
    const includeApiNews = req.query.includeApiNews === "false";

    let apiNews: News[] = [];
    if (includeApiNews) {
      const newsApiUrl = `https://newsapi.org/v2/everything?q=leyes AND monterrey&apiKey=${process.env.NEWS_API_KEY}`;

      apiNews = await fetch(newsApiUrl)
        .then((response) => response.json())
        .then((data) =>
          data.articles.map((article) => {
            return {
              title: article.title,
              description: article.description,
              urlToImage: article.urlToImage,
              date: article.publishedAt,
              url: article.url,
            };
          })
        );
    }

    const databaseNews: News[] = (
      await collection("noticias").find().toArray()
    ).map((news) => {
      return {
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
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
}
