// updateAttorney.ts
import { collection } from "../../mongo/mongo";
import { Request, Response } from "express";
import { Attorney } from "./attorneyTypes";
import { ObjectId } from "mongodb";

export default async function UpdateAttorney(req: Request, res: Response) {
  try {
    const { uid, ...updateData } = req.body;

    if (!uid || typeof uid !== "string") {
      return res.status(400).json({ error: "Invalid attorney UID provided" });
    }

    const updateFields: Partial<Attorney> = {
      ...updateData,
      updatedAt: new Date(),
    };

    if (updateFields.excepcionesFechas) {
      updateFields.excepcionesFechas = updateFields.excepcionesFechas.map(
        (exc) => ({
          ...exc,
          fechaHora: new Date(exc.fechaHora),
        })
      );
    }

    const updateResult = await collection("abogados").findOneAndUpdate(
      { uid: uid },
      { $set: updateFields },
      { returnDocument: "after" }
    );

    if (!updateResult) {
      return res.status(404).json({ error: "Attorney not found" });
    }

    res.status(200).json(updateResult);
  } catch (error) {
    console.error("Error updating attorney:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}
