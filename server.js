const express = require('express');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const SheetRoute = require('./Routes/GoogleSheetRoute')


const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

// Routes
app.use('/api/sheets', SheetRoute);


app.get('/', (req, res) => {
  res.send('Google Sheets API Server is running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
