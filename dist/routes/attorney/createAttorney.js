"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreateAttorney;
// createAttorney.ts
const mongo_1 = require("../../mongo/mongo");
async function CreateAttorney(req, res) {
    try {
        const attorneyData = req.body;
        if (!isValidAttorney(attorneyData)) {
            return res.status(400).send("Invalid attorney data");
        }
        // Verificar si el usuario existe y es de tipo 'abogado'
        const user = await (0, mongo_1.collection)("usuarios").findOne({
            uid: attorneyData.uid,
        });
        const newAttorney = {
            ...attorneyData,
            excepcionesFechas: attorneyData.excepcionesFechas.map((exc) => ({
                ...exc,
                fechaHora: new Date(exc.fechaHora),
            })),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const result = await (0, mongo_1.collection)("abogados").insertOne(newAttorney);
        res.status(201).json({ ...newAttorney, _id: result.insertedId });
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Internal server error", details: error.message });
    }
}
function isValidAttorney(attorney) {
    const requiredFields = [
        "uid",
        "especialidad",
        "descripcion",
        "horarioSemanal",
        "duracionCita",
        "casosEjemplo",
    ];
    return (requiredFields.every((field) => attorney[field] !== undefined) &&
        typeof attorney.duracionCita === "number" &&
        Array.isArray(attorney.excepcionesFechas));
}
//# sourceMappingURL=createAttorney.js.map