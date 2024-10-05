import { collection } from "../../mongo/mongo";
import { Request, Response } from "express";
import { User } from "./userTypes";

export default async function UpdateUser(req: Request, res: Response) {
  try {
    const { uid, ...updateData } = req.body;

    if (!uid || typeof uid !== "string") {
      return res.status(400).json({ error: "Invalid UID provided" });
    }

    const updateFields: Partial<User> = {
      ...updateData,
      updatedAt: new Date(),
    };

    if (updateFields.fechaDeNacimiento) {
      updateFields.fechaDeNacimiento = new Date(updateFields.fechaDeNacimiento);
    }

    const updateResult = await collection("usuarios").findOneAndUpdate(
      { uid },
      { $set: updateFields },
      { returnDocument: "after" }
    );

    if (!updateResult) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updateResult);
  } catch (error) {
    console.log("Error updating user:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}
