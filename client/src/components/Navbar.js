import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark p-3">
                <Link className="navbar-brand" to={"/"}>
                    LKS
                </Link>
                <div className="navbar-nav mt-auto">
                    <li>
                        <Link className="nav-link" to={"/majors"}>
                            Majors
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-link" to={"/students"}>
                            Students
                        </Link>
                    </li>
                </div>
            </nav>
        );
    }
}
