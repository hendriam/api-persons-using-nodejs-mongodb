const Person = require("../models/Person.js");
const Gender = require("../models/Gender.js");
const moment = require("moment");

exports.getAll = async (req, res) => {
    let _data = await getPerson();
    let stat = {
        message: "oke",
        data: _data,
    };

    console.log(`[Person] get data successfull => ${JSON.stringify(_data)}`);
    return res.status(200).send(stat);
};

exports.getOne = async (req, res) => {
    let _data = await getOnePerson(req.params.id);

    // if data null send this response
    if (_data == null) {
        return res.status(404).send({
            message: `not found`,
            data: null,
        });
    }

    let stat = {
        message: "oke",
        data: _data,
    };
    console.log(`[Person] get data successfull => ${JSON.stringify(_data)}`);
    return res.status(200).send(stat);
};

exports.create = async (req, res) => {
    let data = {
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    // check name is already ?
    let checkName = await _checkName(data.name);
    if (checkName != null) {
        return res.status(422).send({
            message: `name is already, please change name`,
            data: null,
        });
    }

    let created = await createPerson(data);

    if (created == "ERROR") {
        return res.status(422).send({
            message: `create failed`,
            data: null,
        });
    }
    console.log(`create person success ${JSON.stringify(created)}`);

    return res.status(200).send({
        message: "create success",
        data: created,
    });
};

exports.update = async (req, res) => {
    let data = {
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    let updated = await updatePerson(req.params.id, data);
    if (updated == "ERROR") {
        return res.status(422).send({
            message: `update failed`,
            data: null,
        });
    }
    console.log(`update person success ${JSON.stringify(updated)}`);
    return res.status(200).send({
        message: "update success",
        data: updated,
    });
};

exports.delete = async (req, res) => {
    let deleted = await deletePerson(req.params.id);
    if (deleted == "ERROR") {
        return res.status(422).send({
            message: `delete failed`,
            data: null,
        });
    }
    console.log(`delete person success ${JSON.stringify(deleted)}`);

    return res.status(200).send({
        message: "delete success",
        data: deleted,
    });
};

function getPerson() {
    return new Promise(function (resolve, reject) {
        Person.find()
            .populate("gender")
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                resolve("ERROR");
            });
    });
}

function getOnePerson(_id) {
    return new Promise(function (resolve, reject) {
        Person.findOne({ _id: _id })
            .populate("gender")
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                resolve("ERROR");
            });
    });
}

function _checkName(_name) {
    return new Promise(function (resolve, reject) {
        Person.findOne({ name: _name })
            .populate("gender")
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                resolve("ERROR");
            });
    });
}

function createPerson(_data) {
    return new Promise(function (resolve, reject) {
        const saveGender = new Person(_data);
        saveGender
            .save()
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                resolve("ERROR");
            });
    });
}

function updatePerson(_id, _data) {
    return new Promise(function (resolve, reject) {
        Person.findByIdAndUpdate(_id, _data, {
            new: true,
        })
            .populate("gender")
            .then((_data) => {
                resolve(_data);
            })
            .catch((err) => {
                resolve("ERROR");
            });
    });
}

function deletePerson(_id) {
    return new Promise(function (resolve, reject) {
        Person.findByIdAndRemove(_id)
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                resolve("ERROR");
            });
    });
}
