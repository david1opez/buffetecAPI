import { Request, Response } from "express";
import { readSheet } from "../../googleSheets/googleSheets";

type ClientCase = {
    no: string;
    nombre: string;
    numero: string;
    correo: string;
    tramite: string;
    expediente_y_juzgado: string;
    seguimiento: string;
    alumno: string;
    folio: string;
    ulima_vez_informada: string;
};

export default async function GetClientCases(req: Request, res: Response) {
  try {
    const sheetData = await readSheet("1Yy4US5PboyPmi6NGJGTeTGe1lMwTa3ZrnYDOEavPv28", "ACTIVOS", "A2:J");

    const columnNames = sheetData[0];

    const parsedData: ClientCase[] = sheetData.slice(1).map((row) => {
        const parsedRow: any = {};
        row.forEach((cell, index) => {
            const columnName = columnNames[index].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "_").replace(/[^a-z0-9_]/g, "");
            parsedRow[columnName] = cell;
        });
        return parsedRow;
    })
    res.status(200).json(parsedData);

  } catch (error) {
    res
      .status(500)
      .json({ error: "Error interno del servidor", details: error.message });
  }
}
