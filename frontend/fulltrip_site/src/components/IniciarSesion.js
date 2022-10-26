import React, { Component } from "react";
import Swal from "sweetalert2";
//import styles
import styles from "./styles/IniciarSesion.module.css";
import CryptoJS from "crypto-js";

export default class IniciarSesion extends Component {

    //inicio de sesion por email

    constructor(props) {
        super(props);
        this.state = {
            user: "",
            email: "",
            password: "",
            tipo: "",
        }


    }

    componentDidMount() {
        var usuario = ""
        // //console.log("componente montado", usuario)
        window.sessionStorage.getItem('nombre') !== null ? usuario = CryptoJS.AES.decrypt(window.sessionStorage.getItem('nombre'), 'fulltrip').toString(CryptoJS.enc.Utf8) : usuario = "";
        var tipo = ""
        window.sessionStorage.getItem('tipo') !== null ? tipo = CryptoJS.AES.decrypt(window.sessionStorage.getItem('tipo'), 'fulltrip').toString(CryptoJS.enc.Utf8) : tipo = "";

        if (usuario !== "") {
            Swal.fire({
                title: 'Ya estas logueado',
                text: "Ya estas logueado como " + usuario,
                icon: 'info',
                confirmButtonText: 'Ok'

            }).then((result) => {
                if (result.isConfirmed) {
                    if (tipo === "administrador") {
                        window.location.href = "/DashboardAdmin";
                    }
                    else {
                        window.location.href = "/Perfil";
                    }

                }
            })
        }


    }
    goRegistro = () => {
        //go to /Registrarse with window
        setTimeout(() => {
            window.location.href = "/Registrarse";
        }
            , 500);

    }

    onTrigger = (event) => { //se ejecuta al momendo de mandar el formulario
        event.preventDefault();
        var user_ingresado = this.state.user;
        var pass_ingresado = this.state.password;






        let formData = new FormData()
        formData.append('email', user_ingresado)
        formData.append('password', pass_ingresado)
        

        fetch(process.env.REACT_APP_API_URL+'login', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                // //console.log(data);
                if (data.userid !== undefined) {
                    //el usuario existe procede el login
                    // //console.log("userid", data.userid)
                    window.sessionStorage.setItem("email", CryptoJS.AES.encrypt(data.email, 'fulltrip').toString());
                    window.sessionStorage.setItem("nombre", CryptoJS.AES.encrypt(data.fullname, 'fulltrip').toString());
                    window.sessionStorage.setItem("tipo", CryptoJS.AES.encrypt(data.type_user, 'fulltrip').toString());
                    window.sessionStorage.setItem("id", data.userid);
                    Swal.fire({
                        title: 'Bienvenido',
                        text: "Bienvenido " + data.fullname,
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            if (data.type_user === "administrador") {
                                window.location.href = "/DashboardAdmin";
                            }
                            else {
                                window.location.href = "/Perfil";
                            }



                        }
                    })
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: "El email o la contraseña son incorrectos",
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                }

            })
    }



    handleChangeUser = (event) => {
        this.setState({
            user: event.target.value
        });
    }

    handleChangePassword = (event) => {
        this.setState({
            password: event.target.value
        });
    }


    render() {
        return (
            <div className={styles.card}>
                <h2>Iniciar Sesión</h2>
                {/* divider */}
                <div className={styles.divider}></div>
                <form onSubmit={this.onTrigger}>
                    <div className={styles.form_elements}>
                        <div className={styles.form_group}>
                            <label htmlFor="nombre_usuario">Correo Electronico</label>
                            <input name="nombre_usuario" type="email" className="form-control" id="nombre_usuario" placeholder="Email" onChange={this.handleChangeUser} />
                        </div>
                        <div className={styles.form_group}>
                            <label htmlFor="contrasena">Contraseña</label>
                            <input type="password" className="form-control" id="contrasena" placeholder="Contraseña" onChange={this.handleChangePassword} />
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button type="submit" className={styles.btn_iniciar}>Iniciar Sesion</button>
                        <button onClick={this.goRegistro} className={styles.btn_crear}>Registrarme</button>
                    </div>
                </form>
            </div>
        );
    }
}
