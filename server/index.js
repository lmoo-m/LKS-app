const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./config/db");
const major = require("./models/majorModel");
const student = require("./models/studentModel");
const router = require("./routes/");
const { route } = require("./routes/");

dotenv.config();

const app = express();

try {
    db.authenticate();
    // major.sync();
    // student.sync();
    console.log("connected");
} catch (error) {
    console.log(error);
}

app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(process.env.PORT, () => console.log("running in", process.env.PORT));
