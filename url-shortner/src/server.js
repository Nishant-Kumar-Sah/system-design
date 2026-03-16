require("dotenv").config()
const { PORT } = require("./config")
const express = require("express")
const controller = require("./controller")
const app = express();
app.use(express.json());

app.use("/url-shortner/api", controller)
app.listen(PORT, () => {
    console.log(`URL Shortner Service Running at PORT ${PORT}`)
})