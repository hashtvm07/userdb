import mongoose, { Document, Schema } from 'mongoose';
import logAudit from '../utils/audit-logger';

export interface ICompany extends Document {
    email: string;
    company_name_en?: string;
    company_name_ar?: string;
    license_id?: string;
    city?: string;
    is_exporter?: boolean;
    address?: string;
    contact_first_name?: string;
    contact_last_name?: string;
    phone?: string;
    hs_code?: string;
    hs_code_desc?: string;
    activity: String,
    sector?: string;
}

const companySchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    company_name_en: { type: String, required: true, unique: true },
    company_name_ar: String,
    license_id: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    is_exporter: Boolean,
    address: { type: String, required: true },
    contact_first_name: { type: String, required: true },
    contact_last_name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    hs_code: { type: String, required: true },
    hs_code_desc: String,
    activity: String,
    sector: String,
}, { timestamps: true });

companySchema.pre('save', async function (this: ICompany, next) {
    if (this.isNew) {
        await logAudit('Company', this._id, 'CREATE', null, this.toObject(), 'SYSTEM');
    } else {
        const previousData = await mongoose.model<ICompany>('Company').findOne({ _id: this._id });
        await logAudit('Company', this._id, 'UPDATE', previousData?.toObject(), this.toObject(), 'SYSTEM');
    }
    next();
});

export default mongoose.model<ICompany>('Company', companySchema);