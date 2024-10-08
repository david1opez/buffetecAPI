"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoogleSheetClient = getGoogleSheetClient;
exports.readSheet = readSheet;
exports.writeSheet = writeSheet;
exports.updateSheet = updateSheet;
const googleapis_1 = require("googleapis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const serviceAccountKeyFile = process.cwd() + '/src/swift-438017-75e4b8d2c421.json';
async function getGoogleSheetClient() {
    const auth = new googleapis_1.google.auth.GoogleAuth({
        keyFilename: serviceAccountKeyFile,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    return googleapis_1.google.sheets({
        version: "v4",
        auth: auth,
    });
}
async function readSheet(sheetId, tabName, range) {
    const googleSheetClient = await getGoogleSheetClient();
    const res = await googleSheetClient.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: `${tabName}!${range}`,
    });
    return res.data.values || [];
}
async function writeSheet(sheetId, tabName, range, data) {
    const googleSheetClient = await getGoogleSheetClient();
    await googleSheetClient.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: `${tabName}!${range}`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
            majorDimension: "ROWS",
            values: data
        },
    });
}
async function updateSheet(sheetId, tabName, range, data) {
    const googleSheetClient = await getGoogleSheetClient();
    try {
        await googleSheetClient.spreadsheets.values.update({
            spreadsheetId: sheetId,
            range: `${tabName}!${range}`,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                majorDimension: "ROWS",
                values: data
            },
        });
    }
    catch (err) {
        console.log(err);
    }
}
//# sourceMappingURL=googleSheets.js.map