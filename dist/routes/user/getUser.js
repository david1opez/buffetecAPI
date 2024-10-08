"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GetUser;
// getUser.ts
const mongo_1 = require("../../mongo/mongo");
async function GetUser(req, res) {
    try {
        const { uid } = req.query;
        if (!uid || typeof uid !== "string") {
            return res.status(400).send("Invalid UID provided");
        }
        const userDoc = await (0, mongo_1.collection)("usuarios").findOne({ uid });
        if (!userDoc) {
            return res.status(404).send("User not found");
        }
        const user = {
            uid: userDoc.uid,
            nombre: userDoc.nombre,
            genero: userDoc.genero,
            celular: userDoc.celular,
            email: userDoc.email,
            fechaDeNacimiento: userDoc.fechaDeNacimiento,
            tipo: userDoc.tipo,
        };
        res.status(200).json(user);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Internal server error", details: error.message });
    }
}
//# sourceMappingURL=getUser.js.map