const express = require('express');
const controller = require("./controller")
const app = express();
app.use(express.json());


app.get("/health", (req, res) => {
    res.json({"status": "service is up and running"})
})
app.use("/calculator-service", controller)

app.listen(3005, ()=> {
    console.log(`App running at PORT : 3005`)
})