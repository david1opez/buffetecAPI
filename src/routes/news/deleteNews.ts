import { collection } from "../../mongo/mongo";
import { Request, Response } from "express";

type News = {
    title: string;
    description: string;
    image: string;
    date: string;
}

export default async function DeleteNews(req: Request, res: Response) {
    const { title, description, image } = req.body as News;

    try {
        await collection("noticias").deleteOne({ title, description, image });

        res.status(200).json({
            message: "News deleted successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        })
    }
}