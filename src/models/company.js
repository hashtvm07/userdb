const mongoose = require("mongoose");
const logAudit = require("../utils/audit-logger");

const companySchema = new mongoose.Schema(
  {
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
