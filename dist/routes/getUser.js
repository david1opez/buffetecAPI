"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("../mongo/mongo");
async function GetUser(req, res) {
    const { uid } = req.query;
    if (!uid) {
        return res.status(400).send('No user provided');
    }
    const user = await (0, mongo_1.collection)('usuarios').findOne({ uid });
    res.status(200).send(user);
}
exports.default = GetUser;
//# sourceMappingURL=getUser.js.map