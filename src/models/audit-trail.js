const mongoose = require("mongoose");

const auditTrailSchema = new mongoose.Schema({
  collectionName: {
    type: String,
    required: true,
  },
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  operation: {
    type: String,
    enum: ["CREATE", "UPDATE", "DELETE"],
    required: true,
  },
  previousData: mongoose.Schema.Types.Mixed,
  newData: mongoose.Schema.Types.Mixed,
  modifiedBy: String,
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
});

const AuditTrail = mongoose.model("AuditTrail", auditTrailSchema);

module.exports = AuditTrail;