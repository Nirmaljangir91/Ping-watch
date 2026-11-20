const mongoose = require("mongoose");

const checkSchema = mongoose.Schema({
  monitor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Monitor",
    required: true,
  },
  ok: Boolean,
  statusCode: Number,
  responseMs: Number,
  error: String,
  checkedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

//index
{
  monitor: 1;
}

{
  checkedAt: 1;
}

{
  expireAfterSeconds: 60 * 60 * 24 * 30; // delete after 30days
}

module.exports = mongoose.model("Check", checkSchema);
