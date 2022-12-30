const Images = require("../../api/v1/images/model");
const { NotFoundError } = require("../../errors");

const getAllImages = async () => {
  const result = await Images.find().select("_id name");
  return result;
};

/*
1. Kita gunakan ini
2. Generate url setelah submit baru kita simpan images
*/

// 2. Generate url setelah submit baru kita simpan images
const generateUrlImage = async (req) => {
  const result = `uploads/${req.file.filename}`;

  return result;
};

// 1. Kita gunakan ini
const createImages = async (req) => {
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : "uploads/avatar/default.jpeg",
  });

  return result;
};

// tambahkan function checking Image
const checkingImage = async (id) => {
  const result = await Images.findOne({ _id: id });
  console.log(result);

  if (!result) throw new NotFoundError(`Tidak ada Gambar dengan id :  ${id}`);

  return result;
};
// jangan lupa export checkingImage
module.exports = { createImages, checkingImage, getAllImages };
