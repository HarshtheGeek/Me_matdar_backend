const { getsheet } = require('./googleSheetClient');
const SPREADSHEET = process.env.SPREAD_SHEET_ID;

// Existing: Read Data
const GoogleSheetReadData = async (range = 'Sheet1!A1:Z100') => {
  try {
    const sheet = await getsheet();
    const res = await sheet.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET,
      range,
    });
    return res.data.values;
  } catch (error) {
    console.error('Error reading Google Sheet:', error.message);
    throw error;
  }
};

// 🆕 New: Update Row
const GoogleSheetUpdateRow = async (voterId, updatedData) => {
  try {
    const sheet = await getsheet();

    // Step 1: Read existing data
    const res = await sheet.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET,
      range: 'Sheet1!A1:Z100',
    });

    const rows = res.data.values;
    if (!rows || rows.length === 0) return false;

    const headers = rows[0];
    const voterIdColIndex = headers.findIndex(
      (h) => h.toLowerCase().trim() === 'voter id'
    );
    if (voterIdColIndex === -1) throw new Error("Voter ID column not found");

    // Step 2: Find the row index
    const rowIndex = rows.findIndex(
      (r, idx) => idx > 0 && r[voterIdColIndex]?.toString() === voterId.toString()
    );

    if (rowIndex === -1) return false;

    // Step 3: Prepare updated row values
    const updatedRow = rows[rowIndex].map((val, colIndex) => {
      const key = headers[colIndex].toLowerCase().trim();
      return updatedData[key] !== undefined ? updatedData[key] : val;
    });

    // Step 4: Write updated values back
    const range = `Sheet1!A${rowIndex + 1}:Z${rowIndex + 1}`;
    await sheet.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET,
      range,
      valueInputOption: 'RAW',
      requestBody: { values: [updatedRow] },
    });

    return true;
  } catch (error) {
    console.error("Error updating Google Sheet:", error.message);
    throw error;
  }
};

module.exports = { GoogleSheetReadData, GoogleSheetUpdateRow };
