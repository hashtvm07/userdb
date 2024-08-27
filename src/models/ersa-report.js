const mongoose = require('mongoose');
const logAudit = require('../utils/audit-logger');

const ersaReportSchema = new mongoose.Schema({
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

ersaReportSchema.pre('save', async function(next) {
    await logAudit('ErsaReport', this._id, 'CREATE', null, this.toObject(), 'SYSTEM');
    next();
});

// ersaReportSchema.pre('remove', async function(next) {
//     await logAudit('ErsaReport', this._id, 'DELETE', this.toObject(), null, 'SYSTEM');
//     next();
// });

const ErsaReport = mongoose.model('ErsaReport', ersaReportSchema);

module.exports = ErsaReport;