const express = require("express");
const router = express.Router();
const { Todo } = require.main.require("./src/sqlite");
const { getImportance, getMaxImportance } = require("../../test");


const route = "/:id";


/**
 * Filters a request body to just text/color/isDone/importance
 * @param {object} todoChanges 
 * @returns {object}
 */
async function filterTodoPatch(todoChanges) {
    let r = {}

    if (todoChanges.text) r.text = todoChanges.text
    if (todoChanges.color) r.color = todoChanges.color
    if (todoChanges.isDone !== null && typeof todoChanges.isDone === "boolean") r.isDone = todoChanges.isDone

    if (todoChanges.followsTask === false) {
        r.importance = await getMaxImportance() + 1;
        return r
    }

    try {            
        let nextImportance;        
        let todo  = await Todo.findOne({ where: { id: todoChanges.followsTask } })
        if (todo !== null) nextImportance = todo.dataValues.importance;
        else nextImportance = "top";
        r.importance = await getImportance(nextImportance);
    } catch (err) {
        console.log(err)
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