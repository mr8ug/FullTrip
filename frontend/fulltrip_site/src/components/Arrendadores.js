import React, { Component } from "react";
import { Button } from "react-bootstrap";
import AutoCard from "./AutoCard";
import styles from "./styles/SearchView.module.css";
import Swal from "sweetalert2";

import Accordion from 'react-bootstrap/Accordion'



export default class Autos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            autos: [],

            autosFiltrados: [],
            actual_filter: "none",
        }
    }

    componentDidMount() {
        //fetch
        fetch("http://localhost:4000/api/all_cars",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => {
                if(data.cars){
                    // console.log(data);
                    this.setState({
                        autos: data.cars,
                        autosFiltrados: data.cars
    
                    })
                }

                
            })
            .catch(
                error => {
                    Swal.fire({
                        title:'Parece que no estas conectado a internet',
                        text:'Por favor revisa tu conexion a internet',
                        icon:'error',
                        confirmButtonText:'Ok',
                        
                    })
                    .then(
                        function (isConfirm){
                            if(isConfirm){
                                window.location.href = "/Inicio";
                            }
                        })
                }
                
            )
    }

    handleMarcaFilter = (e) => {
        let marca = e.target.value;


        var getLineaSelected = document.getElementById("linea");
        getLineaSelected.value = "todos";

        var getModeloSelected = document.getElementById("modelo");
        getModeloSelected.value = "todos";

        var getPrecioSelected = document.getElementById("precio");
        getPrecioSelected.value = "todos";

        var getPaisSelected = document.getElementById("pais");
        getPaisSelected.value = "todos";

        var getCiudadSelected = document.getElementById("ciudad");
        getCiudadSelected.value = "todos";

        if (marca === "todos") {
            this.setState({
                autosFiltrados: this.state.autos
            })
        } else {
            const autosFiltradosPorMarca = this.state.autos.filter(auto => String(auto.brand).includes(marca));
            this.setState({
                autosFiltrados: autosFiltradosPorMarca,
                actual_filter: "marca"
            })
        }
    }

    handleLineaFilter = (e) => {
        let linea = e.target.value;
        var getMarcaSelected = document.getElementById("marca");
        getMarcaSelected.value = "todos";



        var getModeloSelected = document.getElementById("modelo");
        getModeloSelected.value = "todos";

        var getPrecioSelected = document.getElementById("precio");
        getPrecioSelected.value = "todos";

        var getPaisSelected = document.getElementById("pais");
        getPaisSelected.value = "todos";

        var getCiudadSelected = document.getElementById("ciudad");
        getCiudadSelected.value = "todos";

        if (linea === "todos") {
            this.setState({
                autosFiltrados: this.state.autos
            })
        } else {
            const autosFiltradosPorLinea = this.state.autos.filter(auto =>  linea === auto.line );
            this.setState({
                autosFiltrados: autosFiltradosPorLinea,
                actual_filter: "linea"
            })
            // console.log("autos filtrados",this.state.autosFiltrados)
        }
    }

    handleModeloFilter = (e) => {

        var getMarcaSelected = document.getElementById("marca");
        getMarcaSelected.value = "todos";

        var getLineaSelected = document.getElementById("linea");
        getLineaSelected.value = "todos";



        var getPrecioSelected = document.getElementById("precio");
        getPrecioSelected.value = "todos";

        var getPaisSelected = document.getElementById("pais");
        getPaisSelected.value = "todos";

        var getCiudadSelected = document.getElementById("ciudad");
        getCiudadSelected.value = "todos";

        var modelo = e.target.value;
        // console.log("modelo:" + modelo);

        if (modelo === "todos") {
            this.setState({
                autosFiltrados: this.state.autos
            })
        } else {
            const autosFiltradosPorModelo = this.state.autos.filter((auto) => (auto.model) === parseInt(modelo));
            this.setState({
                autosFiltrados: autosFiltradosPorModelo,
                actual_filter: "modelo"
            })
        }
    }

    handlePrecioFilter = (e) => {
        let precio = e.target.value;

        var getMarcaSelected = document.getElementById("marca");
        getMarcaSelected.value = "todos";

        var getLineaSelected = document.getElementById("linea");
        getLineaSelected.value = "todos";

        var getModeloSelected = document.getElementById("modelo");
        getModeloSelected.value = "todos";



        var getPaisSelected = document.getElementById("pais");
        getPaisSelected.value = "todos";

        var getCiudadSelected = document.getElementById("ciudad");
        getCiudadSelected.value = "todos";
        // console.log(precio)
        if (precio === "todos") {
            this.setState({
                autosFiltrados: this.state.autos
            })
        } else if (precio === "asc") {
            // console.log("filter asc")
            const autosFiltradosPorPrecio = this.state.autos.sort((a, b) => a.price - b.price);
            this.setState({
                autosFiltrados: autosFiltradosPorPrecio,
                actual_filter: "precio"
            })
        } else if (precio === "desc") {
            // console.log("filter desc")
            const autosFiltradosPorPrecio = this.state.autos.sort((a, b) => b.price - a.price);
            this.setState({
                autosFiltrados: autosFiltradosPorPrecio,
                actual_filter: "precio"
            })
        }
    }

    handlePaisFilter = (e) => {
        let pais = e.target.value;

        var getMarcaSelected = document.getElementById("marca");
        getMarcaSelected.value = "todos";

        var getLineaSelected = document.getElementById("linea");
        getLineaSelected.value = "todos";

        var getModeloSelected = document.getElementById("modelo");
        getModeloSelected.value = "todos";

        var getPrecioSelected = document.getElementById("precio");
        getPrecioSelected.value = "todos";



        var getCiudadSelected = document.getElementById("ciudad");
        getCiudadSelected.value = "todos";

        if (pais === "todos") {
            this.setState({
                autosFiltrados: this.state.autos
            })
        } else {
            const autosFiltradosPorPais = this.state.autos.filter(auto => auto.country === pais);

            //update realtime state

            this.setState({
                autosFiltrados: autosFiltradosPorPais,
                actual_filter: "pais"
            })
        }
    }

    handleCiudadFilter = (e) => {
        let ciudad = e.target.value;

        var getMarcaSelected = document.getElementById("marca");
        getMarcaSelected.value = "todos";

        var getLineaSelected = document.getElementById("linea");
        getLineaSelected.value = "todos";

        var getModeloSelected = document.getElementById("modelo");
        getModeloSelected.value = "todos";

        var getPrecioSelected = document.getElementById("precio");
        getPrecioSelected.value = "todos";

        var getPaisSelected = document.getElementById("pais");
        getPaisSelected.value = "todos";



        if (ciudad === "todos") {
            this.setState({
                autosFiltrados: this.state.autos
            })
        } else {
            const autosFiltradosPorCiudad = this.state.autos.filter(auto => auto.city === ciudad);
            this.setState({
                autosFiltrados: autosFiltradosPorCiudad,
                actual_filter: "ciudad"
            })
        }
    }

    handleFilter = (e) => {
        this.setState({
            autosFiltrados: this.state.autos
        })

        var getMarcaSelected = document.getElementById("marca");
        getMarcaSelected.value = "todos";

        var getLineaSelected = document.getElementById("linea");
        getLineaSelected.value = "todos";

        var getModeloSelected = document.getElementById("modelo");
        getModeloSelected.value = "todos";

        var getPrecioSelected = document.getElementById("precio");
        getPrecioSelected.value = "todos";

        var getPaisSelected = document.getElementById("pais");
        getPaisSelected.value = "todos";

        var getCiudadSelected = document.getElementById("ciudad");
        getCiudadSelected.value = "todos";




    }

    handleNombre = (e) => {
        var getMarcaSelected = document.getElementById("marca");
        getMarcaSelected.value = "todos";

        var getLineaSelected = document.getElementById("linea");
        getLineaSelected.value = "todos";

        var getModeloSelected = document.getElementById("modelo");
        getModeloSelected.value = "todos";

        var getPrecioSelected = document.getElementById("precio");
        getPrecioSelected.value = "todos";

        var getPaisSelected = document.getElementById("pais");
        getPaisSelected.value = "todos";

        var getCiudadSelected = document.getElementById("ciudad");
        getCiudadSelected.value = "todos";

        const nombre = e.target.value;

        const autosFiltradosPorNombre = this.state.autos.filter(auto => (auto.line.toLowerCase().includes(nombre.toLowerCase())) || (auto.brand.toLowerCase().includes(nombre.toLowerCase())) || (auto.car_rental.toString().includes(nombre.toLowerCase())));
        this.setState({
            autosFiltrados: autosFiltradosPorNombre,
            actual_filter: "nombre"
        })

    }

    //listen and update state
    


    render() {
        return (
            <div >
                {/* <Navbar pagina="autos" /> */}
                <div className={styles.jumbotron}>
                    <h1 className={styles.h1}> 🚙 Autos 🚙</h1>
                </div>

                <Accordion className={styles.acordion}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Filtros</Accordion.Header>
                        <Accordion.Body key={0}>
                            <div className={styles.filters}>
                                <div className="form-group" >
                                    <label htmlFor="marca" className={styles.label}>Marca</label>
                                    <select name="marca" id="marca" className="form-control" onChange={this.handleMarcaFilter}>
                                        <option value="todos">Todos</option>
                                        {
                                            this.state.autos
                                                .map((auto) => auto.brand)
                                                .filter((value, index, self) => self.indexOf(value) === index)
                                                .map((marca, i) => <option key={i} value={marca}>{marca}</option>)

                                        }
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="linea" className={styles.label}>Linea</label>
                                    <select name="linea" id="linea" className="form-control" onChange={this.handleLineaFilter}>
                                        <option value="todos">Todos</option>
                                        {
                                            this.state.autos
                                                .map((auto) => auto.line)
                                                .filter((value, index, self) => self.indexOf(value) === index)
                                                .map((linea, i) => <option key={i} value={linea}>{linea}</option>)

                                        }
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="modelo" className={styles.label}>Modelo</label>
                                    <select name="modelo" id="modelo" className="form-control" onChange={this.handleModeloFilter}>
                                        <option value="todos">Todos</option>
                                        {
                                            this.state.autos
                                                .map((auto) => auto.model)
                                                .filter((value, index, self) => self.indexOf(value) === index)
                                                .map((modelo, i) => <option key={i} value={modelo}>{modelo}</option>)

                                        }
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="precio" className={styles.label}>Precio por dia</label>
                                    <select name="precio" id="precio" className="form-control" onChange={this.handlePrecioFilter}>
                                        <option value="todos">Todos</option>
                                        <option value="asc">Ascendente</option>
                                        <option value="desc">Descendente</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="pais" className={styles.label}>Pais</label>
                                    <select name="pais" id="pais" className="form-control" onChange={this.handlePaisFilter}>
                                        <option value="todos">Todos</option>
                                        {
                                            this.state.autos
                                                .map((auto) => auto.country)
                                                .filter((value, index, self) => self.indexOf(value) === index)
                                                .map((pais, i) => <option key={i} value={pais}>{pais}</option>)

                                        }
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="ciudad" className={styles.label}>Ciudad</label>
                                    <select name="ciudad" id="ciudad" className="form-control" onChange={this.handleCiudadFilter}>
                                        <option value="todos">Todos</option>
                                        {
                                            
                                            this.state.autos
                                                .map((auto) => auto.city)
                                                .filter((value, index, self) => self.indexOf(value) === index)
                                                .map((ciudad, i) => <option key={i} value={ciudad}>{ciudad}</option>)

                                        }
                                    </select>
                                </div>



                                <div className="form-group">
                                    <label htmlFor="nombre" className={styles.label}>Nombre</label>
                                    <input type="text" name="nombre" id="nombre" className="form-control" onChange={this.handleNombre} />
                                </div>

                                <Button variant="warning" onClick={this.handleFilter}> Limpiar </Button>
                                
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <div>


                    </div>

                </Accordion>



                <div className={styles.container}>
                    {

                        this.state.autosFiltrados
                            .map((auto, index) => {
                                return (
                                    <AutoCard
                                        key={index}
                                        id={auto.id_car}
                                        line={auto.line}
                                        model={auto.model}
                                        brand={auto.brand}
                                        price={auto.price}
                                        country={auto.country}
                                        city={auto.city}
                                        car_rental={auto.car_rental}
                                        img={auto.img}
                                        mode={"search"}
                                    />
                                )
                            })

                    }
                </div>

            </div>
        );
    }
}
