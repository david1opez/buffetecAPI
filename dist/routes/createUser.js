"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("../mongo/mongo");
async function CreateUser(req, res) {
    const { user } = req.body;
    if (!user) {
        return res.status(400).send('No user provided');
    }
    else if (!user.uid || !user.nombre || !user.genero || !user.celular || !user.email || !user.fechaDeNacimiento || !user.tipo) {
        return res.status(400).send('Missing user fields');
    }
    else if (user.tipo !== 'abogado' && user.tipo !== 'cliente' && user.tipo !== 'admin') {
        return res.status(400).send('Invalid user type');
    }
    const result = await (0, mongo_1.collection)('usuarios').insertOne(user);
    res.status(200).send(result);
}
exports.default = CreateUser;
//# sourceMappingURL=createUser.js.map