import React, { Component } from "react";
import { Button } from "react-bootstrap";
import AutoCard from "./AutoCard";
import styles from "./styles/SearchView.module.css";

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
                // console.log(data);
                this.setState({
                    autos: data.cars,
                    autosFiltrados: data.cars

                })
            })
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
            const autosFiltradosPorMarca = this.state.autos.filter(auto => auto.brand === marca);
            this.setState({
                autosFiltrados: autosFiltradosPorMarca
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
            const autosFiltradosPorLinea = this.state.autos.filter(auto => auto.line === linea);
            this.setState({
                autosFiltrados: autosFiltradosPorLinea
            })
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

        let modelo = e.target.value;
        console.log("modelo:" + modelo);

        if (modelo === "todos") {
            this.setState({
                autosFiltrados: this.state.autos
            })
        } else {
            const autosFiltradosPorModelo = this.state.autos.filter(auto => String(auto.model) === (modelo));
            this.setState({
                autosFiltrados: autosFiltradosPorModelo
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

        if (precio === "todos") {
            this.setState({
                autosFiltrados: this.state.autos
            })
        } if (precio === "asc") {
            const autosFiltradosPorPrecio = this.state.autos.sort((a, b) => a.price - b.price);
            this.setState({
                autosFiltrados: autosFiltradosPorPrecio
            })
        } if (precio === "desc") {
            const autosFiltradosPorPrecio = this.state.autos.sort((a, b) => b.price - a.price);
            this.setState({
                autosFiltrados: autosFiltradosPorPrecio
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
            this.setState({
                autosFiltrados: autosFiltradosPorPais
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
                autosFiltrados: autosFiltradosPorCiudad
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

        const autosFiltradosPorNombre = this.state.autos.filter(auto => (auto.line.toLowerCase().includes(nombre.toLowerCase()) || auto.model.toLowerCase().includes(nombre.toLowerCase()) || auto.brand.toLowerCase().includes(nombre.toLowerCase()) || auto.year.toString().includes(nombre.toLowerCase()) || auto.car_rental.toString().includes(nombre.toLowerCase()) || auto.country.toLowerCase().includes(nombre.toLowerCase()) || auto.city.toLowerCase().includes(nombre.toLowerCase())));
    }


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
                                                .map((marca) => <option value={marca}>{marca}</option>)

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
                                                .map((linea) => <option value={linea}>{linea}</option>)

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
                                                .map((modelo) => <option value={modelo}>{modelo}</option>)

                                        }
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="precio" className={styles.label}>Precio</label>
                                    <select name="precio" id="precio" className="form-control" onChange={this.handlePrecioFilter}>
                                        <option value="todos">Todos</option>
                                        <option value="asc">Ascendente</option>
                                        <option value="desc">Descendente</option>
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
                                                .map((ciudad) => <option value={ciudad}>{ciudad}</option>)

                                        }
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
                                                .map((pais) => <option value={pais}>{pais}</option>)

                                        }
                                    </select>
                                </div>

                                <Button variant="warning" onClick={this.handleFilter}> Limpiar </Button>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>

                </Accordion>

                <div className={styles.container}>
                    {

                        this.state.autosFiltrados === [] ? <h1>No hay habitaciones disponibles</h1> :
                            this.state.autosFiltrados
                                .map((auto) =>
                                    <AutoCard
                                        key={auto.id_car}
                                        id={auto.id_car}
                                        line={auto.line}
                                        model={auto.model}
                                        brand={auto.brand}
                                        price={auto.price}
                                        country={auto.country}
                                        city={auto.city}
                                        car_rental={auto.car_rental}
                                        car_rental_id={auto.car_rental_id}
                                        img={auto.img}


                                    // image={"https://img.freepik.com/vector-gratis/plantilla-fondo-interior-dormitorio-dibujos-animados-acogedora-habitacion-moderna-luz-manana_33099-171.jpg?w=2000"}
                                    />

                                )

                    }
                </div>

            </div>
        );
    }
}
