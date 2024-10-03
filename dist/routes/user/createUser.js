"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("../../mongo/mongo");
async function CreateUser(req, res) {
    try {
        const { user } = req.body;
        if (!user) {
            return res.status(400).send("No user provided");
        }
        else if (!user.firebaseUID ||
            !user.nombre ||
            !user.genero ||
            !user.celular ||
            !user.email ||
            !user.fechaDeNacimiento ||
            !user.tipo) {
            return res.status(400).send("Missing user fields");
        }
        else if (user.tipo !== "abogado" &&
            user.tipo !== "cliente" &&
            user.tipo !== "admin") {
            return res.status(400).send("Invalid user type");
        }
        // Use the user data as is, let MongoDB generate its own _id
        const result = await (0, mongo_1.collection)("usuarios").insertOne(user);
        res.status(200).json(result);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Internal server error", details: error.message });
    }
}
exports.default = CreateUser;
//# sourceMappingURL=createUser.js.map