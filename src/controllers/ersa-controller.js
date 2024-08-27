const ErsaReport = require('../models/ersa-report');
const asyncHandler = require('../utils/async-handler');
const connectDB = require('.././config/database');

exports.getAllErsaReports = async (req, res) => {
    try {
        console.log('called getAllERSAReports..')
        connectDB();
        console.log('called connectDb fro ersa report..')
        const reports = await ErsaReport.find({});
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.saveErsaReport = asyncHandler(async (req, res) => {
    console.log('saveErsaReport called..')
    connectDB();
    console.log(req.body)
    const report = await ErsaReport.create(req.body);

    if (report) {
        res.status(201).json({
            message: 'Report saved successfully',
            report: {
                id: report._id,
                scores: report.scores
            }
        });
    } else {
        res.status(400);
        throw new Error('Could not save the report..');
    }
});

