import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Majors from "./components/Majors";
import MajorById from "./components/MajorById";
import Students from "./components/Students";
import FormStudent from "./components/FormStudent";
import StudentById from "./components/StudentById";

export default class App extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Routes>
                    <Route path="/majors" element={<Majors />} />
                    <Route path="/majors/:id" element={<MajorById />} />
                    <Route path="/students" element={<Students />} />
                    <Route path="/students/:nis" element={<StudentById />} />
                    <Route path="/students/tambah" element={<FormStudent />} />
                </Routes>
            </div>
        );
    }
}
