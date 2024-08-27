const AuditTrail = require('../models/audit-trail');
const mongoose = require('mongoose');

const logAudit = async (
    collectionName,
    documentId,
    operation,
    previousData,
    newData,
    modifiedBy
) => {
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

module.exports = logAudit;