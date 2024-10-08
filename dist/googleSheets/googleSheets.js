"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
dotenv_1.default.config();
const serviceAccountKeyFile = path.join(process.cwd(), '/src/service.json');
async function getGoogleSheetClient() {
    // Service account credentials
    const serviceAccountCredentials = {
        "type": "service_account",
        "project_id": process.env.PROJECT_ID,
        "private_key_id": process.env.PRIVATE_KEY_ID,
        "private_key": process.env.PRIVATE_KEY,
        "client_email": process.env.CLIENT_EMAIL,
        "client_id": process.env.CLIENT_ID,
        "auth_uri": process.env.AUTH_URI,
        "token_uri": process.env.TOKEN_URI,
        "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
        "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL,
        "universe_domain": process.env.UNIVERSE_DOMAIN
    };
    if (!fs.existsSync(serviceAccountKeyFile)) {
        fs.writeFileSync(serviceAccountKeyFile, JSON.stringify(serviceAccountCredentials, null, 2));
    }
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