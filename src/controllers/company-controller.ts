import { Request, Response } from 'express';
import Company, { ICompany } from '../models/company';
import asyncHandler from '../utils/async-handler';
import connectDB from '.././config/database';

export const getAllCompanies = async (req: any, res: any) => {
    try {
        connectDB();

        console.log('called getAllCompanies.')
        const companies = await Company.find({});
        res.status(200).json(companies);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const registerCompany = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    console.log('registerCompany called..')
    connectDB();
    const companyExists = await Company.findOne({ email: req.body.email });
    if (companyExists) {
        res.status(400);
        throw new Error('Company already exists');
    }

    const compnay: ICompany = await Company.create(req.body);

    if (compnay) {
        res.status(201).json({
            message: 'Company registered successfully',
            company: {
                id: compnay._id,
                email: compnay.email,
                phone: compnay.phone
            }
        });
    } else {
        res.status(400);
        throw new Error('Invalid company data');
    }
});

export const updateCompany = asyncHandler(async (req: Request, res: Response): Promise<void> => {
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

export const getCompany = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    console.log(req.params.email)
    connectDB();
    const company = await Company.findOne({ email: req.params.email });
    if (company) {
        res.json(company);
    } else {
        res.status(404);
        throw new Error('Company not found');
    }
});
