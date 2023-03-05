const major = require("../models/majorModel");
const student = require("../models/studentModel");

const getStudent = async (req, res) => {
    const data = await student.findAll({
        include: {
            model: major,
        },
    });
    res.send({
        status: true,
        messaeg: "berhasil ambil data siswa",
        data: data,
    });
};

const getStudentById = async (req, res) => {
    const data = await student.findOne({
        where: {
            nis: req.params.nis,
        },
        include: {
            model: major,
        },
    });
    res.send({
        status: true,
        messaeg: "berhasil ambil data siswa",
        data: data,
    });
};

const addStudent = async (req, res) => {
    try {
        await student.create({
            nama: req.body.nama,
            gender: req.body.gender,
            tanggalLahir: req.body.tanggalLahir,
            majorId: req.body.majorId,
        });
        res.send({
            status: true,
            messaeg: "berhasil ambil data siswa",
            data: [],
        });
    } catch (error) {
        console.error(error);
    }
};

const editStudent = async (req, res) => {
    await student.update(
        {
            nama: req.body.nama,
            tanggalLahir: req.body.tanggalLahir,
            majorId: req.body.majorId,
        },
        { where: { nis: req.params.nis } }
    );

    res.send({
        status: true,
        messaeg: "berhasil update data siswa",
        data: [],
    });
};

const deleteStudent = async (req, res) => {
    await student.destroy({
        where: {
            nis: req.params.nis,
        },
    });

    res.send({
        status: true,
        messaeg: "berhasil hapus data siswa",
        data: [],
    });
};

module.exports = {
    getStudent,
    addStudent,
    getStudentById,
    editStudent,
    deleteStudent,
};
