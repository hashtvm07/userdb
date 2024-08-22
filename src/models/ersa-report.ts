import mongoose, { Document, Schema } from 'mongoose';
import logAudit from '../utils/audit-logger';

export interface IErsaReport extends Document {
    company_name: string;
    respondent_name?: string;
    job_title?: string;
    email_address?: string;
    scores: [
        {
            dimension: String,
            score_perc: Number
        }
    ]
}

const ersaRportSchema: Schema = new Schema({
    company_name: { type: String },
    respondent_name: { type: String },
    job_title: { type: String },
    email_address: { type: String, required: true },
    scores: [
        {
            dimension: { type: String, required: true },
            score_perc: { type: String, required: true },
        }
    ]
}, { timestamps: true });

ersaRportSchema.pre('save', async function (this: IErsaReport, next) {
    await logAudit('ErsaReport', this._id, 'CREATE', null, this.toObject(), 'SYSTEM');
    next();
});

// ersaRportSchema.pre('remove', async function (this: IErsaReport, next) {
//     await logAudit('ErsaReport', this._id, 'DELETE', this.toObject(), null, 'SYSTEM');
//     next();
// });

export default mongoose.model<IErsaReport>('ErsaReport', ersaRportSchema);