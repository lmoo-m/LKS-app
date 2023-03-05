import EndPoint from "../endpoint";

const majors = {
    getMajors() {
        return EndPoint.get("/majors");
    },

    getMajorsById(id) {
        return EndPoint.get(`/majors/${id}`);
    },

    addMajor(data) {
        return EndPoint.post("/majors", data);
    },

    editMajor(data, id) {
        return EndPoint.post(`/majors/edit/${id}`, data);
    },

    deleteMajor(data) {
        return EndPoint.post("/majors/delete/", data);
    },
};

export default majors;
