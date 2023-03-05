import EndPoint from "../endpoint";

const students = {
    getStudent() {
        return EndPoint.get("/students");
    },

    getStudentByNis(nis) {
        return EndPoint.get(`/students/${nis}`);
    },

    addStudent(data) {
        return EndPoint.post("/students", data);
    },

    editStudent(data, nis) {
        return EndPoint.post(`/students/edit/${nis}`, data);
    },

    deleteStudent(nis) {
        return EndPoint.post(`/students/delete/${nis}`);
    },
};

export default students;
