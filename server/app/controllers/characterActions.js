// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all characters from the database
    const characters = await tables.character.readAll();

    // Respond with the characters in JSON format
    res.json(characters);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific character from the database based on the provided ID
    const character = await tables.character.read(req.params.id);

    // If the character is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the character in JSON format
    if (character == null) {
      res.sendStatus(404);
    } else {
      res.json(character);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  const character = { ...req.body, id: req.params.id };

  try {
    // Fetch a specific item from the database based on the provided ID
    await tables.user.update(character);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (character == null) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the character data from the request body
  const character = req.body;

  try {
    // Insert the character into the database
    const insertId = await tables.character.create(character);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted character
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const character = await tables.character.delete(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (character == null) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
