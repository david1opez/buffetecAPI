import { collection } from "../../mongo/mongo";
import { Request, Response } from "express";

type News = {
    title: string;
    description: string;
    image: string;
    date: string;
}

export default async function CreateNews(req: Request, res: Response) {
  try {
    const { news }: { news: News } = req.body;

    if (!news) {
      return res.status(400).send("No news provided");
    } else if (
      !news.title ||
      !news.description ||
      !news.image
    ) {
      return res.status(400).send("Missing news fields");
    }

    news.date = new Date().toDateString();

    const result = await collection("noticias").insertOne(news);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
        error: "Internal server error",
        details: error.message
    });
  }
}
