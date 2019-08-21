const router = require("express").Router();
const path = require('path')
const { todo , todos } = require.main.require('./app/controllers')

// loads index.html main app
const home = (req, res) => { res.sendFile(path.join(__dirname + 'app/views/index.html')) }

// Site Routing hookups
router.get('/', home)
.use("/api/todo", todo)
.use("/api/todo/:id", todos)

module.exports = router
