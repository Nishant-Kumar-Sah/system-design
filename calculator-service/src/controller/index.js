const express = require("express")
const {register, login} = require("./userController")
const operation = require("./operationController")
const router = express.Router();

router.post("/user/register", register)
router.post("/user/login", login)

router.post("/operation", operation)

module.exports = router
