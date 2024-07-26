const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
  contact_person_fax: String,
  modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }],
});

module.exports = mongoose.model("User", UserSchema);
