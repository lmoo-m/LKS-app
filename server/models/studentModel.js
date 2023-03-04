const { DataTypes } = require("sequelize");
const db = require("../config/db");
const major = require("./majorModel");

const student = db.define(
    "students",
    {
        nis: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: true,
            primaryKey: true,
        },
        nama: DataTypes.STRING,
        tanggalLahir: DataTypes.STRING,
        foto: DataTypes.STRING,
        majorId: DataTypes.INTEGER,
    },
    {
        // indexes: false,
        freezeTableName: true,
        updatedAt: false,
        createdAt: false,
    }
);

student.hasOne(major, { foreignKey: "majorId" });
student.belongsTo(major, { foreignKey: "majorId" });

module.exports = student;
