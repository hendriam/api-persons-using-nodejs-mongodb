const mongoose = require("mongoose");

const genderSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        createdAt: String,
        updatedAt: String,
    },
    {
        timestamps: false,
    }
);

module.exports = mongoose.model("gender", genderSchema, "gender");
