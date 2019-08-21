const Sequelize = require("sequelize");
const TodoModel = require("../app/models/todoModel")

const models = [
  { name: 'Todo', source: TodoModel }
]

const config = {
  dialect: "sqlite",
  storage: "todoDB.sqlite",
  define: { timestamps: true }
}

/**
 * Intialize the Seqelize connection
 * 
 * Todo: make ASYNC
 * 
 * @param {*} config 
 * @returns {object} object of models
 */
function sequelizeInstance(config) {
  // Connect sequelize to the database
  const sequelize = new Sequelize(config)

  // Check if sequelize is connected to database
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

  return models.reduce((carry, model) => {
    let entity = sequelize.import(model.name, model.source)
    entity.sync()
    carry[model.name] = entity
    return carry
  }, {})
}

module.exports = sequelizeInstance(config)