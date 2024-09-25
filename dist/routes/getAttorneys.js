"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("../mongo/mongo");
async function GetAttorneys(req, res) {
    const attorneys = (await (0, mongo_1.collection)('abogados').find().toArray()).map(doc => ({
        _id: doc._id,
        uid: doc.uid,
        nombre: doc.nombre,
        descripcion: doc.descripcion,
        horario: doc.horario,
        casosEjemplo: doc.casosEjemplo,
        diasDisponibles: doc.diasDisponibles
    }));
    if (!attorneys || attorneys.length === 0) {
        return res.status(404).send('No attorneys found');
    }
    res.status(200).send(attorneys);
}
exports.default = GetAttorneys;
//# sourceMappingURL=getAttorneys.js.map