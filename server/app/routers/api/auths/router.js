const express = require("express");

const router = express.Router();

const { login } = require("../../../controllers/authActions");

router.post("/", login);

module.exports = router;
