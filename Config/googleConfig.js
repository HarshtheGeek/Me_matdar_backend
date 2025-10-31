const { google } = require('googleapis');
const path = require('path');

// Load the service account key file directly here - zyada better
const keyFilePath = path.join(__dirname, '../Utils/service-account.json');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const getGoogleAuth = () => {
  try {
    return new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: SCOPES,
    });
  } catch (error) {
    console.error('Error creating Google Auth:', error);
    throw error;
  }
};

module.exports = { getGoogleAuth };