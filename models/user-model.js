const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
      avatar:{
        type: String,
        default: "https://cdn-icons-png.freepik.com/256/3135/3135715.png",
      },
    },
    { timestamps: true }
);
  
module.exports = mongoose.model('User', userSchema);