const mongoose = require('mongoose')

const studentSchema = {
    name:String,
    number:Number,
    password:String,
    class:Number,
    marks: Number
}

const studentData = mongoose.model("Student_Register",studentSchema);
module.exports = studentData;