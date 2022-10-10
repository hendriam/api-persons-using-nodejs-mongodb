module.exports = (app) => {
    const PersonController = require("../controllers/PersonController.js");
    const GenderController = require("../controllers/GenderController.js");

    app.get("/person", PersonController.getAll);
    app.get("/person/:id", PersonController.getOne);
    app.post("/person/create", PersonController.create);
    app.put("/person/update/:id", PersonController.update);
    app.delete("/person/delete/:id", PersonController.delete);

    app.get("/gender", GenderController.getAll);
    app.get("/gender/:id", GenderController.getOne);
    app.post("/gender/create", GenderController.create);
    app.put("/gender/update/:id", GenderController.update);
    app.delete("/gender/delete/:id", GenderController.delete);
};
