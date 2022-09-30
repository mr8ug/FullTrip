import React, { Component } from "react";
import Swal from "sweetalert2";

//import styles
import styles from "./styles/IniciarSesion.module.css";

export default class IniciarSesion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: "",
            tipo: "",
        }
    }
    goRegistro = () => {
        //go to /Registrarse with window
        setTimeout(() => {
            window.location.href = "/Registrarse";
        }
            , 500);

    }

    obtenerTipoUsuario = (usuario_ingresado) => {
        fetch("http://localhost:4000/api/userType",{
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({
                user: usuario_ingresado
            })
            

        })
        .then(response => response.json())
        .then(data => {
            console.log(data.data[0]);
            if(data.data[0].type_user === "user"){
                console.log("Usuario es cliente")
                return "user";
            }else if(data.data[0].type_user === "admin"){
                console.log("Usuario es admin")
                return "admin";
            }else{
                console.log("Usuario es agente")
                return "agente";
            }
        })
    }




    onTrigger = (event) => { //se ejecuta al momendo de mandar el formulario
        event.preventDefault();
        //realizar validaciones de formato 
        //si todo esta bien, mandar a llamar a la funcion del padre
        //check if the user is registered
        //if the user is registered, then go to the home page
        //if the user is not registered, then show an error message

        var usuario_ingresado = event.target.nombre_usuario.value
        // var password_ingresado = event.target.password.value
        fetch("http://localhost:4000/api/userExist",{
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({
                user: usuario_ingresado
            })

        })
        .then(response => response.json())
        .then(data => {
            console.log(data.data[0]);
            if(data.data[0].usuario_existe === 1){
                

                // this.state.user = usuario_ingresado;
                this.setState({
                    user: usuario_ingresado
                });

                console.log("Usuario Existe: ",usuario_ingresado,this.state.user);

                // this.state.tipo = this.obtenerTipoUsuario(usuario_ingresado);
                this.setState({
                    tipo: this.obtenerTipoUsuario(usuario_ingresado)
                })

                Swal.fire({
                    title: 'Bienvenido '+this.state.user,
                    text: 'Iniciando sesion',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                }).then(
                    function (isConfirm) {
                        if (isConfirm) {
                            
                            console.log("Enviando parent callback")
                            
                            
                        }
                    }
                )
                }else{
                console.log("Usuario no existe")
            }
        })
        .catch(error => {
            console.log(error);
        }
        );

        this.props.parentCallback(this.state.user, this.state.tipo);
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
                            <label htmlFor="nombre_usuario">Usuario</label>
                            <input name="nombre_usuario" type="text" className="form-control" id="nombre_usuario" placeholder="Nombre de Usuario" />

                            <label htmlFor="contrasena">Contraseña</label>
                            <input type="password" className="form-control" id="contrasena" placeholder="Contraseña" minLength={8}/>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.btn_iniciar}>Iniciar Sesion</button>
                        <button onClick={this.goRegistro} className={styles.btn_crear}>Registrarme</button>
                    </div>
                </form>
            </div>
        );
    }
}
