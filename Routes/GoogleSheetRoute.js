const express = require('express');
const router = express.Router();
const {googleSheetData} = require('../Controllers/googleSheetController');
const {updateVoterData} = require('../Controllers/googleSheetController');

router.get('/sheetdata', googleSheetData);
router.put('/sheetdata/:voterId', updateVoterData);

module.exports = router;
