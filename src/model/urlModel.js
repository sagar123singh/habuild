const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    urlCode: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    longUrl: {
      type: String,
      required: true,
    },

    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
    
    createdAt:{
        type:String,
        required:true,
        default:new Date()

    }
  }
);
module.exports = mongoose.model("Url", urlSchema);
