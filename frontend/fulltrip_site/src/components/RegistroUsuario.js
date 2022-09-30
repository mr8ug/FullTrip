import React, { Component } from "react";


import styles from './styles/RegistroUsuario.module.css';

export default class RegistroUsuario extends Component {

    goIniciarSesion = () => {
        setTimeout(() => {
            window.location.href = "/IniciarSesion";
        }
            , 500);
    }

    onTrigger = (event) =>{
        event.preventDefault();
        //realizar registro

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
                            <input type="email" className="form-control" id="correo" placeholder="Correo Electronico" />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="user">Nombre de Usuario</label>
                            <input type="text" className="form-control" id="user" placeholder="Apellido" />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="nombre">Nombre Completo</label>
                            <input type="text" className="form-control" id="nombre" placeholder="Nombre" />
                        </div>



                        <div className={styles.form_group}>
                            <label htmlFor="contrasena">Contraseña</label>
                            <input type="password" className="form-control" id="contrasena" placeholder="Contraseña" />
                        </div>
                        <div className={styles.form_group}>
                            <label htmlFor="fecha">Fecha de Nacimiento</label>
                            <input type="date" className="form-control" id="fecha" placeholder="Fecha de Nacimiento" />
                        </div>
                        <div className={styles.form_group}>
                            <label htmlFor="contrasena2">Confirmar Contraseña</label>
                            <input type="password" className="form-control" id="contrasena2" placeholder="Contraseña" />
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