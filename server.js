// require express module
const express = require('express');

// require path module
const path = require('path');

// create new app
const app = express();

// port for local and web execution
const HTTP_PORT = process.env.PORT || 8080;

// serve only the static files 
app.use(express.static(__dirname + '/dist/assign2'));

// server start up
app.listen(HTTP_PORT, () => {
    console.log("Web service listening on port: " + HTTP_PORT);
});

// home route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/assign2/index.html'));
});

//no matching routes
app.use((req, res) => {
    res.sendFile(path.join(__dirname + '/dist/assign2/index.html'));
});