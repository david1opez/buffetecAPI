"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GetAppointments;
// getAppointments.ts
const mongo_1 = require("../../mongo/mongo");
async function GetAppointments(req, res) {
    try {
        const { userId, userType } = req.query;
        if (!userId || typeof userId !== "string") {
            return res.status(400).send("Invalid user ID provided");
        }
        let query = {};
        if (userType === "abogado") {
            query.abogadoUid = userId;
        }
        else if (userType === "cliente") {
            query.clienteUid = userId;
        }
        else {
            return res.status(400).send("Invalid user type");
        }
        const appointmentDocs = await (0, mongo_1.collection)("citas").find(query).toArray();
        const appointments = appointmentDocs.map((doc) => ({
            _id: doc._id,
            abogadoUid: doc.abogadoUid,
            clienteUid: doc.clienteUid,
            fechaHora: doc.fechaHora,
            estado: doc.estado,
            notas: doc.notas,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        }));
        res.status(200).json(appointments);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Internal server error", details: error.message });
    }
}
//# sourceMappingURL=getAppointments.js.map