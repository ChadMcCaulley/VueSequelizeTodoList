const express = require("express");
const router = express.Router();
const Todo = require("../src/sqlite");

router.get("/", (req, res, next) => {
    Todo.findAll()
        .then(todos => res.send(todos))
        .catch(err => console.log(err));
})
router.post("/", (req, res, next) => {
    console.log(req.text, req.color);
    // Todo.create({
    //     id, 
    //     isDone: false,
    //     color,
    //     importance,
    //     text,
    //     createdAt,
    //     updatedAt: createdAt
    // })
    //     .then(res => res.send(res))
    //     .catch(err => console.log(err));
})

module.exports = router;