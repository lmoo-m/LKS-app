import React, { Component } from "react";
import majors from "../services/MajorServices";
import students from "../services/StudentServices";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default class FormStudent extends Component {
    state = {
        majors: [],
        name: "",
        gender: "",
        ttl: "",
        showPhoto: null,
        photo: "",
        selectMajor: null,
    };

    constructor(props) {
        super(props);

        this.getData = this.getData.bind(this);
        this.changePhoto = this.changePhoto.bind(this);
        this.addData = this.addData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    changePhoto(e) {
        const photo = e.target.files[0];
        console.log(URL.createObjectURL(photo));
        this.setState({
            showPhoto: URL.createObjectURL(photo),
            photo: photo,
        });

        console.log(this.state.photo);
    }

    async addData() {
        const data = {
            nama: this.state.name,
            gender: this.state.gender,
            tanggalLahir: this.state.ttl,
            majorId: this.state.selectMajor,
        };
        await students.addStudent(data);
        this.setState({
            name: "",
            gender: "",
            ttl: "",
            showPhoto: null,
            photo: "",
            selectMajor: null,
        });

        Swal.fire({
            icon: "success",
            title: "Berhasil Menambah Data",
        });
    }

    async getData() {
        const { data } = await majors.getMajors();
        this.setState({
            majors: data.data,
        });
    }

    render() {
        const { majors, showPhoto, name, ttl } = this.state;

        return (
            <div className="container d-flex justify-content-around mt-4">
                <div>
                    <label htmlFor="nama">Nama</label>
                    <input
                        value={name}
                        onChange={(e) =>
                            this.setState({
                                name: e.target.value,
                            })
                        }
                        className="form-control my-2"
                        id="nama"
                        placeholder="Nama"
                    />
                    <label>Gender</label>
                    <div className="my-2">
                        <input
                            onChange={(e) =>
                                this.setState({
                                    gender: e.target.value,
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
                                this.setState({
                                    gender: e.target.value,
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
                        value={ttl}
                        onChange={(e) =>
                            this.setState({
                                ttl: e.target.value,
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
                            this.setState({
                                selectMajor: e.target.value,
                            })
                        }
                        className="my-2 form-select"
                        id="jurusan"
                    >
                        <option value={"..."}>Choose...</option>
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
                            <button className="btn btn-warning">Kembali</button>
                        </Link>
                        <button
                            className="btn btn-primary my-2"
                            onClick={this.addData}
                        >
                            Submit
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
