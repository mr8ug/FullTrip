import React, { Component } from 'react';

import Swal from 'sweetalert2';
import styles from './styles/DashboardGlobal.module.css';


import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import CryptoJS from 'crypto-js';



export default class DashboardUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: "",
            tipo: "",
            examplecards: [
                //list example cards

            ],
        }


    }

    componentDidMount() {
        // console.log(this.state.user);

        //obtener valor de local storage
        var usuario = "";
        var nombre = ""
        var tipo = "";
        window.sessionStorage.getItem('email') !== null ? usuario = CryptoJS.AES.decrypt(window.sessionStorage.getItem('email'), 'fulltrip').toString(CryptoJS.enc.Utf8) : usuario = "";
        window.sessionStorage.getItem('nombre') !== null ? nombre = CryptoJS.AES.decrypt(window.sessionStorage.getItem('nombre'), 'fulltrip').toString(CryptoJS.enc.Utf8) : nombre = "";
        window.sessionStorage.getItem('tipo') !== null ? tipo = CryptoJS.AES.decrypt(window.sessionStorage.getItem('tipo'), 'fulltrip').toString(CryptoJS.enc.Utf8) : tipo = "";

        if (usuario === "") {
            Swal.fire({
                title: 'Hmm parece que no estas logueado',
                text: 'Por favor inicia sesion para poder acceder a esta pagina',
                icon: 'warning',
                confirmButtonText: 'Ok',

            }).then(
                function (isConfirm) {
                    if (isConfirm) {

                        window.location.href = "/IniciarSesion";
                    }
                }
            )
        } else {
            this.setState({
                email: usuario,
                name: nombre,
                tipo: tipo,

            })
        }

        if (tipo === "administrador") {
            Swal.fire({
                title: 'Redirigiendo a sitio de Administrador',
                icon: 'info',
                confirmButtonText: 'Ok',

            }).then(
                function (isConfirm) {
                    if (isConfirm) {

                        window.location.href = "/DashboardAdmin";
                    }
                }
            )
        }


    }

    goEmpresaDashboard = (e) => {
        if(this.state.tipo === "hotel"){
            window.location.href = "/DashboardHotel";
        }else if(this.state.tipo === "arrendador"){
            window.location.href = "/DashboardArrendador";
        }else if(this.state.tipo === "aerolinea"){
            window.location.href = "/DashboardAerolinea";
        }
        

    }

    render() {
        return (
            <div className={styles.dashboard_user}>
                <div className={styles.jumbotron}>
                    <h1 >Hola, {this.state.name}!</h1>
                    <p className={styles.hand}> &#128075;</p>
                    <p >Es un placer verte de nuevo.</p>
                </div>

                <Tabs className={styles.tabs}
                    defaultActiveKey="profile"
                    id="fill-tabs"

                    justify
                    //list all variants
                    variant='tabs'

                // pills
                // fill
                // justify
                // vertical
                // nav-justified
                // nav-fill
                // nav
                >
                    <Tab className={styles.tabs} eventKey="profile" title="Perfil">
                        <div className={styles.tab_content}>
                            <h1>Perfil</h1>
                            <p>En esta seccion podras ver tu informacion personal</p>

                        </div>
                    </Tab>
                    <Tab className={styles.tabs} eventKey="reservas" title="Reservas">
                        <div className={styles.tab_content}>
                            <h1>Reservas</h1>
                            <p>En esta seccion podras ver tus reservas</p>
                        </div>
                    </Tab>

                    <Tab className={styles.tabs} eventKey="alquileres" title="Alquileres">
                        <div className={styles.tab_content}>
                            <h1>Alquileres</h1>
                            <p>En esta seccion podras ver tus vehiculos alquilados</p>
                        </div>
                    </Tab>

                    <Tab className={styles.tabs} eventKey="vuelos" title="Vuelos">
                        <div className={styles.tab_content}>
                            <h1>Vuelos</h1>
                            <p>En esta seccion podras ver tus vuelos</p>
                        </div>
                    </Tab>

                    <Tab className={styles.tabs} eventKey="reviews" title="Reseñas">
                        <div className={styles.tab_content}>
                            <h1>Reseñas</h1>
                            <p>En esta seccion podras ver y crear reseñas</p>
                        </div>
                    </Tab>

                    {
                        this.state.tipo === ("hotel") || this.state.tipo===("aerolinea")  ||this.state.tipo===("arrendador") ?
                            <Tab className={styles.tabs} eventKey="favoritos" title="Mi Empresa">
                                <div className={styles.tab_content}>
                                    <p>Parece que tienes una cuenta de empresa con nosotros</p>
                                    <button onClick={this.goEmpresaDashboard} className={styles.btn_primary}>Ir a mi Empresa</button>
                                </div>
                            </Tab>
                            :
                            null
                    }




                </Tabs>



            </div>
        );
    }
}