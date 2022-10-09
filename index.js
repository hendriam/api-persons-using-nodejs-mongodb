const express = require("express"),
    app = express(),
    port = process.env.PORT || 7027,
    bodyParser = require("body-parser");

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

var routes = require("./routes/route");
routes(app);

app.listen(port);
console.log(`[PERSON APP] READY => PORT ${JSON.stringify(port)}`);
