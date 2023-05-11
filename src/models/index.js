const Sequelize = require("sequelize");
const process = require("process");

const APP_DB = process.env.APP_DB || "todo_db_v1_local";
const APP_USER = process.env.APP_USER || "root";
const APP_PASS = process.env.APP_PASS || null;

const mysql2 = require("mysql2");

const user = require("./user");
const task = require("./task");

const db = {};

const sequelize = new Sequelize(APP_DB, APP_USER, APP_PASS, {
  host: "localhost",
  dialect: "mysql",
  dialectModule: mysql2,
});

db.User = user(sequelize, Sequelize.DataTypes);
db.Task = task(sequelize, Sequelize.DataTypes);

const { User, Task } = db;

User.hasMany(Task, {
  foreignKey: "user",
  onDelete: "restrict",
  onUpdate: "cascade",
});
Task.belongsTo(User,{
  foreignKey:'user',
  onDelete: "restrict",
onUpdate: "cascade",});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
