const express = require("express");
const {
    getMajor,
    addMajor,
    getMajorById,
    editMajor,
    deleteMajor,
} = require("../controllers/majorController");
const {
    getStudent,
    addStudent,
    getStudentById,
    editStudent,
    deleteStudent,
} = require("../controllers/studentController");

const router = express.Router();

router.get("/majors", getMajor);
router.get("/majors/:id", getMajorById);
router.post("/majors", addMajor);
router.post("/majors/edit/:id", editMajor);
router.post("/majors/delete/", deleteMajor);

router.get("/students", getStudent);
router.get("/students/:nis", getStudentById);
router.post("/students", addStudent);
router.post("/students/edit/:nis", editStudent);
router.post("/students/delete/:nis", deleteStudent);

module.exports = router;
