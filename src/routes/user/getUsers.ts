// getUser.ts
import { collection } from "../../mongo/mongo";
import { Request, Response } from "express";
import { User } from "./userTypes";

export default async function GetUsers(req: Request, res: Response) {
  try {
    const userDoc = await collection("usuarios").find().toArray();

    if (!userDoc) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(userDoc);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}
