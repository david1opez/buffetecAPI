import { google, sheets_v4 } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const serviceAccountKeyFile = process.cwd() + '/src/swift-438017-75e4b8d2c421.json';

export async function getGoogleSheetClient(): Promise<sheets_v4.Sheets> {
  const auth = new google.auth.GoogleAuth({
    keyFilename: serviceAccountKeyFile,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({
    version: "v4",
    auth: auth,
  });
}

export async function readSheet(sheetId: string, tabName: string, range: string) {
  const googleSheetClient = await getGoogleSheetClient();
  
  const res = await googleSheetClient.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${tabName}!${range}`,
  });
  
  return res.data.values || [];
}
  
export async function writeSheet(sheetId: string, tabName: string, range: string, data: any) {
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
  })
}

export async function updateSheet(sheetId: string, tabName: string, range: string, data: any) {
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
    })
  } catch (err) {
    console.log(err);
  }
}
