const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {
  browse,
  read,
  edit,
  add,
  updateMoney,
} = require("../../../controllers/userActions");

// Route to get a list of items
router.get("/", browse);

// Route to get a specific item by ID
router.get("/:id", read);

// Route to update a specific user by ID
router.put("/:id", edit);

// Route to update money of a specific user by ID
router.put("/:id/money", updateMoney);

// Route to add a new item
router.post("/", add);

/* ************************************************************************* */

module.exports = router;
