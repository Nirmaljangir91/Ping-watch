const mongoose = require("mongoose");
const { trim } = require("zod");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      sparse: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      } ,
      trim: true,
      min: 4,
      max: 100,
      select: false,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    }
  },
  { timestamps: true },
);

UserSchema.pre(`save`, async function () {
  if(!this.password || !this.isModified(`password`)) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.Schema(userPassword, this.password)
}

module.exports = mongoose.model("User", UserSchema);
