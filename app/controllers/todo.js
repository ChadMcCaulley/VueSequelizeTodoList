const express = require("express");
const router = express.Router();
const { Todo } = require.main.require("./src/sqlite");
const {getMaxImportance, getMinImportance} = require("../../test");


router.get("/", (req, res) => {
    Todo
        .findAll({order: [["importance", "DESC"]]})
        .then(todos => res.json(todos))
        .catch(err => console.log(err));
})

router.post("/", async (req, res) => {
    // Get the color and text from the request
    let color = req.body.color;
    const text = req.body.text;
    const addToTop = req.body.addToTop;
    let importance;

    // Find current max and min importance
    addToTop ? importance = await getMaxImportance() + 1 : importance = await getMinImportance() - 1;

    // If there is not text provided, tell the frontend
    if (text === null || text === "") return res.send("Todos cannot be left blank");
    if (color === null || color.length !== 7 || !(/#{1}[0-9A-Fa-f]{6}/g.test(color))) color = "#FFFFFF";

    // Create the new todo 
    Todo
        .create({text, color, importance})
        .then((todo) => {res.json(todo)})
        .catch(err => console.log(err));
});


module.exports = router;