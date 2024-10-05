"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GetAttorneyByUid;
const mongo_1 = require("../../mongo/mongo");
async function GetAttorneyByUid(req, res) {
    try {
        // Extract uid from request params or query string
        const uid = req.params.uid || req.query.uid;
        if (!uid) {
            return res.status(400).send("UID is required");
        }
        // Find the attorney document with the specified uid
        const attorneyDoc = await (0, mongo_1.collection)("abogados").findOne({ uid: uid });
        if (!attorneyDoc) {
            return res.status(404).send("Attorney not found");
        }
        // Find the user document with the corresponding uid
        const user = await (0, mongo_1.collection)("usuarios").findOne({ uid: uid });
        // Construct the attorney data
        const attorney = {
            _id: attorneyDoc._id,
            uid: attorneyDoc.uid,
            nombre: user ? user.nombre : "Abogado",
            celular: user ? user.celular : "No disponible",
            email: user ? user.email : "No disponible",
            especialidad: attorneyDoc.especialidad,
            descripcion: attorneyDoc.descripcion,
            horarioSemanal: attorneyDoc.horarioSemanal,
            duracionCita: attorneyDoc.duracionCita,
            casosEjemplo: attorneyDoc.casosEjemplo,
            excepcionesFechas: attorneyDoc.excepcionesFechas.map((exc) => ({
                fechaHora: exc.fechaHora,
                razon: exc.razon,
            })),
            createdAt: attorneyDoc.createdAt,
            updatedAt: attorneyDoc.updatedAt,
        };
        // Return the attorney data as JSON
        res.status(200).json(attorney);
    }
    catch (error) {
        // Handle errors and return a 500 response
        res
            .status(500)
            .json({ error: "Internal server error", details: error.message });
    }
}
//# sourceMappingURL=getAttorney.js.map