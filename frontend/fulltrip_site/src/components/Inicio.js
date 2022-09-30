import React, { Component } from "react";
import RegistroGlobal from "./RegistroGlobal";
// import Navbar from "./Navbar";

//import styles
import styles from './styles/Inicio.module.css';

//imagenes
// import wave from '../images/wave.svg';


export default class Inicio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            empresa: "Aerolinea",
            
        };

        
    }

    componentDidMount() {
        // var jumbotron = document.getElementById("jumbotron");
        // jumbotron.style.backgroundImage = "url(" + wave + ")";
    }

    registro() {
        window.location.href = "/Registrarse";
    }

    iniciarsesion() {
        window.location.href = "/IniciarSesion";
    }

    handleEmpresa = (e) => {
        
        e.preventDefault();
        this.setState({
            empresa: e.target.value,
        })

        
        //scroll into document
        var form= document.getElementById("promo");
        form.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        
    }





    render() {
        return (
            <div className={styles.container}>
                {/* <Navbar pagina="inicio" /> */}
                <div id="jumbotron" className={styles.jumbotron}>
                    <p>Bienvenido a <strong>Full Trip</strong>, somos tu mejor opción para vacaciones y negocios. <br/> Aún en epoca <strong>POST-PANDEMIA</strong>!</p>
                </div>

                <div className={styles.buttons}>
                    <button className={styles.btn_primary} onClick={this.registro} >Empieza ahora</button>
                    <button className={styles.btn_option} onClick={this.iniciarsesion}>Iniciar Sesión</button>
                </div>

                <div className={styles.info}>
                    <div className={styles.card}>
                        <h1><strong>+150 países</strong></h1>
                        <p>Nos han visitado y viajado con nosotros. </p>
                    </div>
                    <span className={styles.vl}></span>
                    <div className={styles.card}>
                        <h1>¿Qué es Full Trip?</h1>
                        <p>Full Trip es una plataforma que te permite reservar vuelos, hoteles y rentar autos en un solo lugar.</p>

                    </div>
                    <span className={styles.vl}></span>
                    <div className={styles.card}>
                        <h1><strong>4.8/5</strong></h1>
                        <p>de satisfacción promedio de nuestros clientes y colaboradores.</p>
                    </div>
                </div>

                <div className={styles.promo} id="promo">
                    <h1>Registra tu empresa con nosotros!</h1>
                    <div className={styles.registro}>
                        <select id="tipo_empresa" className={styles.select} onChange={this.handleEmpresa}>
                            <option value="Aerolinea">Aerolinea</option>
                            <option value="Arrendador">Arrendador</option>
                            <option value="Hotel">Hotel</option>
                        </select>
                        <div>
                            {this.state.empresa !== "" ? <RegistroGlobal userType={this.state.empresa} /> : null}
                        </div>
                    </div>

                </div>





            </div>
        );
    }
}
