import React, {Component} from "react";


import CryptoJS from "crypto-js";

import styles from "./styles/DashboardGlobal.module.css";
import Swal from "sweetalert2";

export default class DashboardAdmin extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:"",
            name:"",
            tipo:"",
        }
    }

    componentDidMount(){
        var email = ""
        window.sessionStorage.getItem('email') !== null ? email = CryptoJS.AES.decrypt(window.sessionStorage.getItem('email'), 'fulltrip').toString(CryptoJS.enc.Utf8) : email = "";
        var name = ""
        window.sessionStorage.getItem('nombre') !== null ? name = CryptoJS.AES.decrypt(window.sessionStorage.getItem('nombre'), 'fulltrip').toString(CryptoJS.enc.Utf8) : name = "";
        var tipo = ""
        window.sessionStorage.getItem('tipo') !== null ? tipo = CryptoJS.AES.decrypt(window.sessionStorage.getItem('tipo'), 'fulltrip').toString(CryptoJS.enc.Utf8) : tipo = "";
        console.log("componente montado", email, name)
        this.setState({
            email:email,
            name:name,
            tipo:tipo,
        })

        if(this.state.tipo !== "administrador"){
            Swal({
                title: 'No tienes permisos para acceder a esta pagina',
                text: 'Por favor inicia sesion como administrador para poder acceder a esta pagina',
                icon: 'warning',
                confirmButtonText: 'Ok',
            }).then(
                function(isConfirm){
                    if(isConfirm){
                        window.location.href = "/IniciarSesion";
                    }
            })
        }

    }
    render(){
        return(
            <div className={styles.container}>
                <div className={styles.jumbotron}>
                    <h1 >Hola, {this.state.name}!</h1>
                    <p className={styles.hand}> &#128075;</p>
                    <p >Es un placer verte de nuevo.</p>
                </div>
            </div>
        );
    }
}