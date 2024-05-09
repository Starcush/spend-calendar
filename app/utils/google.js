'use server';
import { google } from 'googleapis';
import credentials from '@/resources/google-spreadsheet-google-service.json';

async function getSpreadSheets() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: credentials.client_email,
      private_key: credentials.private_key,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const authClient = await auth.getClient();
  google.options({ auth: authClient });

  return google.sheets({ version: 'v4', auth });
}

export async function getSheetData({ sheetName }) {
  const sheets = await getSpreadSheets();
  const { data } = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: `${sheetName}!A1:ZZ`,
  });
  return data.values;
}
