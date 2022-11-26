const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const PORT = 8080;

// Parse requests of content-type: application/json
app.use(bodyParser.json());

// Parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.json({message: "Hello World!"});
});

// DB Connection
const db = require('./models/db.js');

require("./routes/route.js")(app);

// Set listen port for request
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});