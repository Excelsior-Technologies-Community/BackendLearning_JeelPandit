import mongoose from "mongoose";

const studentSchema = new mongoose.Schema (
    {
        studentId:
        {
            type: Number,
            required: true,
            unique: true
        },
        Student_name :
        {
            type :String,
            required : true
        },
        Student_email : 
        {
            type : String,
            required : true,
            unique : true,
        },
        Student_age : 
        {
            type : Number,
            required : true
        }
    },
    {
        timestamps : true,
        collection: "studentData"
    }
)

const StudentData = mongoose.model("StudentData", studentSchema);

export default StudentData;
