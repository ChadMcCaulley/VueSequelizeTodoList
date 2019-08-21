const {Todo} = require("./src/sqlite");

async function getMaxImportance(){
    let result;
    await Todo.max("importance")
        .then(max => result = max)
        .catch(err => console.log(err));
    return result;
}

async function getMinImportance(){
    let result;
    await Todo.min("importance")
        .then(min => result = min)
        .catch(err => console.log(err));
    return result;
}

module.exports = {
    getMaxImportance,
    getMinImportance
}