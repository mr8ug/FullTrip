import React, { Component } from 'react';

import Swal from 'sweetalert2';

import styles from "./styles/DashboardGlobal.module.css"
import styles_search_view from "./styles/SearchView.module.css"

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import CryptoJS from 'crypto-js';

import ReservationCard from './ReservationCard';
import FlightCard from './FlightCard';
import {ListGroup, Toast, ToastContainer } from 'react-bootstrap';
import RentalCard from './RentalCard';
import ReviewCard from './ReviewCard';

import dashboard from '../images/destination.png'


export default class DashboardUser extends Component {

    constructor(props) {

        super(props);
        this.state = {
            email: "",
            name: "",
            tipo: "",
            id_usuario: "",
            examplecards: [
                //list example cards

            ],
            reservas: [],
            alquileres: [],
            vuelos: [],
            reviews: [],

            showToast: true,
        }


    }

    handleCloseToast = () => {
        this.setState({
            showToast: false
        })
    }

    componentDidMount() {
        // console.log(this.state.user);

        //obtener valor de local storage
        var usuario = "";
        var nombre = ""
        var tipo = "";
        var id_usuario = "";
        window.sessionStorage.getItem('email') !== null ? usuario = CryptoJS.AES.decrypt(window.sessionStorage.getItem('email'), 'fulltrip').toString(CryptoJS.enc.Utf8) : usuario = "";
        window.sessionStorage.getItem('nombre') !== null ? nombre = CryptoJS.AES.decrypt(window.sessionStorage.getItem('nombre'), 'fulltrip').toString(CryptoJS.enc.Utf8) : nombre = "";
        window.sessionStorage.getItem('tipo') !== null ? tipo = CryptoJS.AES.decrypt(window.sessionStorage.getItem('tipo'), 'fulltrip').toString(CryptoJS.enc.Utf8) : tipo = "";
        window.sessionStorage.getItem('id') !== null ? id_usuario = window.sessionStorage.getItem('id') : id_usuario = "";

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
                id_usuario: id_usuario,

            })

            let formData = new FormData();
            formData.append('user_id', parseInt(id_usuario));

            //fetch reservas de hotel
            fetch('http://localhost:4000/api/room_reservation', {
                method: 'POST',
                body: formData,

            })
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    if (data.rooms) {
                        this.setState({
                            reservas: data.rooms,
                        })
                    } else {
                        this.setState({
                            reservas: [],
                        })
                    }

                })

            //fetch vuelos de usuario
            fetch('http://localhost:4000/api/flight_reservation', {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    if (data.flights) {
                        // console.log(data);
                        this.setState({
                            vuelos: data.flights,
                        })
                    } else {
                        this.setState({
                            vuelos: [],
                        })
                    }

                })

            //fetch alquileres de usuario
            fetch('http://localhost:4000/api/car_reservation', {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    if (data.cars) {
                        // console.log(data);
                        this.setState({
                            alquileres: data.cars,
                        })
                    } else {
                        this.setState({
                            alquileres: [],
                        })
                    }

                })

            //fetch de reviews
            fetch('http://localhost:4000/api/user_reviews', {
                method: 'POST',
                body: formData,

            })
                .then(response => response.json())
                .then(data => {
                    if (data.reviews) {
                        // console.log(data);
                        this.setState({
                            reviews: data.reviews,
                        })
                    } else {
                        this.setState({
                            reviews: [],
                        })

                    }
                }
                )
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

        // if (['hotel', 'aerolinea', 'arrendador'].includes(tipo)) {
        //     Swal.fire({
        //         title: 'Parece que tienes una cuenta de servicio',
        //         text: 'Pueedes acceder a tu cuenta empresarial desde la pestaña de \'Mi Empresa \' ',
        //         icon: 'info',
        //         timer: 5000,
        //         timerProgressBar: true,

        //     })
        // }

        //fetch reservas



    }

    goEmpresaDashboard = (e) => {
        if (this.state.tipo === "hotel") {
            window.location.href = "/DashboardHotel";
        } else if (this.state.tipo === "arrendador") {
            window.location.href = "/DashboardArrendador";
        } else if (this.state.tipo === "aerolinea") {
            window.location.href = "/DashboardAerolinea";
        }


    }

    render() {
        return (
            <div className={styles.dashboard_user}>

                <div className={styles.jumbotron}>
                    <h1 >Hola, {this.state.name}!</h1>
                    <p className={styles.hand}> &#128075;</p>
                    <p className={styles.p}>Es un placer verte de nuevo.</p>

                </div>




                <Tabs
                    className={styles.tabs}
                    defaultActiveKey="profile"
                    id="fill-tabs"
                    justify
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
                            <h1>🏁Tu Dashboard🏁</h1>
                            <p>Aqui encontrarás información relacionada a </p>
                            <div className={styles.mainTab}>
                                <img src={dashboard} alt='dashboard' />
                                <ListGroup variant='flush' style={{ width: '16rem' }}>
                                    <ListGroup.Item>Reservas de Hoteles</ListGroup.Item>
                                    <ListGroup.Item>Alquileres de Vehiculos</ListGroup.Item>
                                    <ListGroup.Item>Boletos de Aerolineas</ListGroup.Item>
                                    <ListGroup.Item>Reviews</ListGroup.Item>

                                </ListGroup>
                                
                            </div>

                        </div>
                    </Tab>
                    <Tab className={styles.tabs} eventKey="reservas" title="Reservas">
                        <div className={styles.tab_content}>
                            <h1>Reservas</h1>
                            <p>En esta seccion podras ver tus reservas</p>

                            <div className={styles_search_view.container}>
                                {
                                    this.state.reservas !== [] ? this.state.reservas.map((reserva, index) => {
                                        return (
                                            <ReservationCard
                                                key={index}
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
                                                mode="user"

                                            />
                                        )
                                    }) : <p>No tienes reservas</p>
                                }

                            </div>

                        </div>
                    </Tab>

                    <Tab className={styles.tabs} eventKey="alquileres" title="Alquileres">
                        <div className={styles.tab_content}>
                            <h1>Alquileres</h1>
                            <p>En esta seccion podras ver tus vehiculos alquilados</p>
                            <div className={styles_search_view.container}>
                                {
                                    this.state.alquileres !== [] ?
                                        this.state.alquileres.map((alquiler, index) => {
                                            return (
                                                <RentalCard
                                                    key={index}
                                                    brand={alquiler.brand}
                                                    car_rental={alquiler.car_rental}
                                                    car_rental_id={alquiler.car_rental_id}
                                                    city={alquiler.city}
                                                    country={alquiler.country}
                                                    date_reservation={alquiler.date_reservation}
                                                    end_date={alquiler.end_date}
                                                    id_car={alquiler.id_car}
                                                    img={alquiler.img}
                                                    line={alquiler.line}
                                                    model={alquiler.model}
                                                    observation={alquiler.observation}
                                                    price={alquiler.price}
                                                    start_date={alquiler.start_date}
                                                    user_id={this.state.id_usuario}
                                                    mode={"user"}
                                                />
                                            )
                                        })

                                        :
                                        <p>No tienes alquileres</p>
                                }

                            </div>
                        </div>
                    </Tab>

                    <Tab className={styles.tabs} eventKey="vuelos" title="Vuelos">
                        <div className={styles.tab_content}>
                            <h1>Vuelos</h1>
                            <p>En esta seccion podras ver tus vuelos</p>
                            <div className={styles_search_view.container}>
                                {
                                    this.state.vuelos !== [] ?
                                        this.state.vuelos
                                            .sort((a, b) => a.date_reservation - b.date_reservation)
                                            .map((vuelo, index) => {
                                                return (
                                                    <FlightCard
                                                        key={index}
                                                        id_flight={vuelo.id_flight}
                                                        airline_id={vuelo.airline_id}
                                                        airline_name={vuelo.airline_name}
                                                        date_reservation={vuelo.date_reservation}
                                                        price={vuelo.price}
                                                        flight_date={vuelo.flight_date}
                                                        flight_destination={vuelo.flight_destination}
                                                        flight_origin={vuelo.flight_origin}
                                                        departure_time={vuelo.departure_time}
                                                        available_seat={vuelo.available_seat}
                                                        return_date={vuelo.return_date}
                                                        mode="user"
                                                    />
                                                )
                                            }) : <p>No tienes vuelos</p>
                                }
                            </div>
                        </div>
                    </Tab>

                    <Tab className={styles.tabs} eventKey="reviews" title="Reseñas">
                        <div className={styles.tab_content}>
                            <h1>Reseñas</h1>
                            <p>En esta seccion podras ver tus reseñas</p>
                            <div className={styles_search_view.container}>
                                {
                                    this.state.reviews !== [] ?
                                        this.state.reviews.map((review, index) => {
                                            return (
                                                <ReviewCard
                                                    key={index}
                                                    description={review.description}
                                                    type_service_id={review.type_service_id}
                                                    email={this.state.email}

                                                />
                                            )
                                        }
                                        )
                                        :
                                        <p>No tienes reseñas</p>
                                }
                            </div>
                        </div>
                    </Tab>

                    {
                        this.state.tipo === ("hotel") || this.state.tipo === ("aerolinea") || this.state.tipo === ("arrendador") ?
                            <Tab className={styles.tabs} eventKey="favoritos" title="Mi Empresa">
                                <div className={styles.tab_content}>
                                    <p>Parece que tienes una cuenta de empresa con nosotros</p>
                                    <button onClick={this.goEmpresaDashboard} className={styles.btn_primary}>Dashboard Empresarial</button>
                                </div>
                            </Tab>
                            :
                            null
                    }




                </Tabs>

                {
                    (['hotel', 'aerolinea', 'arrendador'].includes(this.state.tipo)) ?
                        <ToastContainer position='top-end'>
                            <Toast bg='warning' style={{ margin: '5px' }} autohide delay={3000} show={this.state.showToast} onClose={this.handleCloseToast} >
                                <Toast.Header>
                                    <strong className="me-auto">Tu cuenta de empresa esta lista.</strong>
                                    <small>Ahora</small>

                                </Toast.Header>
                                <Toast.Body className={'text-white'}>Puedes acceder a ella desde la pestaña 'Mi Empresa'</Toast.Body>
                            </Toast>
                        </ToastContainer>
                        : null
                }



            </div>


        );
    }
}