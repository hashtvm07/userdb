import AuditTrail from '../models/audit-trail';
import mongoose from 'mongoose';

const logAudit = async (
    collectionName: string,
    documentId: mongoose.Types.ObjectId,
    operation: 'CREATE' | 'UPDATE' | 'DELETE',
    previousData: any,
    newData: any,
    modifiedBy: string
): Promise<void> => {
    try {
        await AuditTrail.create({
            collectionName,
            documentId,
            operation,
            previousData,
            newData,
            modifiedBy
        });
    } catch (error) {
        console.error('Error logging audit trail:', error);
    }
};

export default logAudit;