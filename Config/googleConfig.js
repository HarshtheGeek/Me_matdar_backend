const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const getGoogleAuth = () => {
  try {
    const credentials = {
      type: process.env.type,
      project_id: process.env.project_id,
      private_key_id: process.env.private_key_id,
      // convert \n in private key to actual newlines
      private_key: process.env.private_key?.replace(/\\n/g, '\n'),
      client_email: process.env.client_email,
      client_id: process.env.client_id,
      auth_uri: process.env.auth_uri,
      token_uri: process.env.token_uri,
      auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
      client_x509_cert_url: process.env.client_x509_cert_url,
      universe_domain: process.env.universe_domain,
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
