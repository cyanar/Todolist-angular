var mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
     "content" : String,
     "done"   : Boolean
});

var Todo = mongoose.model("todo",todoSchema);

module.exports = Todo;