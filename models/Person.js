const mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

const personSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        gender: {
            type: ObjectId,
            ref: "genders",
            required: false,
        },
        age: {
            type: Number,
            required: true,
        },
        createdAt: String,
        updatedAt: String,
    },
    {
        timestamps: false,
    }
);

module.exports = mongoose.model("persons", personSchema);
