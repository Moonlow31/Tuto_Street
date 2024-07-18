const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "user" as configuration
    super({ table: "users" });
  }

  // The C of CRUD - Create operation

  async create(user) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await this.database.query(
      `insert into ${this.table} (email, name, hashed_password, money, admin) values (?, ?, ?, ?, ?)`,
      [user.email, user.name, user.hashedPassword, user.money, user.admin]
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  // Méthode supplémentaire pour lire un utilisateur par email avec mot de passe
  async readByEmailWithPassword(email) {
    // Exécute la requête SQL SELECT pour récupérer un utilisateur spécifique par son email
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );

    // Retourne la première ligne du résultat, qui représente l'utilisateur
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of users
    return rows;
  }

  // The U of CRUD - Update operation
  async update(user) {
    const [edit] = await this.database.query(
      `update ${this.table} set email =?, name =?, hashed_password =?, money =?, admin =? where id =?`,
      [
        user.email,
        user.name,
        user.hashedPassword,
        user.money,
        user.admin,
        user.id,
      ]
    );
    return edit;
  }

  async updateMoney(userId, money) {
    const [edit] = await this.database.query(
      `UPDATE ${this.table} SET money = ? WHERE id = ?`,
      [money, userId]
    );
    return edit;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    // Exécute la requête SQL DELETE pour supprimer un utilisateur de la table "users"
    const [destroy] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return destroy;
  }
}

module.exports = UserRepository;
