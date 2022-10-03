import React, { Component } from "react";
import { Button } from "react-bootstrap";
// import Navbar from "./Navbar";
import HabitacionCard from "./HabitacionCard";
//import styles
import styles from "./styles/SearchView.module.css";




export default class Hoteles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            habitaciones: [

                {
                    title: "Hotel X",
                    description: "Hotel X con vista al mar.",
                    country: "United States",
                    city: "Florida",
                    persons: "4",
                    price: "500",
                    date_start: "31/07/2022",
                    date_end: "31/08/2022",
                    image: "https://img.freepik.com/vector-gratis/plantilla-fondo-interior-dormitorio-dibujos-animados-acogedora-habitacion-moderna-luz-manana_33099-171.jpg?w=2000"
                },
                {
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


        }
    }




    handlePais = (e) => {
        const pais = e.target.value;
        if (pais === "todos") {
            this.setState({
                habitacionesFiltradas: this.state.habitaciones
            })
        } else {
            const habitacionesFiltradasPorPais = this.state.habitaciones.sort((a, b) => a.country - b.country);
            this.setState({
                habitacionesFiltradas: habitacionesFiltradasPorPais
            })
        }
    }

    handleCity = (e) => {
        const city = e.target.value;
        if (city === "todos") {
            this.setState({
                habitacionesFiltradas: this.state.habitaciones
            })
        } else {
            const habitacionesFiltradasPorCiudad = this.state.habitaciones.sort((a, b) => a.city - b.city);
            this.setState({
                habitacionesFiltradas: habitacionesFiltradasPorCiudad
            })
        }
    }

    handlePersons = (e) => {
        const persons = e.target.value;
        if (persons === "todos") {
            this.setState({
                habitacionesFiltradas: this.state.habitaciones
            })
        } else {
            const habitacionesFiltradasPorPersonas = this.state.habitaciones.filter((habitacion) => habitacion.persons === persons);
            this.setState({
                habitacionesFiltradas: habitacionesFiltradasPorPersonas
            })
        }
    }

    handlePrice = (e) => {
        const precio = e.target.value;
        if (precio === "todos") {
            this.setState({
                habitacionesFiltradas: this.state.habitaciones
            })
        } if(precio ==="asc") {
            const habitacionesFiltradasPorPrecio = this.state.habitaciones.sort((a, b) => a.price - b.price);
            this.setState({
                habitacionesFiltradas: habitacionesFiltradasPorPrecio
            })
        }  if(precio ==="desc"){
            const habitacionesFiltradasPorPrecio = this.state.habitaciones.sort((a, b) => b.price - a.price);
            this.setState({
                habitacionesFiltradas: habitacionesFiltradasPorPrecio
            })
        }
    }

    handleFechaInicio = (e) => {
        const fechaInicio = e.target.value;
        if (fechaInicio === "todos") {
            this.setState({
                habitacionesFiltradas: this.state.habitaciones
            })
        } else {
            const habitacionesFiltradasPorFechaInicio = this.state.habitaciones.sort((a, b) => a.date_start - b.date_start);
            this.setState({
                habitacionesFiltradas: habitacionesFiltradasPorFechaInicio
            })
        }
    }

    handleFilter = (e) => {
        e.preventDefault();
        const habitacionesFiltradas = this.state.habitaciones.filter((habitacion) => {
            return habitacion.country === this.state.country && habitacion.city === this.state.city && habitacion.persons === this.state.persons && habitacion.price === this.state.price && habitacion.date_start === this.state.date_start
        })
        this.setState({
            habitacionesFiltradas: habitacionesFiltradas
        })
    }
    

    



    render() {
        return (
            <div>
                {/* <Navbar pagina="hoteles" /> */}
                <h1 className={styles.h1}>Hoteles</h1>

                <div className={styles.filters}>
                    <div className="form-group">
                        <label htmlFor="country" className={styles.label}>País</label>
                        <select name="country" id="country" className="form-control" onChange={this.handlePais}>
                            <option value={"todos"}>Todos</option>
                            {
                                //filter by unique values 
                                this.state.habitaciones
                                    .map((habitacion) => habitacion.country)
                                    .filter((value, index, self) => self.indexOf(value) === index)
                                    .map((habitacion) => {
                                        return (
                                            <option value={habitacion}>{habitacion}</option>
                                        )
                                    })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="city" className={styles.label}>Ciudad</label>
                        <select name="city" id="city" className="form-control" onChange={this.handleCity}>
                            <option value={"todos"}>Todos</option>
                            {
                                //filter by unique values 
                                this.state.habitaciones
                                    .map((habitacion) => habitacion.city)
                                    .filter((value, index, self) => self.indexOf(value) === index)
                                    .map((habitacion) => {
                                        return (
                                            <option value={habitacion}>{habitacion}</option>
                                        )
                                    })
                            }
                        </select>

                    </div>

                    <div className="form-group">
                        <label htmlFor="persons" className={styles.label}>Personas</label>
                        <select name="persons" id="persons" className="form-control" onChange={this.handlePersons}>
                            <option value={"todos"}>Todos</option>
                            {
                                //filter by unique values 
                                this.state.habitaciones
                                    .map((habitacion) => habitacion.persons)
                                    .filter((value, index, self) => self.indexOf(value) === index)
                                    .map((habitacion) => {
                                        return (
                                            <option value={habitacion}>{habitacion}</option>
                                        )
                                    })
                            }
                        </select>

                    </div>

                    <div className="form-group">
                        <label htmlFor="date_start" className={styles.label}>Fecha de inicio</label>
                        <select name="date_start" id="date_start" className="form-control" onChange={this.handleDate}>
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



                    <Button variant="success" onClick={this.handleFilter}> Filtrar </Button>
                </div>

                <div className={styles.container}>
                    {
                        this.state.habitacionesFiltradas
                            .map((habitacion) => {
                                return (
                                    <HabitacionCard
                                        title={habitacion.title}
                                        description={habitacion.description}
                                        country={habitacion.country}
                                        city={habitacion.city}
                                        persons={habitacion.persons}
                                        price={habitacion.price}
                                        date_start={habitacion.date_start}
                                        date_end={habitacion.date_end}
                                        image={habitacion.image}
                                    />
                                )
                            })}
                </div>

            </div>
        );
    }
}
