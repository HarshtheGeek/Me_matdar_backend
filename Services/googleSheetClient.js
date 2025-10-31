const { google } = require('googleapis');
const { getGoogleAuth } = require('../Config/googleConfig');

const getsheet = async () => {
  try {
    const auth = getGoogleAuth();
    // No need to call auth.authorize() explicitly with GoogleAuth
    console.log('Auth success!');
    return google.sheets({ version: "v4", auth });
  } catch (error) {
    console.error('Error getting sheet client:', error);
    throw error;
  }
};

module.exports = { getsheet };