import React, { Component } from "react";
import Swal from "sweetalert2";

import styles from './styles/RegistroUsuario.module.css';

export default class RegistroUsuario extends Component {

    constructor(props){
        super(props);
        this.state = {
            countryList: [],
            cityList: []
        }
    }

    goIniciarSesion = () => {
        setTimeout(() => {
            window.location.href = "/IniciarSesion";
        }
            , 500);
    }

    componentDidMount(){
        const requestOptions ={
            method: 'GET',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        };

        fetch('https://countriesnow.space/api/v0.1/countries/capital', requestOptions)
        .then(response => response.json())
        .then(data => {
            this.setState({countryList: data.data})
        })
        .catch(error => {
            //console.log(error);
        }
        );


    }

    handlerCountryChange = (e) => {
        e.preventDefault();
        var ciudadSeleccionada = e.target.value;
        // //console.log("selected value",ciudadSeleccionada)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ country: ciudadSeleccionada })
        };

        fetch('https://countriesnow.space/api/v0.1/countries/cities', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ cityList: data.data })
            })
            .catch(error => {
                //console.log(error);
            });




        ////console.log(this.state.cityList);

    }

    onTrigger = (event) => {
        event.preventDefault();
        //realizar registro
        //get data
        var correo = document.getElementById("correo").value;
        var user = document.getElementById("user").value;
        var nombre = document.getElementById("nombre").value;
        var contrasena = document.getElementById("contrasena").value;
        var fecha = document.getElementById("fecha").value;
        var contrasena2 = document.getElementById("contrasena2").value;
        var fechaArray = fecha.split("-");
        var fechaFinal = fechaArray[0] + "-" + fechaArray[1] + "-" + fechaArray[2] ;
        
        var pais = document.getElementById("pais").value;
        var ciudad = document.getElementById("ciudad").value;

        if (contrasena !== contrasena2) {
            Swal.fire({
                title: 'Error',
                text: "Las contraseñas no coinciden",
                icon: 'error',
                confirmButtonText: 'Ok'

            }).then((result) => {
                if (result.isConfirmed) {
                    return;
                }
            })
        }
        else {
            //realizar registro
            let formData = new FormData();
            formData.append("full_name", nombre);
            formData.append("date_birth", fechaFinal);
            formData.append("email", correo);
            formData.append("nickname", user);
            formData.append("password", contrasena);
            formData.append("type_user",4)
            formData.append("country", pais);
            formData.append("city", ciudad);


            fetch(process.env.REACT_APP_API_URL+'signup', {
                method: "POST",
                body: formData
            }).then(response => response.json())
                .then(data => {
                    // //console.log(data);
                    if (data.status === "ok") {
                        Swal.fire({
                            title: 'Bienvenido',
                            text: "Bienvenido " + nombre,
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = "/IniciarSesion";
                            }
                        })
                    } else if(data.code ==='ER_DUP_ENTRY'){
                        Swal.fire({
                            title: 'Error',
                            text: "El correo o el usuario ya se encuentra registrado",
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                return;
                            }
                        })
                    }
                    
                    else {
                        Swal.fire({
                            title: 'Error',
                            text: "No se ha podido crear usuario",
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                return;
                            }
                        })
                    }
                })



        }






        //enviar tipo de usuario = 4 en fetch

    }





    render() {
        return (
            <div className={styles.card}>
                <h2>Registrarme</h2>
                {/* divider */}
                <div className={styles.divider}></div>
                <form onSubmit={this.onTrigger}>

                    <div className={styles.form_elements}>


                        <div className={styles.form_group}>
                            <label htmlFor="correo">Correo Electronico</label>
                            <input type="email" className="form-control" id="correo" placeholder="Correo Electronico" required />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="user">Nombre de Usuario</label>
                            <input type="text" className="form-control" id="user" placeholder="Usuario" required />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="nombre">Nombre Completo</label>
                            <input type="text" className="form-control" id="nombre" placeholder="Nombre" />
                        </div>

                        
                        <div className={styles.form_group}>
                            <label htmlFor="fecha">Fecha de Nacimiento</label>
                            <input type="date" className="form-control" id="fecha" placeholder="Fecha de Nacimiento" />
                            {/* <input type='text' id='fecha2' className="form-control" disabled/> */}
                        </div>
                        <div className={styles.form_group}>
                            <label htmlFor="contrasena">Contraseña</label>
                            <input type="password" className="form-control" id="contrasena" placeholder="Contraseña" required />
                        </div>
                        <div className={styles.form_group}>
                            <label htmlFor="contrasena2">Confirmar Contraseña</label>
                            <input type="password" className="form-control" id="contrasena2" placeholder="Contraseña" required />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="pais">Pais</label>
                            <select className="form-control" onChange={this.handlerCountryChange} id="pais">
                            {
                                    Object.keys(this.state.countryList).map((key, index) => (
                                        <option key={index} value={this.state.countryList[key].name}>{this.state.countryList[key].name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="ciudad">Ciudad</label>
                            
                            <select className="form-control" id="ciudad" placeholder="Seleccione Pais">
                                {
                                    Object.keys(this.state.cityList).map((key, index) => (
                                        <option key={index} value={this.state.cityList[key]}>{this.state.cityList[key]}</option>
                                    ))
                                }
                            </select>

                        </div>
                    </div>

                    <div className={styles.buttons}>
                        <button onClick={this.goIniciarSesion} className={styles.btn_iniciar}>Iniciar Sesion</button>
                        <button className={styles.btn_crear}>Crear Cuenta</button>
                    </div>

                </form>

            </div>
        );
    }
}