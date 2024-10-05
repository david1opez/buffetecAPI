"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreateClientCase;
// createClientCase.ts
const mongo_1 = require("../../mongo/mongo");
const clientCaseTypes_1 = require("./clientCaseTypes");
async function CreateClientCase(req, res) {
    try {
        const casoData = req.body;
        if (!isValidCasoCliente(casoData)) {
            return res.status(400).send("Datos del caso de cliente inválidos");
        }
        const newCaso = {
            ...casoData,
            citas: casoData.citas.map((cita) => ({
                ...cita,
                fecha: new Date(cita.fecha),
            })),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const result = await (0, mongo_1.collection)("casos_clientes").insertOne(newCaso);
        res.status(201).json({ ...newCaso, _id: result.insertedId });
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Error interno del servidor", details: error.message });
    }
}
function isValidCasoCliente(caso) {
    const requiredFields = [
        "clienteUid",
        "tipo",
        "estado",
        "descripcion",
        "citas",
    ];
    return (requiredFields.every((field) => caso[field] !== undefined) &&
        Object.values(clientCaseTypes_1.CasoTipo).includes(caso.tipo) &&
        Object.values(clientCaseTypes_1.CasoEstado).includes(caso.estado) &&
        Array.isArray(caso.citas));
}
//# sourceMappingURL=createClientCase.js.map