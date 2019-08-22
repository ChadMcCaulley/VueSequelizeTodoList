const express = require("express");
const router = express.Router();
const { Todo } = require.main.require("./src/sqlite");
const { getImportance } = require("../../test");


const route = "/:id";


/**
 * Filters a request body to just text/color/isDone/importance
 * @param {object} todoChanges 
 * @returns {object}
 */
async function filterTodoPatch(todoChanges) {
    let r = {}
    const color = todoChanges.color;

    if (todoChanges.text) r.text = todoChanges.text
    if (color && color.length === 7 && /#{1}[0-9A-Fa-f]{6}/g.test(color)) r.color = color
    if (todoChanges.isDone !== null && typeof todoChanges.isDone === "boolean") r.isDone = todoChanges.isDone
    if (todoChanges.nextImportance) {
        r.importance = await getImportance(todoChanges.nextImportance);
        if (r.importance === null) delete r.importance
    }

    return r
}

// Route for getting a todo based on the id
router.get(route, (req, res) => {
    const reqId = req.params.id;
    Todo.findOne({ where: { id: reqId } })
        .then(todo => todo === null ? res.send(`No todo was found with id: ${reqId}`) : res.json(todo))
        .catch(err => console.log(err));
})


// Route for updating a given todo
router.patch(route, async (req, res) => {

    let filteredBody = await filterTodoPatch(req.body)

    Todo.findOne({ where: { id: req.params.id } }).then(todo => {
        // if is null!!! do own exception
        if (!todo) return res.json({ err: "not found" })
        todo.update(filteredBody).then(h => res.json(todo))
    }).catch(err => { res.send(err) })

})

// Route for deleting a given todo
router.delete(route, (req, res) => {

    Todo.findOne({ where: { id: req.params.id } }).then(todo => {
        // if is null!!! do own exception
        if (!todo) return res.json({ err: "not found" })
        todo.destroy(req.body).then(h => res.json({ success: true }))
    }).catch(err => { res.send(err) })

})

module.exports = router;