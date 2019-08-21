const express = require("express");
const router = express.Router();
const Todo = require.main.require("./src/sqlite");

// Route for getting, updating, and deleting a todo based on an id
const route = "/:id";
router.get(route, (req, res, next) => {
    console.log(req);
    const reqId = 1;
    Todo.findOne({ where: { id: reqId } })
        .then(todo => res.send(todo))
        .catch(err => console.log(err));
})
router.patch(route, (req, res, next) => {

})
router.delete(route, (req, res, next) => {

})

module.exports = router;