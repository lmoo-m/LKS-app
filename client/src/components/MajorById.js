import React, { Component } from "react";
import { useParams } from "react-router-dom";
import majors from "../services/MajorServices";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

class MajorById extends Component {
    state = {
        major: {},
        majorName: "",
    };

    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.changeName = this.changeName.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        let { id } = this.props.params;
        this.getData(id);
    }

    changeName(e) {
        this.setState({
            major: {
                majorId: this.state.major.majorId,
                majorName: e.target.value,
            },
        });
    }

    async getData(id) {
        const { data } = await majors.getMajorsById(id);
        this.setState({
            major: data.data[0],
            majorName: data.data[0].majorName,
        });
    }

    async edit() {
        const data = {
            majorId: this.state.major.majorId,
            majorName: this.state.major.majorName,
        };

        Swal.fire({
            icon: "warning",
            title: `Yakin Update?`,
            text: `${this.state.majorName} = ${data.majorName}`,
            showDenyButton: true,
            confirmButtonText: "Ya",
            denyButtonText: "Tidak",
        }).then((res) => {
            if (res.isConfirmed) {
                majors.editMajor(data, data.majorId);
                Swal.fire({
                    icon: "success",
                    title: "Berhasil Update Data",
                });
                this.getData(data.majorId);
            }
        });
    }

    render() {
        const { major } = this.state;
        return (
            <div className="container mt-3 col-3">
                <label htmlFor="idJurusan">Id Jurusan</label>
                <input
                    disabled
                    className="form-control my-3"
                    value={major.majorId || ""}
                    id="idJurusan"
                    placeholder="Id Jurusan"
                />
                <label htmlFor="namaJurusan">Nama Jurusan</label>
                <input
                    value={major.majorName || ""}
                    onChange={this.changeName}
                    id="namaJurusan"
                    className="form-control my-3"
                    placeholder="Nama Jurusan"
                />
                <div className="d-flex justify-content-between align-items-center">
                    <Link to={"/majors"}>
                        <button className="btn btn-dark">Kembali</button>
                    </Link>
                    <button
                        className="btn btn-warning my-2"
                        onClick={this.edit}
                    >
                        Edit
                    </button>
                </div>
            </div>
        );
    }
}

const Params = (props) => {
    return <MajorById {...props} params={useParams()} />;
};

export default Params;
