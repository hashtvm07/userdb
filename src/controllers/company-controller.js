const { response } = require("../app");
const Company = require("../models/company");
const User = require("../models/user");
const asyncHandler = require("../utils/async-handler");
const { MongoServerError } = require("mongodb");
const CustomError = require("../utils/errors/CustomError");

exports.getAllCompanies = asyncHandler(async (req, res) => {
  try {
    console.log("called getAllCompanies.");
    let companies = await Company.find({});
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.registerCompany = asyncHandler(async (req, res) => {
  try {
    console.log("registerCompany called..");
    let userExists = await User.findOne({ email: req.body.email });
    console.log("userExists..");
    console.log(userExists);
    if (userExists) {
      throw new CustomError("User already exists..", "", 400);
    } else {
      let user = await addUser(req);
      addCompany(req, res, user);
    }
  } catch (ex) {
    console.log("reached at catch block of registerCompany");
    if (ex instanceof CustomError) {
      let response = {
        status: "Failed",
        message: ex.message,
        detailedMessage: ex.detailedMessage,
      };
      console.log(ex.message, ex.detailedMessage);
      res.status(ex.errorCode).json(response);
    } else {
      let response = {
        status: "Failed",
        message: "Unexpected Error..",
        detailedMessage: ex.message,
      };
      console.log(ex.message, ex.detailedMessage);
      res.status(500).json(response);
    }
    console.log(ex);
  }
});
async function addUser(req) {
  console.log("creating new user..");
  user = {
    email: req.body.email,
    first_name: req.body.contact_first_name,
    last_name: req.body.contact_last_name,
    mobile: req.body.phone,
  };
  try {
    let usr = await User.create(user);
    return usr;
  } catch (ex) {
    throw new CustomError("Error in creating user - ", ex.message, 409);
  }
}
async function addCompany(req, res, user) {
  console.log("adding company..", user);
  let companyExists = await Company.findOne({
    company_name_en: req.body.company_name_en,
  });
  if (companyExists) {
    updateCompany(req, res, user);
  } else {
    doAddCompany(req, res, user);
  }
}
async function doAddCompany(req, res, user) {
  console.log("doAddCompany()", user);
  let maxCompanyIdDoc = await Company.findOne()
    .sort({ company_id: -1 })
    .select("company_id");
  let maxCompanyId = maxCompanyIdDoc ? maxCompanyIdDoc.company_id : 10000;
  maxCompanyId = maxCompanyId ? maxCompanyId : 10000;
  maxCompanyId++;

  let newCompanyData = {
    ...req.body,
    company_id: maxCompanyId,
    exporter_id: "ADEG" + maxCompanyId,
    users: [user._id],
  };

  let company = {};
  try {
    console.log("doAddCompany() creating company - db operation");
    company = await Company.create(newCompanyData);
    if (company) {
      let response = {
        message: "Company registered successfully..",
        company: {
          id: company?._id,
          exporter_id: company?.exporter_id,
          email: company?.email,
          phone: company?.phone,
          users: company?.users,
        },
      };
      res.status(201).json(response);
    } else {
      throw new CustomError(
        "Company Creation Failed..",
        "Invalid Company Data..",
        409
      );
    }
  } catch (ex) {
    console.log(ex.message);
    if (ex instanceof MongoServerError) {
      let detailedMessage = {
        keyPattern: ex.keyPattern || "",
        keyValue: ex.keyValue || "",
        DbErrorCode: ex.code || "",
        errorResponse: ex.errorResponse || "",
        message: ex.message || "",
      };
      throw new CustomError(
        "Company Creation Failed due to db error.." + ex.errmsg,
        detailedMessage,
        400
      );
    } else {
      throw new CustomError("Company Creation Failed..", ex.errors, 400);
    }
  }
}
async function updateCompany(req, res, user) {
  console.log("updateCompany() called..", user);
  console.log("req", req?.body);
  try {
    let company = await Company.findOne({
      company_name_en: req.body.company_name_en,
    });
    console.log("company ", company);
    if (company) {
      company.users.push(user._id);
      console.log("company ", company);
      let updatedCompany = await company.save();
      res.json({
        message: "Company updated successfully..",
        company: {
          id: updatedCompany._id,
          exporter_id: updatedCompany.exporter_id,
          email: updatedCompany.email,
          phone: updatedCompany.phone,
          users: updatedCompany.users,
        },
      });
    } else {
      res.status(404);
      throw new Error("Company not found");
    }
  } catch (ex) {
    console.log(ex.message);
    if (ex instanceof MongoServerError) {
      let detailedMessage = {
        keyPattern: ex.keyPattern || "",
        keyValue: ex.keyValue || "",
        DbErrorCode: ex.code || "",
        errorResponse: ex.errorResponse || "",
        message: ex.message || "",
      };
      throw new CustomError(
        "Company updation failed due to db error. " + ex.errmsg,
        detailedMessage,
        400
      );
    } else {
      throw new CustomError("Company Updation Failed..", ex.errors, 400);
    }
  }
}

exports.getCompany = asyncHandler(async (req, res) => {
  console.log(req.params.email);
  let user = await User.findOne({ email: req.params.email });
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
