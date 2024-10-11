// updateNews.ts
import { collection } from "../../mongo/mongo";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";

type News = {
  title: string;
  description: string;
  image: string;
  date: string;
};

export default async function UpdateNews(req: Request, res: Response) {
  try {
    const { id, ...updateData } = req.body;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Invalid news ID provided" });
    }

    const updateFields: Partial<News> = {
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

    const updateResult = await collection("noticias").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateFields },
      { returnDocument: "after" }
    );

    if (!updateResult) {
      return res.status(404).json({ error: "News article not found" });
    }

    res.status(200).json(updateResult);
  } catch (error) {
    console.error("Error updating news:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}
