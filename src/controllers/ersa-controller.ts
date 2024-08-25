import { Request, Response } from 'express';
import ErsaReport, { IErsaReport } from '../models/ersa-report';
import asyncHandler from '../utils/async-handler';
import connectDB from '.././config/database';

export const getAllErsaReports = async (req: any, res: any) => {
    try {
        console.log('called getAllERSAReports..')
        connectDB();
        console.log('called connectDb fro ersa report..')
        const reports = await ErsaReport.find({});
        res.status(200).json(reports);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const saveErsaReport = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    console.log('saveErsaReport called..')
    connectDB();
    console.log(req.body)
    const report: IErsaReport = await ErsaReport.create(req.body);

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

