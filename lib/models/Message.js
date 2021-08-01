import pool from '../utils/pool.js';

export default class Message {
  id;
  name;
  message;
  createdAt;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.message = row.message;
    this.createdAt = row.created_at;
  }

  static async insert({ name, message }) {
    const { rows } = await pool.query(`
      INSERT INTO messages (name, message) 
      VALUES ($1, $2) 
      RETURNING *;
    `, [name, message]);

    return new Message(rows[0]);
  }

  static async getAllRecent() {
    const { rows } = await pool.query(`
      SELECT * FROM messages
      WHERE created_at > NOW() - INTERVAL '12 hours';
    `);

    return rows.map(row => new Message(row));
  }

  static async getBy(val, key = 'id') {
    const { row } = await pool.query(`
      SELECT * FROM messages 
      WHERE ${key} = $1
    `, [val]);

    return new Message(row);
  }

  static async delete(id) {
    await pool.query(`
      DELETE FROM messages 
      WHERE id = $1 
      RETURNING *;
    `, [id]);
  }

  static async update(message, id) {
    const { rows } = await pool.query(`
      UPDATE messages 
      SET 
        name = $1, 
        message = $2 
      WHERE id = $3 
      RETURNING *;
      `, [message.name, message.message, id]);

    return new Message(rows[0]);
  }

}
