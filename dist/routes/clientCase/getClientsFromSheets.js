"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GetClientCases;
const googleSheets_1 = require("../../googleSheets/googleSheets");
async function GetClientCases(req, res) {
    try {
        const sheetData = await (0, googleSheets_1.readSheet)("1Yy4US5PboyPmi6NGJGTeTGe1lMwTa3ZrnYDOEavPv28", "ACTIVOS", "A2:J");
        const columnNames = sheetData[0];
        const parsedData = sheetData.slice(1).map((row) => {
            const parsedRow = {};
            row.forEach((cell, index) => {
                // convert accents to normal characters
                // convert spaces to underscores
                // remove special characters
                const columnName = columnNames[index].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "_").replace(/[^a-z0-9_]/g, "");
                parsedRow[columnName] = cell;
            });
            return parsedRow;
        });
        res.status(200).json(parsedData);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Error interno del servidor", details: error.message });
    }
}
//# sourceMappingURL=getClientsFromSheets.js.map