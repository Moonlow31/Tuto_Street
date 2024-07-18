const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import user-related actions
const {
  browse,
  read,
  edit,
  add,
  updateMoney,
} = require("../../../controllers/userActions");

// Route to get a list of users
router.get("/", browse);

// Route to get a specific user by ID
router.get("/:id", read);

// Route to update a specific user by ID
router.put("/:id", edit);

// Route to update money of a specific user by ID
router.put("/:id/money", updateMoney);

// Route to add a new user
router.post("/", add);

/* ************************************************************************* */

module.exports = router;
