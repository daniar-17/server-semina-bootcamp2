const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let talentSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Nama harus diisi"],
    },
    role: {
      type: String,
      default: "-",
    },
    // untuk membuat relasi pada mongodb kita perlu membuat types ObjectId
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image", //ref Image ini get dari model images(folder)
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Talent", talentSchema);
