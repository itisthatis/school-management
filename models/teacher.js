const mongoose = require('mongoose');
const teacherSchema = {
    name:String,
    number:Number,
    password:String,
    designation:String,
    idnum:Number
}
const teacherData = mongoose.model("Teacher_Register",teacherSchema);
module.exports = teacherData;