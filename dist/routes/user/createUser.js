"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreateUser;
const mongo_1 = require("../../mongo/mongo");
async function CreateUser(req, res) {
    try {
        const userData = req.body;
        if (!userData || !isValidUser(userData)) {
            return res.status(400).send("Invalid user data");
        }
        const newUser = {
            ...userData,
            fechaDeNacimiento: new Date(userData.fechaDeNacimiento),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const result = await (0, mongo_1.collection)("usuarios").insertOne(newUser);
        res.status(201).json({ ...newUser, _id: result.insertedId });
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Internal server error", details: error.message });
    }
}
function isValidUser(user) {
    const requiredFields = [
        "uid",
        "nombre",
        "genero",
        "celular",
        "email",
        "fechaDeNacimiento",
        "tipo",
    ];
    return (requiredFields.every((field) => user[field] !== undefined) &&
        ["cliente", "abogado", "admin"].includes(user.tipo));
}
//# sourceMappingURL=createUser.js.map