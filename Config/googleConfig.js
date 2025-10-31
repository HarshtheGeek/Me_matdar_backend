const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const getGoogleAuth = () => {
  try {
    const credentials = {
      type: process.env.TYPE,
      project_id: process.env.PROJECT_ID,
      private_key_id: process.env.PRIVATE_KEY_ID,
      // convert \n in private key to actual newlines
      private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.CLIENT_EMAIL,
      client_id: process.env.CLIENT_ID,
      auth_uri: process.env.AUTH_URI,
      token_uri: process.env.TOKEN_URI,
      auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
      universe_domain: process.env.UNIVERSE_DOMAIN,
    };

    return new google.auth.GoogleAuth({
      credentials,
      scopes: SCOPES,
    });
  } catch (error) {
    console.error('Error creating Google Auth:', error);
    throw error;
  }
};

module.exports = { getGoogleAuth };
