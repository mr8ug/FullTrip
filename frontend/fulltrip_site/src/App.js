// import logo from './logo.svg';
import React, { Component } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import CryptoJS from "crypto-js";
//componentes

import Inicio from "./components/Inicio";
import Hoteles from "./components/Hoteles";
import Autos from "./components/Autos";
import Aerolineas from "./components/Aerolineas";

import Navbar from "./components/Navbar";

import RegistroUsuario from "./components/RegistroUsuario";
import RegistroGlobal from "./components/RegistroGlobal"; //se le debe pasar la propiedad userType={Hotel, Arrendador, Aerolinea}

import RegistroAuto from "./components/RegistroAuto";
import RegistroHabitacion from "./components/RegistroHabitacion";
import RegistroVuelo from "./components/RegistroVuelo";

import Page404 from "./components/Page404";

import "./App.css";
import IniciarSesion from "./components/IniciarSesion";
import DashboardUser from "./components/DashboardUser";
import DashboardAdmin from "./components/DashboardAdmin";
import DashboardThirdService from "./components/DashboardThirdService"

import Habitacion from "./components/Habitacion";
import Auto from "./components/Auto";
import Vuelo from "./components/Vuelo";


export default class App extends Component {
  constructor(props) {
    
    super(props);

    this.state = {
      pagina: "",
      user_logged: false,
      userName:"",
      userEmail:"",
      userType:"",
    };
  }

  componentDidMount() {
    window.sessionStorage.getItem('email') !== null ? this.setState({ user_logged: true }) : this.setState({ user_logged: false });
    // window.sessionStorage.getItem('email') !== null ? this.setState({ userEmail: CryptoJS.AES.decrypt(window.sessionStorage.getItem('email'), 'fulltrip').toString(CryptoJS.enc.Utf8) }) : this.setState({ userEmail: "" });
    // window.sessionStorage.getItem('nombre') !== null ? this.setState({ userName: CryptoJS.AES.decrypt(window.sessionStorage.getItem('nombre'), 'fulltrip').toString(CryptoJS.enc.Utf8) }) : this.setState({ userName: "" });
    // window.sessionStorage.getItem('tipo') !== null ? this.setState({ userType: CryptoJS.AES.decrypt(window.sessionStorage.getItem('tipo'), 'fulltrip').toString(CryptoJS.enc.Utf8) }) : this.setState({ userType: "" });

    if (window.location.pathname === "/") {
      this.setState({
        pagina: "inicio",
      })
      window.sessionStorage.setItem('pagina', "inicio");

    } else if (window.location.pathname === "/Inicio") {
      this.setState({
        pagina: "inicio",
      })
      window.sessionStorage.setItem('pagina', "inicio");

    } else if (window.location.pathname === "/Hoteles") {
      this.setState({
        pagina: "hoteles",
      })
      window.sessionStorage.setItem('pagina', "hoteles");

    } else if (window.location.pathname === "/Autos") {
      this.setState({
        pagina: "autos",
      })
      window.sessionStorage.setItem('pagina', "autos");

    } else if (window.location.pathname === "/Aerolineas") {
      this.setState({
        pagina: "aerolineas",
      })
      window.sessionStorage.setItem('pagina', "aerolineas");

    } else if (window.location.pathname === "/Registrarse") {
      this.setState({
        pagina: "registrarse",
      })
      window.sessionStorage.setItem('pagina', "registrarse");

    } else if (window.location.pathname === "/IniciarSesion") {
      this.setState({
        pagina: "iniciarSesion",
      })
      window.sessionStorage.setItem('pagina', "iniciarSesion");
    } else if (window.location.pathname === "/Perfil") {
      this.setState({
        pagina: "perfil",
      })
      window.sessionStorage.setItem('pagina', "perfil");
    } else if (window.location.pathname === "/CerrarSesion") {
      this.setState({
        pagina: "",
        user_logged: false,
        userEmail:"",
        userName: "",
        userType: "",
        
      });
      window.sessionStorage.clear();

    }
  };



  render() {
    return (
      <div className="App">
        <header>
          <Navbar pagina={window.sessionStorage.getItem('pagina')} user_logged={this.state.user_logged} />
        </header>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/Inicio" element={<Inicio />} />
            <Route path="/Hoteles" element={<Hoteles />} />
            <Route path="/Autos" element={<Autos />} />
            <Route path="/Aerolineas" element={<Aerolineas />} />
            <Route path="/Registrarse" element={<RegistroUsuario />} />
            <Route path="/IniciarSesion" element={<IniciarSesion />} />

            <Route path="/RegistroHotel" element={<RegistroGlobal userType="Hotel" />} />
            <Route path="/RegistroAerolinea" element={<RegistroGlobal userType="Aerolinea" />} />
            <Route path="/RegistroArrendador" element={<RegistroGlobal userType="Arrendador" />} />


            <Route path="/RegistroAuto" element={<RegistroAuto/>} />
            <Route path="/RegistroHabitacion" element={<RegistroHabitacion/>} />
            <Route path="/RegistroVuelo" element={<RegistroVuelo/>} />

            <Route path="/Perfil" element={<DashboardUser />} />
            <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
            <Route path="/DashboardArrendador" element={<DashboardThirdService />} />
            <Route path="/DashboardAerolinea" element={<DashboardThirdService />} />
            <Route path="/DashboardHotel" element={<DashboardThirdService />} />

            
            <Route path="/Habitacion?:id" component={<Habitacion/>} />
            <Route path="/Auto?:id" component={<Auto/>} />
            <Route path="/Vuelo?:id" component={<Vuelo/>} />
            
            
            <Route path="/*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>

        <footer>
          <span>Grupo 7</span>
          <span>Full Trip &copy; 2022</span>
          <span>AYD1</span>



        </footer>
      </div>
    );
  }



}



