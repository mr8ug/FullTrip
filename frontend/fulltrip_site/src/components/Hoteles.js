import React, { Component } from "react";
import { Button } from "react-bootstrap";
// import Navbar from "./Navbar";
import HabitacionCard from "./HabitacionCard";
//import styles
import styles from "./styles/SearchView.module.css";

import Accordion from 'react-bootstrap/Accordion'


export default class Hoteles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            habitaciones: [

                {
                    id: 1,
                    title: "Hotel X",
                    description: "Hotel X con vista al mar.",
                    country: "United States",
                    city: "Florida",
                    amount_people: "4",
                    price: "500",
                    date_start: "31/07/2022",
                    date_end: "31/08/2022",
                    image: "https://img.freepik.com/vector-gratis/plantilla-fondo-interior-dormitorio-dibujos-animados-acogedora-habitacion-moderna-luz-manana_33099-171.jpg?w=2000"
                },
                {
                    id: 2,
                    title: "Hotel Y",
                    description: "Hotel Y con acceso a todos los volcanes, en excursion privada.",
                    country: "Guatemala",
                    city: "Antigua",
                    persons: "2",
                    price: "150",
                    date_start: "31/01/2022",
                    date_end: "31/01/2023",
                    image: "https://img.freepik.com/vector-gratis/plantilla-fondo-interior-dormitorio-dibujos-animados-acogedora-habitacion-moderna-luz-manana_33099-171.jpg?w=2000"
                },
                {
                    id: 3,
                    title: "Hotel Z",
                    description: "Hotel Z con acceso a todos los volcanes, en excursion privada.",
                    country: "Guatemala",
                    city: "Antigua",
                    persons: "46",
                    price: "250",
                    date_start: "31/01/2022",
                    date_end: "31/01/2023",
                    image: "https://img.freepik.com/vector-gratis/plantilla-fondo-interior-dormitorio-dibujos-animados-acogedora-habitacion-moderna-luz-manana_33099-171.jpg?w=2000"
                }

            ],

            habitacionesFiltradas: [],
            habitacionesFiltradasPorPais: [],
            habitacionesFiltradasPorCiudad: [],
            habitacionesFiltradasPorPersonas: [],
            habitacionesFiltradasPorPrecio: [],
            habitacionesFiltradasPorFechaInicio: [],
            actual_filter: "none",


        }
    }

    // componentDidMount() {
    //     this.setState({
    //         habitacionesFiltradas: this.state.habitaciones
    //     })
    // }




    handlePais = (e) => {

        var getCitySelect = document.getElementById("city");
        var getPersonsSelect = document.getElementById("persons");
        var getPriceSelect = document.getElementById("price");
        var getStartDateSelect = document.getElementById("date_start");

        var getNombreInput = document.getElementById("nombre");


        getCitySelect.value = "todos";
        getPersonsSelect.value = "todos";
        getPriceSelect.value = "todos";
        getStartDateSelect.value = "todos";
        getNombreInput.value = "";
        const pais = e.target.value;
        if (pais === "todos") {
            this.setState({
                habitacionesFiltradas: this.state.habitaciones
            })
        } else {
            const habitacionesFiltradasPorPais = this.state.habitaciones.filter(habitacion => habitacion.country === pais);
            this.setState({
                habitacionesFiltradas: habitacionesFiltradasPorPais
            })
        }
    }

    handleCity = (e) => {
        const city = e.target.value;
        var getCountrySelect = document.getElementById("country");

        var getPersonsSelect = document.getElementById("persons");
        var getPriceSelect = document.getElementById("price");
        var getStartDateSelect = document.getElementById("date_start");

        var getNombreInput = document.getElementById("nombre");

        getCountrySelect.value = "todos";

        getPersonsSelect.value = "todos";
        getPriceSelect.value = "todos";
        getStartDateSelect.value = "todos";
        getNombreInput.value = "";
        if (city === "todos") {
            this.setState({
                habitacionesFiltradas: this.state.habitaciones
            })
        } else {
            const habitacionesFiltradasPorCiudad = this.state.habitaciones.filter(habitacion => habitacion.city === city);
            this.setState({
                habitacionesFiltradas: habitacionesFiltradasPorCiudad
            })
        }
    }

    handlePersons = (e) => {
        const persons = e.target.value;
        var getCountrySelect = document.getElementById("country");
        var getCitySelect = document.getElementById("city");

        var getPriceSelect = document.getElementById("price");
        var getStartDateSelect = document.getElementById("date_start");

        var getNombreInput = document.getElementById("nombre");

        getCountrySelect.value = "todos";
        getCitySelect.value = "todos";

        getPriceSelect.value = "todos";
        getStartDateSelect.value = "todos";
        getNombreInput.value = "";

        if (persons === "todos") {
            this.setState({
                habitacionesFiltradas: this.state.habitaciones
            })
        } else {
            const habitacionesFiltradasPorPersonas = this.state.habitaciones.sort((a, b) => a.amount_people - b.amount_people).filter(habitacion => habitacion.amount_people <= persons);
            this.setState({
                habitacionesFiltradas: habitacionesFiltradasPorPersonas
            })
        }
    }

    handlePrice = (e) => {
        const precio = e.target.value;
        var getCountrySelect = document.getElementById("country");
        var getCitySelect = document.getElementById("city");
        var getPersonsSelect = document.getElementById("persons");

        var getStartDateSelect = document.getElementById("date_start");

        var getNombreInput = document.getElementById("nombre");

        getCountrySelect.value = "todos";
        getCitySelect.value = "todos";
        getPersonsSelect.value = "todos";

        getStartDateSelect.value = "todos";
        getNombreInput.value = "";
        if (precio === "todos") {
            this.setState({
                habitacionesFiltradas: this.state.habitaciones
            })
        } if (precio === "asc") {
            const habitacionesFiltradasPorPrecio = this.state.habitaciones.sort((a, b) => a.price - b.price);
            this.setState({
                habitacionesFiltradas: habitacionesFiltradasPorPrecio
            })
        } if (precio === "desc") {
            const habitacionesFiltradasPorPrecio = this.state.habitaciones.sort((a, b) => b.price - a.price);
            this.setState({
                habitacionesFiltradas: habitacionesFiltradasPorPrecio
            })
        }
    }

    handleFechaInicio = (e) => {
        const fechaInicio = e.target.value;
        var getCountrySelect = document.getElementById("country");
        var getCitySelect = document.getElementById("city");
        var getPersonsSelect = document.getElementById("persons");
        var getPriceSelect = document.getElementById("price");
        var getNombreInput = document.getElementById("nombre");

        getCountrySelect.value = "todos";
        getCitySelect.value = "todos";
        getPersonsSelect.value = "todos";
        getPriceSelect.value = "todos";
        getNombreInput.value = "";

        if (fechaInicio === "todos") {
            this.setState({
                habitacionesFiltradas: this.state.habitaciones
            })
        } if (fechaInicio === "asc") {
            const habitacionesFiltradasPorFechaInicio = this.state.habitaciones.sort((a, b) => { return new Date(a.start_date) - new Date(b.start_date) });
            this.setState({
                habitacionesFiltradas: habitacionesFiltradasPorFechaInicio
            })
        } if (fechaInicio === "desc") {
            const habitacionesFiltradasPorFechaInicio = this.state.habitaciones.sort((a, b) => { return new Date(b.start_date) - new Date(a.start_date) });
            this.setState({
                habitacionesFiltradas: habitacionesFiltradasPorFechaInicio
            })
        }
    }

    handleNombre = (e) => {
        var getCountrySelect = document.getElementById("country");
        var getCitySelect = document.getElementById("city");
        var getPersonsSelect = document.getElementById("persons");
        var getPriceSelect = document.getElementById("price");
        var getStartDateSelect = document.getElementById("date_start");



        getCountrySelect.value = "todos";
        getCitySelect.value = "todos";
        getPersonsSelect.value = "todos";
        getPriceSelect.value = "todos";
        getStartDateSelect.value = "todos";

        const nombre = e.target.value;

        const habitacionesFiltradasPorNombre = this.state.habitaciones.filter(habitacion => (habitacion.hotel_name.toLowerCase().includes(nombre.toLowerCase())) || (habitacion.room_name.toLowerCase().includes(nombre.toLowerCase())));
        this.setState({
            habitacionesFiltradas: habitacionesFiltradasPorNombre
        })
    }

    handleFilter = (e) => {

        this.setState({
            habitacionesFiltradas: this.state.habitaciones
        })

        var getCountrySelect = document.getElementById("country");
        var getCitySelect = document.getElementById("city");
        var getPersonsSelect = document.getElementById("persons");
        var getPriceSelect = document.getElementById("price");
        var getStartDateSelect = document.getElementById("date_start");

        var getNombreInput = document.getElementById("nombre");

        getCountrySelect.value = "todos";
        getCitySelect.value = "todos";
        getPersonsSelect.value = "todos";
        getPriceSelect.value = "todos";
        getStartDateSelect.value = "todos";
        getNombreInput.value = "";






    }

    componentDidMount() {
        //fetch
        fetch("http://localhost:4000/api/all_rooms",
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
                    habitaciones: data.rooms,
                    habitacionesFiltradas: data.rooms

                })
            })
    }





    render() {
        return (
            <div>
                {/* <Navbar pagina="hoteles" /> */}
                <div className={styles.jumbotron}>
                    <h1 className={styles.h1}>🏨 Hoteles 🏨</h1>
                </div>
                
                <Accordion bg='dark' className={styles.acordion}>
                    <Accordion.Item eventKey='0'>
                        <Accordion.Header>Filtros</Accordion.Header>
                        <Accordion.Body key={0}>

                            <div className={styles.filters}>
                                <div className="form-group">
                                    <label htmlFor="country" className={styles.label}>País</label>
                                    <select name="country" id="country" className="form-control" onChange={this.handlePais}>
                                        <option key={'todos'} value={"todos"}>Todos</option>
                                        {
                                            //filter by unique values
                                            this.state.habitaciones
                                                .map((habitacion) => habitacion.country)
                                                .filter((value, index, self) => self.indexOf(value) === index)
                                                .sort((a, b) => a - b)
                                                .map((habitacion) => {
                                                    return (
                                                        <option key={habitacion} value={habitacion}>{habitacion}</option>
                                                    )
                                                })
                                        }
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="city" className={styles.label}>Ciudad</label>
                                    <select name="city" id="city" className="form-control" onChange={this.handleCity}>
                                        <option key={'todos'} value={"todos"}>Todos</option>
                                        {
                                            //filter by unique values
                                            this.state.habitaciones
                                                .map((habitacion) => habitacion.city)
                                                .filter((value, index, self) => self.indexOf(value) === index)
                                                .sort((a, b) => a - b)
                                                .map((habitacion) => {
                                                    return (
                                                        <option key={habitacion} value={habitacion}>{habitacion}</option>
                                                    )
                                                })
                                        }
                                    </select>

                                </div>

                                <div className="form-group">
                                    <label htmlFor="persons" className={styles.label}>Personas</label>
                                    <select name="persons" id="persons" className="form-control" onChange={this.handlePersons}>
                                        <option key={'todos'} value={"todos"}>Todos</option>
                                        {
                                            //filter by unique values
                                            this.state.habitaciones
                                                .map((habitacion) => habitacion.amount_people)
                                                .filter((value, index, self) => self.indexOf(value) === index)
                                                .sort((a, b) => a - b)
                                                .map((habitacion) => {
                                                    return (
                                                        <option key={habitacion} value={habitacion}>{habitacion}</option>
                                                    )
                                                })

                                        }
                                    </select>

                                </div>

                                <div className="form-group">
                                    <label htmlFor="date_start" className={styles.label}>Fecha de inicio</label>
                                    <select name="date_start" id="date_start" className="form-control" onChange={this.handleFechaInicio}>
                                        <option value={"todos"}>Todos</option>
                                        <option value={"asc"}>Ascendente</option>
                                        <option value={"desc"}>Descendente</option>
                                    </select>

                                </div>

                                <div className="form-group">
                                    <label htmlFor="price" className={styles.label}>Precio</label>
                                    <select name="price" id="price" className="form-control" onChange={this.handlePrice}>
                                        <option value={"todos"}>Todos</option>
                                        <option value={"asc"}>Ascendente</option>
                                        <option value={"desc"}>Descendente</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="nombre" className={styles.label}>Nombre</label>
                                    <input type="text" name="nombre" id="nombre" className="form-control" placeholder="Hotel/Cuarto" onChange={this.handleNombre} />
                                </div>



                                <Button variant="warning" onClick={this.handleFilter}> Limpiar </Button>
                            </div>

                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <div className={styles.container}>
                    {

                        this.state.habitacionesFiltradas === [] ? <h1>No hay habitaciones disponibles</h1> :
                            this.state.habitacionesFiltradas
                                .map((habitacion) => {
                                    return (
                                        <HabitacionCard
                                            key={habitacion.room_id}
                                            id={habitacion.room_id}
                                            title={habitacion.room_name}
                                            description={habitacion.hotel_name}
                                            country={habitacion.country}
                                            city={habitacion.city}
                                            persons={habitacion.amount_people}
                                            price={habitacion.price}
                                            date_start={habitacion.start_date}
                                            date_end={habitacion.ending_date}
                                            image={habitacion.img}
                                            // image={"https://img.freepik.com/vector-gratis/plantilla-fondo-interior-dormitorio-dibujos-animados-acogedora-habitacion-moderna-luz-manana_33099-171.jpg?w=2000"}
                                        />
                                    )
                                })

                    }
                </div>

            </div>
        );
    }
}
