const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
    monitor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Monitor',
        required: true,
    },
    user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
       required: true, 
    },
    StartedAt: {
        type: Date,
        default: Date.now,
    },
    resolvedAt: {
        type: Date, 
        default: null,
    },
    reason: {
        type: String,
    },
    alertSent: {
        type:Boolean,
        default: false,
    }
}, { timestamps: true });


module.exports = mongoose.model('Incident', IncidentSchema);