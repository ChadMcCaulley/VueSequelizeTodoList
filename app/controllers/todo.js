const express = require("express");
const router = express.Router();
const Todo = require.main.require("./src/sqlite");

router.get("/", (req, res, next) => {
    Todo.findAll()
        .then(todos => res.send(todos))
        .catch(err => console.log(err));
})
router.post("/", (req, res, next) => {
    const color = req.query.color;
    const text = req.query.text;
    const createdAt = new Date();
    Todo.create({
        id: 5, 
        isDone: false,
        color,
        importance: 5,
        text,
        createdAt,
        updatedAt: createdAt
    })
        .then(res => res.send(res))
        .catch(err => console.log(err));
})

module.exports = router;