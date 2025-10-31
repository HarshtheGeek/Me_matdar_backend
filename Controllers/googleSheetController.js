const { GoogleSheetReadData, GoogleSheetUpdateRow } = require('../Services/sheetService');

// Existing function
const googleSheetData = async (req, res) => {
  try {
    const data = await GoogleSheetReadData();
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No data available", success: false });
    }

    return res.status(200).json({ data, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false, error: error.message });
  }
};

// 🆕 New function to update a voter record
const updateVoterData = async (req, res) => {
  try {
    const voterId = req.params.voterId;
    const updatedData = req.body;

    const success = await GoogleSheetUpdateRow(voterId, updatedData);

    if (success) {
      return res.status(200).json({ success: true, message: "Voter updated successfully" });
    } else {
      return res.status(404).json({ success: false, message: "Voter not found" });
    }
  } catch (error) {
    console.error("Error updating voter:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = { googleSheetData, updateVoterData };
