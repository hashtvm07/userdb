import mongoose, { Document, Schema } from "mongoose";

export interface IAuditTrail extends Document {
  collectionName: string;
  documentId: mongoose.Types.ObjectId;
  operation: "CREATE" | "UPDATE" | "DELETE";
  previousData?: any;
  newData?: any;
  modifiedBy: string;
  modifiedAt: Date;
}

const auditTrailSchema: Schema = new Schema({
  collectionName: {
    type: String,
    required: true,
  },
  documentId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  operation: {
    type: String,
    enum: ["CREATE", "UPDATE", "DELETE"],
    required: true,
  },
  previousData: Schema.Types.Mixed,
  newData: Schema.Types.Mixed,
  modifiedBy: String,
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model < IAuditTrail > ("AuditTrail", auditTrailSchema);
