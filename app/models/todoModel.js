//Create the todo model

module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define("Todo", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        color: {
            type: DataTypes.STRING,
            defaultValue: "#FFFFFF"
        },
        isDone: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        importance: {
            type: DataTypes.FLOAT,
            defaultValue: 1
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    })
    return Todo;
}
