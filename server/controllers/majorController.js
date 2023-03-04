const major = require("../models/majorModel");

const getMajor = async (req, res) => {
    const data = await major.findAll();
    res.send({
        status: true,
        message: "berhasil ambil data",
        data: data,
    });
};

const getMajorById = async (req, res) => {
    const data = await major.findAll({ where: { majorId: req.params.id } });
    res.send({
        status: true,
        message: "berhasil ambil data",
        data: data,
    });
};

const addMajor = async (req, res) => {
    const { majorId, majorName } = req.body;

    await major.create({
        majorId: majorId,
        majorName: majorName,
    });

    res.send({
        status: true,
        message: "berhasil tambah data",
        data: [],
    });
};

const editMajor = async (req, res) => {
    await major.update(req.body, {
        where: {
            majorId: req.params.id,
        },
    });

    res.send({
        status: true,
        message: "berhasil update data",
        data: [],
    });
};

const deleteMajor = async (req, res) => {
    await major.destroy({
        where: {
            majorId: req.body.majorId,
        },
    });
    res.send({
        status: true,
        message: "berhasil hapus data",
        data: [],
    });
};

module.exports = {
    getMajor,
    addMajor,
    getMajorById,
    editMajor,
    deleteMajor,
};
