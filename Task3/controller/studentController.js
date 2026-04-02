import StudentData from "../models/StudentData.js";
import Counter from "../models/Counter.js";

const formatStudent = (student) => {
  return {
    id: student.studentId,
    mongoId: student._id,
    name: student.Student_name,
    email: student.Student_email,
    age: student.Student_age
  };
};

const getStudentByRouteId = async (id) => {
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId < 1) {
    return null;
  }

  return StudentData.findOne({ studentId: numericId });
};

const createStudent = async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const existingStudent = await StudentData.findOne({ Student_email: email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student with this email already exists"
      });
    }

    const counter = await Counter.findOneAndUpdate(
      { name: "studentId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const newStudent = new StudentData({
      studentId: counter.seq,
      Student_name: name,
      Student_email: email,
      Student_age: age
    });

    await newStudent.save();

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: formatStudent(newStudent)
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await StudentData.find();
    const formattedStudents = students.map((student) => formatStudent(student));

    res.status(200).json({
      success: true,
      count: students.length,
      data: formattedStudents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getSingleStudent = async (req, res) => {
  try {
    const student = await getStudentByRouteId(req.params.id);

    if (!student && !Number.isInteger(Number(req.params.id))) {
      return res.status(400).json({
        success: false,
        message: "Invalid student id. Use a number like 1, 2, or 3."
      });
    }

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.status(200).json({
      success: true,
      data: formatStudent(student)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const numericId = Number(req.params.id);

    if (!Number.isInteger(numericId) || numericId < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid student id. Use a number like 1, 2, or 3."
      });
    }

    const updatedStudent = await StudentData.findOneAndUpdate(
      { studentId: numericId },
      {
        Student_name: name,
        Student_email: email,
        Student_age: age
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: formatStudent(updatedStudent)
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const numericId = Number(req.params.id);

    if (!Number.isInteger(numericId) || numericId < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid student id. Use a number like 1, 2, or 3."
      });
    }

    const deletedStudent = await StudentData.findOneAndDelete({ studentId: numericId });

    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: formatStudent(deletedStudent)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent
};
