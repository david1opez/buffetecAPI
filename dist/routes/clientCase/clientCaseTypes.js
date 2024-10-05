"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitaEstado = exports.CasoEstado = exports.CasoTipo = void 0;
var CasoTipo;
(function (CasoTipo) {
    CasoTipo["MERCANTIL"] = "mercantil";
    CasoTipo["FAMILIAR"] = "familiar";
    CasoTipo["PENAL"] = "penal";
    CasoTipo["LABORAL"] = "laboral";
    CasoTipo["CIVIL"] = "civil";
    CasoTipo["ADMINISTRATIVO"] = "administrativo";
    CasoTipo["OTRO"] = "otro";
})(CasoTipo || (exports.CasoTipo = CasoTipo = {}));
var CasoEstado;
(function (CasoEstado) {
    CasoEstado["NO_VISTO"] = "no_visto";
    CasoEstado["EN_PROCESO"] = "en_proceso";
    CasoEstado["TERMINADO"] = "terminado";
})(CasoEstado || (exports.CasoEstado = CasoEstado = {}));
var CitaEstado;
(function (CitaEstado) {
    CitaEstado["PENDIENTE"] = "pendiente";
    CitaEstado["COMPLETADA"] = "completada";
})(CitaEstado || (exports.CitaEstado = CitaEstado = {}));
//# sourceMappingURL=clientCaseTypes.js.map