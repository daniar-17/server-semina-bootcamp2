const express = require("express");
const router = express();
const { signup, activeParticipant } = require("./controller");

const { authenticateParticipant } = require("../../../middlewares/auth");

router.post("/auth/signup", signup);
router.put("/active", activeParticipant);

module.exports = router;
