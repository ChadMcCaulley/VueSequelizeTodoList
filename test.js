const { Todo } = require("./src/sqlite");
const Op = require("sequelize").Op;

/**
 * Gets the max value of the importance column of the database
 * @param {*}
 * @returns {Integer}
 */
async function getMaxImportance() {
    let result;
    await Todo.max("importance")
        .then(max => result = max)
        .catch(err => console.log(err));
    return result;
}

/**
 * Gets the min value of the importance column of the database
 * @param {*}
 * @returns {Integer}
 */
async function getMinImportance() {
    let result;
    await Todo.min("importance")
        .then(min => result = min)
        .catch(err => console.log(err));
    return result;
}

/**
 * Determines the correct importance value given the importance value of the following todo
 * @param {Integer / String} nextImportance
 * @returns {Integer}
 */
async function getImportance(nextImportance) {
    const min = await getMinImportance();
    const max = await getMaxImportance();
    if (nextImportance === "top") return max + 1;
    if (nextImportance <= min) return min - 1;
    let prevImportanceVal = Number.MIN_SAFE_INTEGER;
    await Todo
        .findAll({ where: { importance: { [Op.lt]: nextImportance } } })
        .then(res => {
            res.forEach(todo => {
                let next = todo.dataValues.importance;
                if (next > prevImportanceVal) prevImportanceVal = next;
            })
        })
        .catch(err => console.log(err))
    return (nextImportance + prevImportanceVal) / 2;
}

module.exports = {
    getMaxImportance,
    getMinImportance,
    getImportance
}