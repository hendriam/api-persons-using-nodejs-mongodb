module.exports = (app) => {
    const PersonController = require("../controllers/PersonController.js");
    const GenderController = require("../controllers/GenderController.js");

    app.get("/person", PersonController.getAll);

    app.get("/gender", GenderController.getAll);
};
