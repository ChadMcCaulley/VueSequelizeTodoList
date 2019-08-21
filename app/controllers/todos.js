const express = require("express");
const router = express.Router();
const Todo = require.main.require("./src/sqlite");

// Route for getting, updating, and deleting a todo based on an id
const route = "/:id";
router.get(route, (req, res) => {
    const reqId = req.params.id;
    console.log(`THE ID IS ${reqId}`);
    // Todo.findOne({ where: { id: reqId } })
    //     .then(todo => res.json(todo))
    //     .catch(err => console.log(err));
})
router.patch(route, (req, res) => {

})
router.delete(route, (req, res) => {

})

module.exports = router;