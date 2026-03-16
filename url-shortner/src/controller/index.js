const express = require("express")
const {shorten, redirect} = require("./urlController")
const router = express.Router();

router.post("/shorten", shorten)
router.get("/:shortCode", redirect)

module.exports = router