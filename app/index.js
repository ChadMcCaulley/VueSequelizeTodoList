const express = require("express");
const router = express.Router();

router.use("/api/todo", require("./routes/todos"));
router.use("/api/todo/:id", require("./routes/todo"));

module.exports = router;



