const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
    }
},{
    timestamps: true
});

module.exports = Task = mongoose.model("Task", TaskSchema);
