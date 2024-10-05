"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UpdateClientCase;
// updateClientCase.ts
const mongo_1 = require("../../mongo/mongo");
const clientCaseTypes_1 = require("./clientCaseTypes");
const mongodb_1 = require("mongodb");
async function UpdateClientCase(req, res) {
    try {
        const { _id, ...updateData } = req.body;
        if (!_id || typeof _id !== "string") {
            return res.status(400).json({ error: "ID de caso inválido" });
        }
        const updateFields = {
            ...updateData,
            updatedAt: new Date(),
        };
        if (updateFields.tipo &&
            !Object.values(clientCaseTypes_1.CasoTipo).includes(updateFields.tipo)) {
            return res.status(400).json({ error: "Tipo de caso inválido" });
        }
        if (updateFields.estado &&
            !Object.values(clientCaseTypes_1.CasoEstado).includes(updateFields.estado)) {
            return res.status(400).json({ error: "Estado de caso inválido" });
        }
        if (updateFields.citas) {
            updateFields.citas = updateFields.citas.map((cita) => ({
                ...cita,
                fecha: new Date(cita.fecha),
                estado: Object.values(clientCaseTypes_1.CitaEstado).includes(cita.estado)
                    ? cita.estado
                    : clientCaseTypes_1.CitaEstado.PENDIENTE,
            }));
        }
        const updateResult = await (0, mongo_1.collection)("casos_clientes").findOneAndUpdate({ _id: new mongodb_1.ObjectId(_id) }, { $set: updateFields }, { returnDocument: "after" });
        if (!updateResult) {
            return res.status(404).json({ error: "Caso no encontrado" });
        }
        res.status(200).json(updateResult);
    }
    catch (error) {
        console.error("Error actualizando caso de cliente:", error);
        res
            .status(500)
            .json({ error: "Error interno del servidor", details: error.message });
    }
}
//# sourceMappingURL=updateClientCase.js.map