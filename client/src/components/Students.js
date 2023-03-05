import React, { Component } from "react";
import { Link } from "react-router-dom";
import students from "../services/StudentServices";
import Swal from "sweetalert2";

export default class Students extends Component {
    state = {
        students: [],
    };

    constructor(props) {
        super(props);

        this.getData = this.getData.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const { data } = await students.getStudent();
        this.setState({
            students: data.data,
        });
    }

    async delete(nis) {
        Swal.fire({
            icon: "warning",
            title: "Yakin Hapus Data?",
            showDenyButton: true,
            denyButtonText: "Tidak",
            confirmButtonText: "Ya",
        }).then((res) => {
            if (res.isConfirmed) {
                students.deleteStudent(nis);
                Swal.fire({
                    icon: "success",
                    title: "Berhasil Hapus Data",
                });
                this.getData();
            }
        });
    }

    render() {
        const { students } = this.state;

        // students.forEach((e, i) => {
        //     const major = e.major;
        //     console.log(major.majorName);
        // });

        return (
            <div className="mt-3">
                <div className="d-flex justify-content-between px-4">
                    <h3>Data Murid</h3>
                    <Link className="btn btn-primary" to={"/students/tambah"}>
                        Tambah
                    </Link>
                </div>
                <div className="container mt-3">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>NIS</th>
                                <th>Nama</th>
                                <th>Gender</th>
                                <th>Tanggal Lahir</th>
                                <th>Jurusan</th>
                                <th>Foto</th>
                                <th className="col-3">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((data, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{data.nis}</td>
                                        <td>{data.nama}</td>
                                        <td>{data.gender}</td>
                                        <td>{data.tanggalLahir}</td>
                                        <td>{data.major.majorName}</td>
                                        <td>{data.foto}</td>
                                        <td>
                                            <Link
                                                to={`/students/${data.nis}`}
                                                className="btn btn-info mx-2"
                                            >
                                                Details
                                            </Link>
                                            <button
                                                className="btn btn-danger mx-2"
                                                onClick={this.delete.bind(
                                                    null,
                                                    data.nis
                                                )}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
