const express = require('express')
const routes =  require("./routes/routes");
const cors = require("cors")

const app = express();

app.use(cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
}));

app.use(express.json());
app.use(routes);

module.exports = app;
