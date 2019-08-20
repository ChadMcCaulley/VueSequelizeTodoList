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

// Create the todo table in the database
const Todo = sequelize.define("todo", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    color: {
        type: Sequelize.STRING,
        defaultValue: "FFFFFF"
    }, 
    isDone: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }, 
    importance: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Todo.sync();