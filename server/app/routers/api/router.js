const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const usersRouter = require("./users/router");
const charactersRouter = require("./characters/router");

router.use("/users", usersRouter);
router.use("/characters", charactersRouter);

/* ************************************************************************* */

module.exports = router;
