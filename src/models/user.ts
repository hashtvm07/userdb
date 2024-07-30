import mongoose, { Document, Schema } from 'mongoose';
import logAudit from '../utils/audit-logger';

export interface IUser extends Document {
    email_id: string;
    mobile: string;
    phone?: string;
    company_name_en?: string;
    company_name_ar?: string;
    hs4?: string;
    hs4_desc_en?: string;
    hs4_desc_ar?: string;
    destination_country?: string;
    idb_license_no?: string;
    contact_person_en?: string;
    contact_person_ar?: string;
    contact_person_email?: string;
    contact_person_mobile?: string;
    contact_person_fax?: string;
}

const userSchema: Schema = new Schema({
    email_id: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    phone: String,
    company_name_en: String,
    company_name_ar: String,
    hs4: String,
    hs4_desc_en: String,
    hs4_desc_ar: String,
    destination_country: String,
    idb_license_no: String,
    contact_person_en: String,
    contact_person_ar: String,
    contact_person_email: String,
    contact_person_mobile: String,
    contact_person_fax: String
}, { timestamps: true });

userSchema.pre('save', async function (this: IUser, next) {
    if (this.isNew) {
        await logAudit('User', this._id, 'CREATE', null, this.toObject(), 'SYSTEM');
    } else {
        const previousData = await mongoose.model<IUser>('User').findOne({ _id: this._id });
        await logAudit('User', this._id, 'UPDATE', previousData?.toObject(), this.toObject(), 'SYSTEM');
    }
    next();
});

userSchema.pre('remove', async function (this: IUser, next) {
    await logAudit('User', this._id, 'DELETE', this.toObject(), null, 'SYSTEM');
    next();
});

export default mongoose.model<IUser>('User', userSchema);