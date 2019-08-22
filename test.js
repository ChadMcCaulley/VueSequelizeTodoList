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
    if(nextImportance === "top") return await getMaxImportance() + 1;  
    const isValid = await isValidImportance(nextImportance);
    if (isValid) {
        let prevImportanceVal = Number.MIN_SAFE_INTEGER;
        await Todo
            .findAll({ where: { importance: { [Op.lt]: nextImportance } } })
            .then(res => {
                if (res === []) return;
                res.forEach(todo => {
                    let next = todo.dataValues.importance;
                    if (next > prevImportanceVal) {
                        prevImportanceVal = next;
                    }
                })

            })
            .catch(err => console.log(err))
        if (prevImportanceVal === Number.MIN_SAFE_INTEGER) return await getMinImportance() - 1;
        return (nextImportance + prevImportanceVal) / 2;
    }
    return null;
}

async function isValidImportance(importance) {
    const max = await getMaxImportance();
    const min = await getMinImportance();
    return importance <= max && importance >= min;
}


module.exports = {
    getMaxImportance,
    getMinImportance,
    getImportance
}