import React, { Component } from "react";
import { Link } from "react-router-dom";
import majors from "../services/MajorServices";
import Swal from "sweetalert2";

export default class Majors extends Component {
    state = {
        majors: [],
        name: "",
    };

    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.changeName = this.changeName.bind(this);
        this.addData = this.addData.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const { data } = await majors.getMajors();
        this.setState({
            majors: data.data,
        });
    }

    changeName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    async addData() {
        const data = {
            majorName: this.state.name,
        };
        await majors.addMajor(data);

        Swal.fire({
            icon: "success",
            title: "Berhasil Tambah Data",
        });
        this.getData();
        this.setState({
            name: "",
        });
    }

    delete(id, arr) {
        const data = {
            majorId: id,
        };

        const name = this.state.majors[arr].majorName;
        Swal.fire({
            icon: "warning",
            title: `Yakin Hapus ${name}?`,
            showDenyButton: true,
            confirmButtonText: "Ya",
            denyButtonText: "Tidak",
        }).then((res) => {
            if (res.isConfirmed) {
                majors.deleteMajor(data);
                Swal.fire({
                    icon: "success",
                    title: "berhasil hapus data",
                });
                this.getData();
            }
        });
    }

    render() {
        const { majors, name } = this.state;

        return (
            <div className="mt-3">
                <div className="d-flex justify-content-between px-4">
                    <h3>Data Jurusan</h3>

                    <div className="d-flex col-3">
                        <input
                            onChange={this.changeName}
                            value={name}
                            className="form-control"
                            placeholder="Nama Jurusan"
                        />
                        <button
                            className="btn  btn-primary mx-2"
                            onClick={this.addData}
                        >
                            Tambah
                        </button>
                    </div>
                </div>
                <div className="container mt-3">
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th className="col-1">No</th>
                                <th>Jurusan</th>
                                <th className="col-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {majors.map((data, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{data.majorName}</td>
                                        <td>
                                            <Link
                                                className="btn btn-info mx-2"
                                                to={`/majors/${data.majorId}`}
                                            >
                                                Details
                                            </Link>
                                            <button
                                                className="btn btn-danger mx-2"
                                                onClick={this.delete.bind(
                                                    null,
                                                    data.majorId,
                                                    i
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
