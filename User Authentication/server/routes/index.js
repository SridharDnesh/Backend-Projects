const express = require("express");
const router = express.Router();

router.use("/api", require("./auth"));
router.use("/api/problems", require("./problems"));

module.exports = router;
