const mongoose = require('mongoose');

const excelFileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filename: String,
  originalName: String,
  data: Array, // parsed rows from Excel
  columns: [String], // column headers
}, { timestamps: true });

module.exports = mongoose.model('ExcelFile', excelFileSchema);