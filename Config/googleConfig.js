// googleAuth.js
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const LOCAL_KEY_PATH = path.join(__dirname, '../Utils/service-account.json');

function loadServiceAccountCredentials() {
  // 1) If whole JSON stored as a single env var SERVICE_ACCOUNT
  if (process.env.SERVICE_ACCOUNT) {
    try {
      const parsed = JSON.parse(process.env.SERVICE_ACCOUNT);
      // Ensure private_key has proper newlines (if it was minified/stored)
      if (parsed.private_key) parsed.private_key = parsed.private_key.replace(/\\n/g, '\n');
      return parsed;
    } catch (err) {
      console.error('Failed to parse SERVICE_ACCOUNT env var:', err.message);
      throw err;
    }
  }

  // 2) If individual env vars are provided (per-key fields)
  if (process.env.TYPE || process.env.PRIVATE_KEY) {
    // basic mapping (match the names you used in Railway)
    const creds = {
      type: process.env.TYPE,
      project_id: process.env.PROJECT_ID,
      private_key_id: process.env.PRIVATE_KEY_ID,
      private_key: process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
      client_email: process.env.CLIENT_EMAIL,
      client_id: process.env.CLIENT_ID,
      auth_uri: process.env.AUTH_URI,
      token_uri: process.env.TOKEN_URI,
      auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
      universe_domain: process.env.UNIVERSE_DOMAIN,
    };
    return creds;
  }

  // 3) Fallback to local file (useful for local dev only)
  try {
    if (fs.existsSync(LOCAL_KEY_PATH)) {
      const file = fs.readFileSync(LOCAL_KEY_PATH, 'utf8');
      const parsed = JSON.parse(file);
      if (parsed.private_key) parsed.private_key = parsed.private_key.replace(/\\n/g, '\n');
      return parsed;
    }
  } catch (err) {
    console.error('Error reading local service account file:', err.message);
    // fall through to throw below
  }

  throw new Error('No Google service account credentials found. Set SERVICE_ACCOUNT or per-field env vars, or provide local Utils/service-account.json');
}

function validateCreds(creds) {
  if (!creds) throw new Error('No credentials object provided');
  if (!creds.client_email || !creds.private_key) {
    throw new Error('Incomplete Google credentials: missing client_email or private_key');
  }
}

const getGoogleAuth = () => {
  try {
    const credentials = loadServiceAccountCredentials();
    validateCreds(credentials);

    // Safe log (do not print sensitive fields)
    console.log('Google credentials loaded for project:', credentials.project_id || 'unknown');

    return new google.auth.GoogleAuth({
      credentials,
      scopes: SCOPES,
    });
  } catch (error) {
    console.error('Error creating GoogleAuth:', error.message);
    throw error;
  }
};

module.exports = { getGoogleAuth };
