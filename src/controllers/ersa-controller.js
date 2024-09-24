const ErsaReport = require("../models/ersa-report");
const asyncHandler = require("../utils/async-handler");
const { log } = require("../utils/logger");
const { MongoServerError } = require("mongodb");

exports.getAllErsaReports = async (req, res) => {
  try {
    console.log("called getAllERSAReports..");
    const reports = await ErsaReport.find({});
    res.status(200).json(reports);
  } catch (error) {
    log(error, "getAllErsaReports");
    res.status(500).json({ message: error.message });
  }
};
exports.getErsaReportsByEmail = async (req, res) => {
  try {
    console.log("called getErsaReportsByEmail()..");
    const reports = await ErsaReport.find({ email_address: req.params.email });
    res.status(200).json(reports);
  } catch (error) {
    console.log("failed executing getErsaReportsByEmail()..");
    res.status(500).json({ message: error.message });
  }
};
exports.saveErsaReport = asyncHandler(async (req, res) => {
  console.log("saveErsaReport called..");
  console.log(req.body);
  try {
    const report = await ErsaReport.create(req.body);

    if (report) {
      log("ERSA Report Saved..", "saveErsaReport");
      res.status(201).json({
        message: "Report saved successfully",
        report: {
          id: report._id,
          scores: report.scores,
        },
      });
    } else {
      sendFailResponse(res);
    }
  } catch (ex) {
    if (ex instanceof MongoServerError) {
      response = {
        status: "Failed",
        message: ex.errmsg || "",
        keyPattern: ex.keyPattern || "",
        keyValue: ex.keyValue || "",
        DbErrorCode: ex.code || "",
        errorResponse: ex.errorResponse || "",
      };
      res.status(409).json(response);
    } else {
      sendFailResponse(res, ex);
    }
  }
});
function sendFailResponse(res, ex = null) {
  response = {
    status: "Failed",
    message: "Company Registration Failed",
    errors: ex?.errors || "",
  };
  res.status(409).json(response);
}
