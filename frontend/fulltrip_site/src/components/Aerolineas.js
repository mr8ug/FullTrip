import React, { Component } from "react";
import { Button } from "react-bootstrap";
import VueloCard from "./VueloCard";
import styles from "./styles/SearchView.module.css";

import Accordion from 'react-bootstrap/Accordion'



export default class Aerolineas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vuelos: [],
            vuelosFiltrados: [],
        }
    }


    componentDidMount() {
        fetch("http://localhost:4000/api/all_flights",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    vuelos: data.flights,
                    vuelosFiltrados: data.flights
                })
            })


    }

    handleOriginChange = (event) => {
        let origen = event.target.value;


        let destinoSelect = document.getElementById("destino")
        let tipoSelect = document.getElementById("tipo")
        let precioSelect = document.getElementById("precio")


        destinoSelect.value = "todos";
        tipoSelect.value = "todos";
        precioSelect.value = "todos";

        let nombreInput = document.getElementById("nombre")
        nombreInput.value = "";



        if (origen === "todos") {
            this.setState({
                vuelosFiltrados: this.state.vuelos
            })
        }
        else {
            let vuelosFiltradosPorOrigen = this.state.vuelos.filter(vuelo => vuelo.flight_origin === origen);
            this.setState({
                vuelosFiltrados: vuelosFiltradosPorOrigen
            })
        }
    }

    handleDestinationChange = (event) => {

        let destino = event.target.value;

        let origenSelect = document.getElementById("origen")

        let tipoSelect = document.getElementById("tipo")
        let precioSelect = document.getElementById("precio")

        origenSelect.value = "todos";

        tipoSelect.value = "todos";
        precioSelect.value = "todos";

        let nombreInput = document.getElementById("nombre")
        nombreInput.value = "";


        if (destino === "todos") {
            this.setState({
                vuelosFiltrados: this.state.vuelos
            })
        }
        else {
            let vuelosFiltradosPorDestino = this.state.vuelos.filter(vuelo => vuelo.flight_destination === destino);
            this.setState({
                vuelosFiltrados: vuelosFiltradosPorDestino
            })
        }
    }

    handleTipoChange = (event) => {
        let tipo = event.target.value;
        let origenSelect = document.getElementById("origen")
        let destinoSelect = document.getElementById("destino")

        let precioSelect = document.getElementById("precio")

        origenSelect.value = "todos";
        destinoSelect.value = "todos";

        precioSelect.value = "todos";

        let nombreInput = document.getElementById("nombre")
        nombreInput.value = "";


        if (tipo === "todos") {
            this.setState({
                vuelosFiltrados: this.state.vuelos
            })
        }
        else if (tipo === "ida") {
            let vuelosFiltradosPorTipo = this.state.vuelos.filter(vuelo => vuelo.flight_date_end === '');
            this.setState({
                vuelosFiltrados: vuelosFiltradosPorTipo
            })
        }
        else if (tipo === "ida_vuelta") {
            let vuelosFiltradosPorTipo = this.state.vuelos.filter(vuelo => vuelo.flight_date_end !== '');
            this.setState({
                vuelosFiltrados: vuelosFiltradosPorTipo
            })
        }
    }

    handlePrecioChange = (event) => {
        let precio = event.target.value;

        let origenSelect = document.getElementById("origen")
        let destinoSelect = document.getElementById("destino")
        let tipoSelect = document.getElementById("tipo")


        origenSelect.value = "todos";
        destinoSelect.value = "todos";
        tipoSelect.value = "todos";

        let nombreInput = document.getElementById("nombre")
        nombreInput.value = "";


        if (precio === "todos") {
            this.setState({
                vuelosFiltrados: this.state.vuelos
            })
        }
        else if (precio === "asc") {
            let vuelosFiltradosPorPrecio = this.state.vuelos.sort((a, b) => a.flight_price - b.flight_price);
            this.setState({
                vuelosFiltrados: vuelosFiltradosPorPrecio
            })
        }
        else if (precio === "desc") {
            let vuelosFiltradosPorPrecio = this.state.vuelos.sort((a, b) => b.flight_price - a.flight_price);
            this.setState({
                vuelosFiltrados: vuelosFiltradosPorPrecio
            })
        }
    }

    handleFilter = (event) => {
        event.preventDefault();
        let origenSelect = document.getElementById("origen")
        let destinoSelect = document.getElementById("destino")
        let tipoSelect = document.getElementById("tipo")
        let precioSelect = document.getElementById("precio")
        

        origenSelect.value = "todos";
        destinoSelect.value = "todos";
        tipoSelect.value = "todos";
        precioSelect.value = "todos";

        let nombreInput = document.getElementById("nombre")
        nombreInput.value = "";


        this.setState({
            vuelosFiltrados: this.state.vuelos
        })

    }

    handleNombre = (event) => {
        event.preventDefault();
        let origenSelect = document.getElementById("origen")
        let destinoSelect = document.getElementById("destino")
        let tipoSelect = document.getElementById("tipo")
        let precioSelect = document.getElementById("precio")


        origenSelect.value = "todos";
        destinoSelect.value = "todos";
        tipoSelect.value = "todos";
        precioSelect.value = "todos";

        let nombre = event.target.value;
        const vuelosFiltradosPorNombre = this.state.vuelos.filter(vuelo => (vuelo.airline_name.toLowerCase().includes(nombre.toLowerCase())) || (vuelo.flight_origin.toLowerCase().includes(nombre.toLowerCase())) || (vuelo.flight_destination.toLowerCase().includes(nombre.toLowerCase())));
        this.setState({
            vuelosFiltrados: vuelosFiltradosPorNombre
        })
    }

    render() {
        return (
            <div>
                {/* <Navbar pagina="aerolineas" /> */}
                <div className={styles.jumbotron}>
                    <h1 className={styles.h1}>🛫 Aerolineas 🛬</h1>
                </div>

                <Accordion className={styles.acordion}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Filtros</Accordion.Header>
                        <Accordion.Body key={0}>
                            <div className={styles.filters}>
                                <div className="form-group">
                                    <label htmlFor="origen" className={styles.label}>Origen</label>
                                    <select name="origen" id="origen" className="form-control" onChange={this.handleOriginChange}>
                                        <option value="todos">Todos</option>
                                        {
                                            this.state.vuelos
                                                .map((vuelo) => vuelo.flight_origin)
                                                .filter((value, index, self) => self.indexOf(value) === index)
                                                .map((origen) => <option value={origen}>{origen}</option>)

                                        }
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="destino" className={styles.label}>Destino</label>
                                    <select name="destino" id="destino" className="form-control" onChange={this.handleDestinoChange}>
                                        <option value="todos">Todos</option>
                                        {
                                            this.state.vuelos
                                                .map((vuelo) => vuelo.flight_destination)
                                                .filter((destino, index, self) => self.indexOf(destino) === index)
                                                .map((destino) => <option value={destino}>{destino}</option>)
                                                
                                                
                                                

                                        }
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="tipo" className={styles.label}>Tipo de Viaje</label>
                                    <select name="tipo" id="tipo" className="form-control" onChange={this.handleTipoChange}>
                                        <option value="todos">Todos</option>
                                        <option value="ida">Ida</option>
                                        <option value="ida_vuelta">Ida y Vuelta</option>
                                    </select>

                                </div>


                                <div className="form-group">
                                    <label htmlFor="precio" className={styles.label}>Precio</label>
                                    <select name="precio" id="precio" className="form-control" onChange={this.handlePrecioChange}>
                                        <option value="todos">Todos</option>
                                        <option value="asc">Ascendente</option>
                                        <option value="desc">Descendente</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="nombre" className={styles.label}>Nombre</label>
                                    <input type="text" name="nombre" id="nombre" className="form-control" placeholder="Destino/Origen/Aerolinea" onChange={this.handleNombre} />
                                </div>

                                <Button variant="warning" onClick={this.handleFilter}>Limpiar</Button>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <div className={styles.container}>
                    {
                        this.state.vuelosFiltrados === [] ? <h1>No hay vuelos disponibles</h1> :
                            this.state.vuelosFiltrados
                                .map((vuelo) =>
                                    <VueloCard
                                        key={vuelo.id_flight}
                                        id_flight={vuelo.id_flight}
                                        airline_id={vuelo.airline_id}
                                        airline_name={vuelo.airline_name}
                                        price={vuelo.price}
                                        flight_date={vuelo.flight_date}
                                        flight_destination={vuelo.flight_destination}
                                        flight_origin={vuelo.flight_origin}
                                        flight_time={vuelo.flight_time}
                                        flight_date_end={vuelo.flight_date_end}
                                    />
                                )

                    }

                </div>

            </div>
        );
    }
}
