const Company = require('../models/company');
const asyncHandler = require('../utils/async-handler');
const connectDB = require('.././config/database');

exports.getAllCompanies = asyncHandler(async (req, res) => {
    try {
        await connectDB();

        console.log('called getAllCompanies.')
        const companies = await Company.find({});
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

exports.registerCompany = asyncHandler(async (req, res) => {
    console.log('registerCompany called..')
    await connectDB();
    const companyExists = await Company.findOne({ email: req.body.email });
    if (companyExists) {
        res.status(400);
        throw new Error('Company already exists');
    }

    const company = await Company.create(req.body);

    if (company) {
        res.status(201).json({
            message: 'Company registered successfully',
            company: {
                id: company._id,
                email: company.email,
                phone: company.phone
            }
        });
    } else {
        res.status(400);
        throw new Error('Invalid company data');
    }
});

exports.updateCompany = asyncHandler(async (req, res) => {
    const company = await Company.findById(req.params.id);

    if (company) {
        Object.assign(company, req.body);
        const updatedCompany = await company.save();
        res.json({
            message: 'Company updated successfully',
            company: {
                id: updatedCompany._id,
                email: updatedCompany.email,
                mobile: updatedCompany.phone
            }
        });
    } else {
        res.status(404);
        throw new Error('Company not found');
    }
});

exports.getCompany = asyncHandler(async (req, res) => {
    console.log(req.params.email)
    await connectDB();
    const company = await Company.findOne({ email: req.params.email });
    if (company) {
        res.json(company);
    } else {
        res.status(404);
        throw new Error('Company not found');
    }
});