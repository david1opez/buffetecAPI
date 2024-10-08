"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GetClientCases;
// getClientCases.ts
const mongo_1 = require("../../mongo/mongo");
async function GetClientCases(req, res) {
    try {
        const { clienteUid } = req.query;
        if (!clienteUid || typeof clienteUid !== "string") {
            return res.status(400).send("UID de cliente inválido");
        }
        const casosDocs = await (0, mongo_1.collection)("casos_clientes")
            .find({ clienteUid: clienteUid })
            .toArray();
        const casos = casosDocs.map((doc) => ({
            _id: doc._id,
            clienteUid: doc.clienteUid,
            tipo: doc.tipo,
            estado: doc.estado,
            descripcion: doc.descripcion,
            citas: doc.citas.map((cita) => ({
                razon: cita.razon,
                fecha: cita.fecha,
                estado: cita.estado,
            })),
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        }));
        res.status(200).json(casos);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Error interno del servidor", details: error.message });
    }
}
//# sourceMappingURL=getClientCases.js.map