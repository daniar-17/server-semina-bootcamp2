const express = require("express");
const router = express();
const { create, index } = require("./controller");

const upload = require("../../../middlewares/multer");

router.get("/images", index);
router.post("/images", upload.single("avatar"), create);

module.exports = router;
