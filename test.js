const { Todo } = require("./src/sqlite");
const Op = require("sequelize").Op;

async function getMaxImportance() {
    let result;
    await Todo.max("importance")
        .then(max => result = max)
        .catch(err => console.log(err));
    return result;
}

async function getMinImportance() {
    let result;
    await Todo.min("importance")
        .then(min => result = min)
        .catch(err => console.log(err));
    return result;
}

async function getImportance(nextImportance) {
    let importance;

    // If next importance is null, add to the top of the list 
    if (!nextImportance) importance = Math.floor(await getMaxImportance()) + 1;

    // Else, get the value between the following and previous todos
    else {
        let prevImportanceVal = Number.MIN_SAFE_INTEGER;
        await Todo
            .findAll({ where: { importance: {[Op.lt]: nextImportance}}})
            .then(res => {
                res.forEach(todo => {
                    let next = todo.dataValues.importance;
                    if(next > prevImportanceVal)
                        prevImportanceVal = next;
                })
            })
            .catch(err => console.log(err))
        importance = (nextImportance + prevImportanceVal) / 2;
    }
    return importance;
}

module.exports = {
    getMaxImportance,
    getMinImportance,
    getImportance
}