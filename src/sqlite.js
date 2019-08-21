const Sequelize = require("sequelize");

// Connect sequelize to the database
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "todoDB.sqlite",
    define:{timestamps: true}
})

// Check if sequelize is connected to database
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Todo = sequelize.import("../app/models/todoModel");

Todo.sync();

module.exports = Todo;