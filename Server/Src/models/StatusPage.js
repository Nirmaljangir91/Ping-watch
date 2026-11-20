const mongoose  = require("mongoose");

const statusPageSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
    },
    title: String,
    moniters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Monitor',
        required: true,
    }],
    isPublic: {
        type: Boolean,
        default: true,
    }
}, {timestamps: true}); 


module.exports = mongoose.model("StatusPage", statusPageSchema);