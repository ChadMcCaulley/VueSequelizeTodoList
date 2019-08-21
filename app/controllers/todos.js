const express = require("express");
const router = express.Router();
const { Todo } = require.main.require("./src/sqlite");
const {getMaxImportance, getImportance} = require("../../test");


const route = "/:id";

// Route for getting a todo based on the id
router.get(route, (req, res) => {
    const reqId = req.params.id;
    Todo.findOne({ where: { id: reqId } })
        .then(todo => res.json(todo))
        .catch(err => console.log(err));
})

// Route for updating a given todo
router.patch(route, async (req, res) => {
    const text = req.body.text;
    const color = req.body.color;
    const importance = await getImportance(req.body.nextImportance)

    Todo.update({text, color, importance}, { where: {id: req.params.id}});
    res.send("The todo was updated");
})

// Route for deleting a given todo
router.delete(route, (req, res) => {
    Todo.destroy({ where: { id: req.params.id }});
    res.send("The todo was deleted");
})

module.exports = router;