const mongoose = require("mongoose");

const moniterSchema = mongoose.schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: String,
    url: String,
    intervalSec: {
        type: Number,
        default: 300,
    },
    timeoutMs: {
        type: Number,
        default: 10000,
    },
    isPaused: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["up", "down", "pending"],
        default: "up",
    },
    consecutiveFailures: {
        type: Number,
        default: 0, 
    },
    lastCheckedAt: {
        type: Date,
        default: null,
    },  
    lastStatusChangeAt: {
        type: Date,
        default: null,
    },
    lastResponseMs: Number,

    nextCheckAt: {
        type: Date,
        default: Date.now,
        index: true,
    }
}, { timestamps: true });
