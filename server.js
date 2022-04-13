const express = require("express");
const path = require("path");
const port = process.env.PORT || 3003;
const app = express();
const fs = require("fs");

app.use(express.static(__dirname));
app.listen(port);

console.log("Now running at http://localhost:" + port);
