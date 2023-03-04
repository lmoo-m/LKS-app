const db = require("../config/db");
const { DataTypes } = require("sequelize");

const major = db.define(
    "majors",
    {
        majorId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: true,
            primaryKey: true,
        },
        majorName: DataTypes.STRING,
    },
    {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
    }
);

module.exports = major;
