// import logo from './logo.svg';
import React, { Component } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

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



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagina: "",
      user_logged: false,
      userName:"",
      userType:"",
    };
  }

  // var pagina;
  // var user_logged = false;
  // // var userName = localStorage.getItem("userName");
  // var userName = "Tester"
  
  componentDidMount(){
    if (window.location.pathname === "/") {
      this.setState({
        pagina: "inicio",
      })
      
    } else if (window.location.pathname === "/Inicio") {
      this.setState({
        pagina: "inicio",
      })
      
    } else if (window.location.pathname === "/Hoteles") {
      this.setState({
        pagina: "hoteles",
      })
      
    } else if (window.location.pathname === "/Autos") {
      this.setState({
        pagina: "autos",
      })
      
    } else if (window.location.pathname === "/Aerolineas") {
      this.setState({
        pagina: "aerolineas",
      })
      
    } else if (window.location.pathname === "/Registrarse") {
      this.setState({
        pagina: "registrarse",
      })
      
    } else if (window.location.pathname === "/IniciarSesion") {
      this.setState({
        pagina: "iniciarSesion",
      })
    } else if (window.location.pathname === "/Perfil") {
      this.setState({
        pagina: "perfil",
      })
    }
    
    
  }

  handleInicioSesion = (userName, userType) => {
    this.setState({
      user_logged: true,
      userName: userName,
      userType: userType,
    })
    console.log("userName: " + this.state.userName, "userType " + this.state.userType)
  }

  

  render(){
    return (
      <div className="App">
        <Navbar pagina={this.state.pagina} user_logged={this.state.user_logged}/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/Inicio" element={<Inicio />} />
            <Route path="/Hoteles" element={<Hoteles />} />
            <Route path="/Autos" element={<Autos />} />
            <Route path="/Aerolineas" element={<Aerolineas />} />
            <Route path="/Registrarse" element={<RegistroUsuario />} />
            <Route path="/IniciarSesion" element={<IniciarSesion parentCallback ={this.handleInicioSesion} />} />
            <Route path="/RegistroHotel" element={<RegistroGlobal userType="Hotel" />} />
            <Route path="/RegistroAerolinea" element={<RegistroGlobal userType="Aerolinea"  />} />
            <Route path="/RegistroArrendador" element={<RegistroGlobal userType="Arrendador"  />} />
            
  
            <Route path="/RegistroAuto" element={<RegistroAuto userName = {this.state.userName} />} />
            <Route path="/RegistroHabitacion" element={<RegistroHabitacion userName = {this.state.userName} />} />
            <Route path="/RegistroVuelo" element={<RegistroVuelo userName = {this.state.userName}  />} />
            <Route path="/Perfil" element ={<DashboardUser userName = {this.state.userName} userType = {this.state.userType} /> }/>
            <Route path="/*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
        <div className="footer">
          <span>Grupo 7</span>
          <span>Analisis y Diseño de Sistemas 1</span>
          <span>Full Trip &copy; 2022</span>
          
          
        </div>
      </div>
    );
  }
  

  
}


