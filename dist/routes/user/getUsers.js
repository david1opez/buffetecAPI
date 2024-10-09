"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GetUsers;
// getUser.ts
const mongo_1 = require("../../mongo/mongo");
async function GetUsers(req, res) {
    try {
        const userDoc = await (0, mongo_1.collection)("usuarios").find().toArray();
        if (!userDoc) {
            return res.status(404).send("User not found");
        }
        res.status(200).json(userDoc);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Internal server error", details: error.message });
    }
}
//# sourceMappingURL=getUsers.js.map