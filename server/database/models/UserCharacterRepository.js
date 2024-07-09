const AbstractRepository = require("./AbstractRepository");

class UserCharacterRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "video" as configuration
    super({ table: "users_characters" });
  }

  // The C of CRUD - Create operation
  async create(userCharacter) {
    // Execute the SQL INSERT query to add a new video to the "videos" table
    const [result] = await this.database.query(
      `insert into ${this.table} (users_id, characters_id) values (?, ?)`,
      [userCharacter.users_id, userCharacter.characters_id]
    );

    // Return the ID of the newly inserted video
    return result.insertId;
  }

  // The R of CRUD - Read operations
  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific video by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the video
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all videos from the "video" table

    const [rows] = await this.database.query(`
      SELECT
        uc.*,
        JSON_OBJECT(
          'id', u.id,
          'email', u.email,
          'name', u.name,
          'password', u.password
          'money', u.money
          'admin', u.admin
        ) AS users,
        JSON_OBJECT(
          'id', c.id,
          'name', c.name
          'value', c.value
          'image', c.image
        ) AS characters
      FROM ${this.table} AS uc
      JOIN users AS u ON uc.users_id = u.id
      LEFT JOIN characters AS c ON uc.characters_id = c.id
    `);

    // const [rows] = await this.database.query(`select * from videos`);

    // Return the array of videos
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing video

  async update(userCharacter) {
    const [edit] = await this.database.query(
      `update ${this.table} set users_id =?, characters_id =? where id =? `,
      [userCharacter.users_id, userCharacter.characters_id]
    );
    return edit;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an video by its ID

  async delete(id) {
    // Execute the SQL DELETE query to remove an video from the "videos" table
    const [destroy] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
    return destroy;
  }
}

module.exports = UserCharacterRepository;
