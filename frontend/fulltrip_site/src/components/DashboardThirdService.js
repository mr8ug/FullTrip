import React, { Component } from "react";


import styles from "./styles/DashboardGlobal.module.css"
import styles_search_view from "./styles/SearchView.module.css"

import Swal from "sweetalert2";
import CryptoJS from "crypto-js";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import RegistroHabitacion from "./RegistroHabitacion";
import RegistroAuto from "./RegistroAuto";
import RegistroVuelo from "./RegistroVuelo";
import { Accordion, Button, FloatingLabel } from "react-bootstrap";

//cards
import HabitacionCard from "./HabitacionCard";
import AutoCard from "./AutoCard";
import VueloCard from "./VueloCard";

import Form from "react-bootstrap/Form";
import ReservationCard from "./ReservationCard";
import RentalCard from "./RentalCard";
import FlightCard from "./FlightCard";


export default class DashboardThirdService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            tipo: '',
            id: '',
            servicios: [],
            user_info: {
                userid: '',
                date_birth: '',
                fullname: '',
                username: '',
                password: '',
                email: '',
                country: '',
                city: '',

            },
            reservaciones: [],
            reviews: []
        }


    }

    componentDidMount() {
        var usuario = "";
        var nombre = ""
        var tipo = "";
        var id = "";

        window.sessionStorage.getItem('email') !== null ? usuario = CryptoJS.AES.decrypt(window.sessionStorage.getItem('email'), 'fulltrip').toString(CryptoJS.enc.Utf8) : usuario = "";
        window.sessionStorage.getItem('nombre') !== null ? nombre = CryptoJS.AES.decrypt(window.sessionStorage.getItem('nombre'), 'fulltrip').toString(CryptoJS.enc.Utf8) : nombre = "";
        window.sessionStorage.getItem('tipo') !== null ? tipo = CryptoJS.AES.decrypt(window.sessionStorage.getItem('tipo'), 'fulltrip').toString(CryptoJS.enc.Utf8) : tipo = "";
        window.sessionStorage.getItem('id') !== null ? id = window.sessionStorage.getItem('id') : id = "";
        // console.log(tipo)
        // console.log(['hotel', 'auto', 'aerolinea'].includes(tipo))

        if (!['hotel', 'arrendador', 'aerolinea'].includes(tipo)) {
            Swal.fire({
                title: 'Hmm parece que no tienes una cuenta de empresa',
                text: 'Por favor crea una cuenta de empresa para poder acceder a esta pagina',
                icon: 'warning',
                confirmButtonText: 'Ok',

            }).then(
                function (isConfirm) {
                    if (isConfirm) {
                        window.location.href = "/Perfil";
                    }
                }
            )
        } else {
            this.setState({
                email: usuario,
                name: nombre,
                tipo: tipo,
                id: id
            })

            if (tipo === 'hotel') {
                fetch(process.env.REACT_APP_API_URL+"all_rooms", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        const filtro = data.rooms.filter((item) => item.hotel_name === this.state.name)
                        this.setState({
                            servicios: filtro
                        })
                    })


                let formData = new FormData();
                formData.append('hotel_id', parseInt(id));
                //obtener reservaciones de hotel
                fetch(process.env.REACT_APP_API_URL+"reservation_hotel", {
                    method: 'POST',
                    body: formData

                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.reservations) {
                            console.log(data.reservations)
                            this.setState({
                                reservaciones: data.reservations
                            })
                        } else {
                            this.setState({
                                reservaciones: []
                            })
                        }
                    })

            }
            if (tipo === 'arrendador') {
                fetch(process.env.REACT_APP_API_URL+"all_cars", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        const filtro = data.cars.filter(car => car.car_rental === this.state.name)
                        this.setState({
                            servicios: filtro
                        })
                    })

                let formData = new FormData();
                formData.append('car_rental_id', parseInt(id));
                //obtener reservaciones de hotel
                fetch(process.env.REACT_APP_API_URL+"reservation_car_rental", {
                    method: 'POST',
                    body: formData

                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.reservations) {
                            console.log(data.reservations)
                            this.setState({
                                reservaciones: data.reservations
                            })
                        } else {
                            this.setState({
                                reservaciones: []
                            })
                        }
                    })
            }
            if (tipo === 'aerolinea') {
                fetch(process.env.REACT_APP_API_URL+"all_flights", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        const filtro = data.flights.filter(flight => flight.airline_name === this.state.name)
                        this.setState({
                            servicios: filtro
                        })
                    })

                let formData = new FormData();
                formData.append('airline_id', parseInt(id));
                //obtener reservaciones de aerolinea
                fetch(process.env.REACT_APP_API_URL+"reservation_airline", {
                    method: 'POST',
                    body: formData
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.reservations) {
                            console.log(data.reservations)
                            this.setState({
                                reservaciones: data.reservations
                            })
                        } else {
                            this.setState({
                                reservaciones: []
                            })
                        }
                    })

            }

            //fetch de su informacion personal
            let formData = new FormData();
            // formData.append('email', usuario);
            formData.append('id', id);
            fetch(process.env.REACT_APP_API_URL+"user_info", {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    this.setState({
                        user_info: data
                    })

                    //fix date




                })

        }

    }

    focusCrear = () => {
        setTimeout(() => {
            var crear = document.getElementById('crear')
            crear.scrollIntoView({ behavior: 'smooth' },)
        }, 500);

    }

    focusVer = () => {
        setTimeout(() => {
            var ver = document.getElementById('ver')
            ver.scrollIntoView({ behavior: 'smooth' },)
        }, 500);
    }

    showButton = (e) => {
        e.preventDefault();
        document.getElementById('submit_perfil').style.display = 'block'

    }



    render() {
        return (
            <div className={styles.dashboard_thirdservice}>


                <div className={styles.jumbotron}>
                    <h1>Hola, {this.state.name}!</h1>
                    <p className={styles.hand}> &#128075;</p>
                    <p className={styles.p}>Esta es tu cuenta de {
                        this.state.tipo === 'hotel' ? 'Hotel' : this.state.tipo === 'arrendador' ? 'Arrendador de autos' : 'Aerolinea'
                    }</p>
                </div>

                <Tabs
                    className={styles.tabs}
                    defaultActiveKey="profile"
                    id="fill-tabs"
                    justify
                    variant='tabs'

                >
                    <Tab className={styles.tab} eventKey="profile" title="Perfil">
                        <h1>Vista general</h1>
                        <div className={styles.perfil}>
                            <form>
                                <div className={styles.perfil_info} >



                                    <FloatingLabel controlId="nombre_perfil" label="Nombre">
                                        <Form.Control type="text" placeholder="Nombre" value={this.state.user_info.fullname} onChange={this.showButton} />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="email_perfil" label="Email">
                                        <Form.Control type="text" placeholder="Email" value={this.state.user_info.email} disabled />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="telefono_perfil" label="Pais">
                                        <Form.Control type="text" placeholder="Pais" value={this.state.user_info.country} onChange={this.showButton} />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="city_perfil" label="Ciudad">
                                        <Form.Control type="text" placeholder="Ciudad" value={this.state.user_info.city} onChange={this.showButton} />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="tipo_perfil" label="Tipo de Cuenta" >
                                        <Form.Control type="text" placeholder="Tipo de cuenta" value={
                                            this.state.tipo === 'hotel' ? 'Hotel' : this.state.tipo === 'arrendador' ? 'Arrendador' : 'Aerolinea'
                                        } disabled />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="date_perfil" label="Fecha de Nacimiento">
                                        <Form.Control type="date" placeholder="Fecha de Nacimiento" value={
                                            this.state.user_info.date_birth !== undefined ? this.state.user_info.date_birth.slice(0, 10) : ""
                                        } onChange={this.showButton} />
                                    </FloatingLabel>



                                    <FloatingLabel controlId="contrasena_perfil" label="Nueva Contraseña">
                                        <Form.Control type="password" placeholder="Contraseña" onChange={this.showButton} />
                                    </FloatingLabel>





                                    <FloatingLabel controlId="contrasena2_perfil" label="Confirmar Contraseña">
                                        <Form.Control type="password" placeholder="Contraseña" onChange={this.showButton} />
                                    </FloatingLabel>

                                    <Button id="submit_perfil" style={{ display: "none" }} variant="warning">
                                        Guardar Cambios
                                    </Button>


                                </div>
                            </form>
                        </div>


                    </Tab>
                    {/* SERVICIOS DE HOTEL */}
                    {

                        this.state.tipo === "hotel" ?
                            <Tab className={styles.tab} eventKey="habitaciones" title="Habitaciones" onClick={this.focusCrear}>
                                <Accordion defaultActiveKey={1}>
                                    <Accordion.Item eventKey="0" onClick={this.focusCrear} >
                                        <Accordion.Header>Crear una habitacion</Accordion.Header>
                                        <Accordion.Body id='crear'>
                                            <RegistroHabitacion />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Ver habitaciones</Accordion.Header>
                                        <Accordion.Body id='ver' onClick={this.focusVer}>

                                            {/* <div className={styles_search_view.jumbotron}>
                                                <h1 className={styles_search_view.h1}>🛫 {this.state.name} 🛬</h1>
                                            </div> */}

                                            <div className={styles_search_view.container}>
                                                {/* <Hoteles /> */}
                                                {

                                                    this.state.servicios === [] ? <h1>No hay habitaciones disponibles</h1> :
                                                        this.state.servicios
                                                            .filter((habitacion) => habitacion.hotel_name === this.state.name)
                                                            .map((habitacion, i) => {
                                                                return (
                                                                    <HabitacionCard
                                                                        key={i}
                                                                        room_id={habitacion.room_id}
                                                                        room_name={habitacion.room_name}
                                                                        hotel_name={habitacion.hotel_name}
                                                                        country={habitacion.country}
                                                                        city={habitacion.city}
                                                                        amount_people={habitacion.amount_people}
                                                                        price={habitacion.price}
                                                                        start_date={habitacion.start_date}
                                                                        ending_date={habitacion.ending_date}
                                                                        img={habitacion.img}
                                                                        mode="dashboard"
                                                                    // image={"https://img.freepik.com/vector-gratis/plantilla-fondo-interior-dormitorio-dibujos-animados-acogedora-habitacion-moderna-luz-manana_33099-171.jpg?w=2000"}
                                                                    />
                                                                )
                                                            })

                                                }
                                            </div>

                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Tab>
                            :

                            null

                    }
                    {/* SERVICIOS DE ARRENDADOR */}
                    {

                        this.state.tipo === "arrendador" ?
                            <Tab className={styles.tab} eventKey="arrendador" title="Autos" onClick={this.focusCrear}>
                                <Accordion defaultActiveKey={1}>
                                    <Accordion.Item eventKey="0" onClick={this.focusCrear} >
                                        <Accordion.Header>Crear un Auto</Accordion.Header>
                                        <Accordion.Body id='crear'>
                                            <RegistroAuto />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Ver Autos</Accordion.Header>
                                        <Accordion.Body id='ver' onClick={this.focusVer}>
                                            {/* <div className={styles_search_view.jumbotron}>
                                                <h1 className={styles_search_view.h1}>🚙 {this.state.name} 🚙</h1>
                                            </div> */}
                                            {/* <Autos /> */}

                                            <div className={styles_search_view.container}>
                                                {

                                                    this.state.servicios === [] ? <h1>No hay autos disponibles</h1> :
                                                        this.state.servicios
                                                            .filter(auto => auto.car_rental === this.state.name)
                                                            .map((auto, i) =>
                                                                <AutoCard
                                                                    key={i}
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
                                                                    mode={"dashboard"}


                                                                // image={"https://img.freepik.com/vector-gratis/plantilla-fondo-interior-dormitorio-dibujos-animados-acogedora-habitacion-moderna-luz-manana_33099-171.jpg?w=2000"}
                                                                />
                                                            )
                                                }
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Tab>
                            :

                            null

                    }
                    {/* SERVICIOS DE AEROLINEA */}
                    {
                        this.state.tipo === "aerolinea" ?
                            <Tab className={styles.tab} eventKey="aerolinea" title="Vuelos" onClick={this.focusCrear}>
                                <Accordion defaultActiveKey={1}>
                                    <Accordion.Item eventKey="0" onClick={this.focusCrear} >
                                        <Accordion.Header>Crear un Vuelo</Accordion.Header>
                                        <Accordion.Body id='crear'>
                                            <RegistroVuelo />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Ver Vuelos</Accordion.Header>
                                        <Accordion.Body id='ver' onClick={this.focusVer}>
                                            {/* <div className={styles_search_view.jumbotron}>
                                                <h1 className={styles_search_view.h1}>🛫 {this.state.name} 🛬</h1>
                                            </div> */}

                                            <div className={styles_search_view.container}>


                                                {
                                                    this.state.servicios === [] ? <h1>No hay vuelos disponibles</h1> :
                                                        this.state.servicios
                                                            .filter(vuelo => vuelo.airline_name === this.state.name)
                                                            .map((vuelo, i) =>
                                                                <VueloCard
                                                                    key={i}
                                                                    id_flight={vuelo.id_flight}
                                                                    airline_id={vuelo.airline_id}
                                                                    airline_name={vuelo.airline_name}
                                                                    price={vuelo.price}
                                                                    flight_date={vuelo.flight_date}
                                                                    flight_destination={vuelo.flight_destination}
                                                                    flight_origin={vuelo.flight_origin}
                                                                    departure_time={vuelo.departure_time}
                                                                    available_seat={vuelo.available_seat}
                                                                    mode="dashboard"
                                                                />
                                                            )

                                                }
                                            </div>

                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Tab>
                            :

                            null
                    }



                    <Tab className={styles.tab} eventKey="reservas" title="Reservaciones">
                        <h1>Reservas</h1>
                        <div className={styles_search_view.container}>


                            {
                                (this.state.reservaciones !== []) ?
                                    this.state.tipo === 'hotel' ?

                                        this.state.reservaciones
                                            .map((reserva, i) => {
                                                return (
                                                    <ReservationCard
                                                        key={i}
                                                        amount_people={reserva.amount_people}
                                                        city={reserva.city}
                                                        country={reserva.country}
                                                        end_date_r={reserva.end_date_r}
                                                        ending_date_d={reserva.ending_date_d}
                                                        hotel_id={reserva.hotel_id}
                                                        hotel_name={reserva.hotel_name}
                                                        id_room={reserva.id_room}
                                                        img={reserva.img}
                                                        price={reserva.price}
                                                        reservation_description={reserva.reservation_description}
                                                        room_name={reserva.room_name}
                                                        start_date_d={reserva.start_date_d}
                                                        start_date_r={reserva.start_date_r}
                                                        user_id={reserva.user_id}
                                                        email={reserva.email}
                                                        mode="service"

                                                    />
                                                )
                                            })

                                        : this.state.tipo === 'arrendador' ?
                                            this.state.reservaciones
                                                .map((reserva, i) => {
                                                    return (
                                                        <RentalCard
                                                            key={i}
                                                            brand={reserva.brand}
                                                            car_rental={reserva.car_rental}
                                                            car_rental_id={reserva.car_rental_id}
                                                            city={reserva.city}
                                                            country={reserva.country}
                                                            date_reservation={reserva.date_reservation}
                                                            end_date={reserva.end_date}
                                                            id_car={reserva.id_car}
                                                            img={reserva.img}
                                                            line={reserva.line}
                                                            model={reserva.model}
                                                            observation={reserva.observation}
                                                            price={reserva.price}
                                                            start_date={reserva.start_date}
                                                            user_id={reserva.user_id}
                                                            email={reserva.email}
                                                            mode="service"

                                                        />
                                                    )
                                                })
                                            :
                                            this.state.tipo === 'aerolinea' ?
                                                this.state.reservaciones
                                                .map((reserva, i) => {
                                                    return(
                                                        <FlightCard
                                                        key={i}
                                                        airline_id={reserva.airline_id}
                                                        airline_name={reserva.airline_name}
                                                        date_reservation={reserva.date_reservation}
                                                        departure_time={reserva.departure_time}
                                                        flight_date={reserva.flight_date}
                                                        flight_destination={reserva.flight_destination}
                                                        flight_origin={reserva.flight_origin}
                                                        id_flight={reserva.id_flight}
                                                        price={reserva.price}
                                                        return_date={reserva.return_date}
                                                        user_id={reserva.user_id}
                                                        email={reserva.email}
                                                        mode="service"
                                                        />
                                                    )
                                                })
                                                :
                                                <h1>No hay reservaciones</h1>
                                    :
                                    <h1>No hay reservaciones</h1>
                            }
                        </div>

                    </Tab>



                    {/* <Tab className={styles.tab} eventKey="carga" title="Reseñas">
                        <h1>Reseñas</h1>
                    </Tab> */}


                </Tabs>
            </div>
        );
    }
}
