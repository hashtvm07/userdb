const mongoose = require("mongoose");
const logAudit = require("../utils/audit-logger");
const Schema = mongoose.Schema;

const companySchema = new mongoose.Schema(
  {
    company_id: { type: Number, unique: true },
    exporter_id: { type: String, unique: true },
    company_email: String,
    company_name_en: { type: String, required: true, unique: true },
    company_name_ar: String,
    license_id: String,
    city: String,
    is_exporter: Boolean,
    address: { type: String },
    mobile: String,
    landphone: String,
    hs_code: String,
    hs_code_desc: String,
    activity: String,
    sector: String,
    destination_country: String,
    users: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  { timestamps: true }
);

companySchema.pre("save", async function (next) {
  if (this.isNew) {
    await logAudit(
      "Company",
      this._id,
      "CREATE",
      null,
      this.toObject(),
      "SYSTEM"
    );
  } else {
    const previousData = await mongoose
      .model("Company")
      .findOne({ _id: this._id });
    await logAudit(
      "Company",
      this._id,
      "UPDATE",
      previousData?.toObject(),
      this.toObject(),
      "SYSTEM"
    );
  }
  next();
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
