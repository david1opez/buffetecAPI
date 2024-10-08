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
async function getGoogleSheetClient() {
    const serviceAccountCredentials = {
        "type": "service_account",
        "project_id": process.env.PROJECT_ID,
        "private_key_id": process.env.PRIVATE_KEY_ID.replace(/\\\\/g, '\\').replace(/\\n/g, '\n').replace(/"/g, ''),
        "private_key": process.env.PRIVATE_KEY,
        "client_email": process.env.CLIENT_EMAIL,
        "client_id": process.env.CLIENT_ID,
        "auth_uri": process.env.AUTH_URI,
        "token_uri": process.env.TOKEN_URI,
        "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
        "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL,
        "universe_domain": process.env.UNIVERSE_DOMAIN
    };
    const auth = new googleapis_1.google.auth.GoogleAuth({
        credentials: serviceAccountCredentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    console.log("AAAAAA");
    console.log(serviceAccountCredentials);
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