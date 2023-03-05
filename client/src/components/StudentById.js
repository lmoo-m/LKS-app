import React, { Component } from "react";
import majors from "../services/MajorServices";
import students from "../services/StudentServices";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

class StudentById extends Component {
    state = {
        student: [],
        majors: [],
        majorStudent: {},
    };

    constructor(props) {
        super(props);

        this.getData = this.getData.bind(this);
        this.changePhoto = this.changePhoto.bind(this);
        this.getStudent = this.getStudent.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        this.getData();
        this.getStudent();
    }

    async getStudent() {
        const { nis } = this.props.params;
        const { data } = await students.getStudentByNis(nis);
        this.setState({
            student: data.data,
            majorStudent: data.data.major,
        });
    }

    changePhoto(e) {
        const photo = e.target.files[0];
        this.setState({
            showPhoto: URL.createObjectURL(photo),
            photo: photo,
        });

        console.log(this.state.photo);
    }

    edit() {
        const data = this.state.student;
        const { nis } = this.props.params;

        Swal.fire({
            icon: "info",
            title: `yakin ingin mengubah data?`,
            showCancelButton: true,
        }).then((res) => {
            if (res.isConfirmed) {
                students.editStudent(data, nis);
                Swal.fire({
                    icon: "success",
                    title: "Berhasil Mengupdate Data",
                });
                this.getStudent();
            }
        });
    }

    async getData() {
        const { data } = await majors.getMajors();
        this.setState({
            majors: data.data,
        });
    }

    render() {
        const { majors, showPhoto, student, majorStudent } = this.state;

        return (
            <div className="container d-flex justify-content-around mt-4">
                <div>
                    <label htmlFor="nama">Nama</label>
                    <input
                        value={student.nama || ""}
                        onChange={(e) =>
                            this.setState((prev) => {
                                return {
                                    student: {
                                        ...prev.student,
                                        nama: e.target.value,
                                    },
                                };
                            })
                        }
                        className="form-control my-2"
                        id="nama"
                        placeholder="Nama"
                    />
                    <label>Gender ({student.gender})</label>
                    <div className="my-2">
                        <input
                            onChange={(e) =>
                                this.setState((prev) => {
                                    return {
                                        student: {
                                            ...prev.student,
                                            gender: e.target.value,
                                        },
                                    };
                                })
                            }
                            type={"radio"}
                            id="lk"
                            value={"Laki Laki"}
                            name="gender"
                            className="form-chech-input m-2"
                        />
                        <label htmlFor="lk">Laki Laki</label>
                        <input
                            onChange={(e) =>
                                this.setState((prev) => {
                                    return {
                                        student: {
                                            ...prev.student,
                                            gender: e.target.value,
                                        },
                                    };
                                })
                            }
                            type={"radio"}
                            id="pr"
                            value={"Perempuan"}
                            name="gender"
                            className="form-chech-input m-2"
                        />
                        <label htmlFor="pr">Perempuan</label>
                    </div>
                    <label htmlFor="ttl">Tempat, Tanggal Lahir</label>
                    <input
                        value={student.tanggalLahir || ""}
                        onChange={(e) =>
                            this.setState((prev) => {
                                return {
                                    student: {
                                        ...prev.student,
                                        tanggalLahir: e.target.value,
                                    },
                                };
                            })
                        }
                        id="ttl"
                        className="form-control my-2"
                        placeholder="Tempat, Tanggal Lahir"
                    />
                    <label htmlFor="jurusan">Jurusan</label>
                    <br />
                    <select
                        onChange={(e) =>
                            this.setState((prev) => {
                                return {
                                    student: {
                                        ...prev.student,
                                        majorId: e.target.value,
                                    },
                                };
                            })
                        }
                        className="my-2 form-select"
                        id="jurusan"
                    >
                        <option
                            value={majorStudent.majorId}
                            className="bg-dark text-light"
                        >
                            {majorStudent.majorName}
                        </option>
                        {majors.map((data, i) => (
                            <option value={data.majorId} key={i}>
                                {data.majorName}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="photo">Photo</label>
                    <input
                        id="photo"
                        type={"file"}
                        className="form-control my-2"
                        onChange={this.changePhoto}
                    />
                    <div className="d-flex justify-content-between align-items-center">
                        <Link to={"/students"}>
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
                <div className="d-flex flex-column justify-content-center col-2">
                    <img
                        className="img-thumbnail"
                        style={{ maxWidth: "200px" }}
                        src={showPhoto || null}
                        alt="p"
                    />
                </div>
            </div>
        );
    }
}

const Params = (props) => {
    return <StudentById {...props} params={useParams()} />;
};

export default Params;
