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
    if(isValidImportance(nextImportance)){
        let prevImportanceVal = Number.MIN_SAFE_INTEGER;
        await Todo
            .findAll({ where: { importance: {[Op.lt]: nextImportance}}})
            .then(res => {
                res.forEach(todo => {
                    let next = todo.dataValues.importance;
                    if(next > prevImportanceVal){
                        prevImportanceVal = next;
                    }
                })
            })
            .catch(err => console.log(err))
        importance = (nextImportance + prevImportanceVal) / 2;
    } else {
        console.log(req.dataValues.importance);
        importance = req.dataValues.importance;
    }
    return importance;
}

async function isValidImportance(importance){
    const max = await getMaxImportance();
    const min = await getMinImportance();
    return importance <= max && importance >= min;
}

module.exports = {
    getMaxImportance,
    getMinImportance,
    getImportance
}