"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GetUser;
const mongo_1 = require("../../mongo/mongo");
async function GetUser(req, res) {
    try {
        const { uid } = req.query;
        if (!uid) {
            return res.status(400).send("No se proporcionó el UID de Firebase");
        }
        const user = await (0, mongo_1.collection)("usuarios").findOne({ firebaseUID: uid });
        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }
        res.status(200).json(user);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Error interno del servidor", details: error.message });
    }
}
//# sourceMappingURL=getUser.js.map