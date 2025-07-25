const XLSX = require('xlsx');
const ExcelFile = require('../models/ExcelFile');

exports.uploadExcel = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ msg: 'No file uploaded' });

    const workbook = XLSX.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const columns = data.length > 0 ? Object.keys(data[0]) : [];

    const newExcel = new ExcelFile({
      userId: req.user.id,
      filename: file.filename,
      originalName: file.originalname,
      data,
      columns
    });

    await newExcel.save();

    res.status(201).json({
      msg: 'File uploaded & parsed successfully',
      data: newExcel
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserUploads = async (req, res) => {
  try {
    const files = await ExcelFile.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};