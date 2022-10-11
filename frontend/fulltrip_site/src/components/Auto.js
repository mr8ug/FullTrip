import React, { Component } from "react";
import Swal from "sweetalert2";
import { Carousel, ListGroup, Button } from "react-bootstrap";

import CryptoJS from "crypto-js";
import styles from "../components/styles/ServiceView.module.css";
import { Accordion, ToastContainer, Toast } from "react-bootstrap";
import ReviewCard from "./ReviewCard";



export default class Auto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            usuario: "",
            nombre: "",
            tipo: "",
            id_usuario: "",

            data: {
                brand: "",
                car_id: "",
                car_rental_id: "",
                car_rental_name: "",
                city: "",
                country: "",
                email: "",
                line: "",
                model: "",
                price: "",

            },

            reservation: {
                start_date: "",
                end_date: "",
                observation: "",
                car_id: "",
                user_id: "",
            },
            todayDate: "",

            reviews: []
        }
    }

    componentDidMount() {
        //get today date in yyyy-mm-dd format
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        today = yyyy + '-' + mm + '-' + dd;
        this.setState({ todayDate: today });

        var url = window.location.href;
        var url_id = url.substring(url.lastIndexOf('=') + 1);
        this.setState({
            id: url_id
        })

        this.setState({
            reservation: {
                ...this.state.reservation,
                car_id: parseInt(url_id)
            }
        })

        let formData = new FormData();
        formData.append("id", url_id);

        fetch('http://localhost:4000/api/info_car', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.car) {
                    // console.log(data.car);
                    this.setState({
                        data: data.car
                    })
                } else {
                    Swal.fire({
                        title: 'Hmmm...',
                        text: 'Error al cargar el vehiculo, talvez no existo (?)',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,

                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                            window.location.href = "/Autos";

                        }

                    })
                }
            })
        //fetch reviews
        fetch('http://localhost:4000/api/all_reviews', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.reviews) {
                    var reviews = data.reviews;

                    var reviews_filtered = reviews.filter(review =>
                        Boolean(String(review.description).startsWith("{\"opinion\"") === true)
                        &&
                        JSON.parse(review.description).opinion.service_id === url_id
                        &&
                        review.type_service_id === 2
                    );
                    // console.log(reviews_filtered);
                    this.setState({
                        reviews: reviews_filtered
                    })





                }
                else {
                    this.setState({
                        reviews: []
                    })
                }
            })

        //filter reviews
        //check if user is logged in
        var usuario = "";
        var nombre = ""
        var tipo = "";
        var id_usuario = "";

        window.sessionStorage.getItem('email') !== null ? usuario = CryptoJS.AES.decrypt(window.sessionStorage.getItem('email'), 'fulltrip').toString(CryptoJS.enc.Utf8) : usuario = "";
        window.sessionStorage.getItem('nombre') !== null ? nombre = CryptoJS.AES.decrypt(window.sessionStorage.getItem('nombre'), 'fulltrip').toString(CryptoJS.enc.Utf8) : nombre = "";
        window.sessionStorage.getItem('tipo') !== null ? tipo = CryptoJS.AES.decrypt(window.sessionStorage.getItem('tipo'), 'fulltrip').toString(CryptoJS.enc.Utf8) : tipo = "";
        window.sessionStorage.getItem('id') !== null ? id_usuario = window.sessionStorage.getItem('id') : id_usuario = "";

        if (usuario !== "") {

            this.setState({
                usuario: usuario,
                nombre: nombre,
                tipo: tipo,
                id_usuario: id_usuario,
                reservation: {
                    ...this.state.reservation,
                    user_id: parseInt(id_usuario)
                }
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes iniciar sesion para reservar!',
                footer: '<a href="/IniciarSesion">Iniciar sesion</a>'

            })
            // window.location.href = "http://localhost:3000/IniciarSesion";
        }
    }


    onFechaInicioChange = (e) => {
        this.setState({
            reservation: {
                ...this.state.reservation,
                start_date: e.target.value
            }
        })
    }

    onFechaFinChange = (e) => {
        this.setState({
            reservation: {
                ...this.state.reservation,
                end_date: e.target.value
            }
        })
    }

    onObservacionChange = (e) => {
        this.setState({
            reservation: {
                ...this.state.reservation,
                observation: e.target.value
            }
        })
    }

    onTrigger = (e) => {
        e.preventDefault();

        let contrasena = document.getElementById("contrasena").value;

        let formData = new FormData();
        formData.append("id", parseInt(this.state.id_usuario));
        formData.append("password", contrasena);
        console.log('formdata', this.state.id_usuario, contrasena);

        fetch('http://localhost:4000/api/info_password', {
            method: 'POST',
            body: formData

        })

            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.password_state) {
                    console.log('respuesta', data.password_state)
                    if (data.password_state === 1) {
                        Swal.fire({
                            title: 'Enviando reservacion...',
                            text: 'Por favor espere',
                            icon: 'info',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            allowEnterKey: false,
                            showConfirmButton: false,

                        })

                        Swal.showLoading();

                        //send reservation to api
                        let formData = new FormData();
                        formData.append("start_date", this.state.reservation.start_date);
                        formData.append("end_date", this.state.reservation.end_date);
                        formData.append("observation", this.state.reservation.observation);
                        formData.append("car_id", this.state.data.car_id);
                        formData.append("user_id", this.state.reservation.user_id);


                        fetch('http://localhost:4000/api/add_car_reservation', {
                            method: 'POST',
                            body: formData
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data.status === 'ok') {
                                    Swal.fire({
                                        title: 'Reservacion enviada!',
                                        text: 'Tu reservacion ha sido enviada, puede verla en el apartado de alquileres',
                                        icon: 'success',
                                        timer: 2000,
                                        timerProgressBar: true,

                                    }).then((result) => {
                                        if (result.dismiss === Swal.DismissReason.timer) {
                                            window.location.href = "/Perfil";

                                        }

                                    })
                                }
                                else {
                                    Swal.fire({
                                        title: 'Hmmm...',
                                        text: 'Error al enviar reservacion',
                                        icon: 'error',
                                        timer: 2000,
                                        timerProgressBar: true,

                                    }).then((result) => {
                                        if (result.dismiss === Swal.DismissReason.timer) {
                                            window.location.href = "/Autos";

                                        }

                                    })
                                }
                            })
                    }

                } else if (!data.password_state || data.password_state === 0) {
                    Swal.fire({
                        title: 'Hmmm...',
                        text: 'Contraseña incorrecta',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,

                    })
                }
            })
    }






    render() {
        return (
            <div className={styles.container}>
                <div className={styles.jumbotron}>
                    <h1>{this.state.data.car_rental_name}</h1>
                    <p>{this.state.data.brand} desde ${this.state.data.price} al dia</p>
                    
                </div>

                

                <div className={styles.room_info}>
                    <div className={styles.leftPanel}>
                        <div className={styles.gallery}>
                            <Carousel>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={this.state.data.img}
                                        alt="First slide"
                                    />

                                    <Carousel.Caption>
                                        <h3>{this.state.data.brand} {this.state.data.line} {this.state.data.model}</h3>


                                    </Carousel.Caption>
                                </Carousel.Item>

                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={this.state.data.img}
                                        alt="Second slide"
                                        style={{ filter: "blur(10px)" }}
                                    />
                                    <Carousel.Caption>
                                        <h3>Solicita mas info.</h3>
                                        <p>{this.state.data.email}</p>
                                    </Carousel.Caption>

                                </Carousel.Item>
                            </Carousel>


                        </div>

                        <div className={styles.info}>
                            <ListGroup>
                                <ListGroup.Item><h3>Informacion</h3></ListGroup.Item>
                                <ListGroup.Item><b>Marca:</b> {this.state.data.brand}</ListGroup.Item>
                                <ListGroup.Item><b>Linea:</b> {this.state.data.line}</ListGroup.Item>
                                <ListGroup.Item><b>Modelo:</b> {this.state.data.model}</ListGroup.Item>
                                <ListGroup.Item><b>Precio:</b> ${this.state.data.price} / dia</ListGroup.Item>
                                <ListGroup.Item><b>Ubicacion:</b> {this.state.data.city}, {this.state.data.country}</ListGroup.Item>
                                <ListGroup.Item><b>Contacto:</b> {this.state.data.email}</ListGroup.Item>

                            </ListGroup>

                        </div>

                    </div>

                    <div className={styles.rightPanel}>
                        <h1>Reserva</h1>
                        {
                            this.state.usuario !== "" ?
                                <div>
                                    <form className={styles.reserva} onSubmit={this.onTrigger}>
                                        <div className={styles.form_group}>
                                            <label htmlFor="usuario">Usuario</label>
                                            <input type="text" name="usuario" id="usuario" className='form-control' value={this.state.usuario} disabled />
                                        </div>

                                        <div className={styles.form_group}>
                                            <label htmlFor="vehiculo">Vehiculo</label>
                                            <input type="text" name="vehiculo" id="vehiculo" className='form-control' value={this.state.data.brand + ' ' + this.state.data.line + ' ' + this.state.data.model} disabled />
                                        </div>

                                        <div className={styles.form_group}>
                                            <label htmlFor="start_date">Fecha Entrega</label>
                                            <input type="date" name="start_date" id="start_date" min={this.state.todayDate} className='form-control' onChange={this.onFechaInicioChange} required />
                                        </div>

                                        <div className={styles.form_group}>
                                            <label htmlFor="end_date">Fecha Retorno</label>
                                            <input type="date" name="end_date" id="end_date" min={this.state.reservation.start_date} className='form-control' onChange={this.onFechaFinChange} required />
                                        </div>

                                        <div className={styles.form_group}>
                                            <label htmlFor="observations">Observaciones</label>
                                        </div>
                                        <textarea id="observations" className="form-control" name="observations" rows="4" cols="50" onChange={this.onObservationsChange} required />

                                        <div className={styles.form_group}>
                                            <label htmlFor="contrasena">Contrasena</label>
                                            <input type="password" name="contrasena" id="contrasena" className='form-control' required />

                                        </div>

                                        <button type="submit" className="btn btn-primary">Reservar Auto</button>

                                    </form>
                                </div>

                                :
                                <div>

                                    <Button variant="success" href="/IniciarSesion">Iniciar Sesion</Button>

                                </div>
                        }

                    </div>

                </div>

                <div className={styles.reviews} id='reviews'>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Reseñas</Accordion.Header>
                            <Accordion.Body>
                                <div className={styles.reviews_container}>

                                    {
                                        //mapeo de comentarios
                                        this.state.reviews.length > 0 ?

                                            this.state.reviews
                                                .map((review, index) => {
                                                    return (
                                                        <ReviewCard
                                                            key={index}
                                                            description={review.description}
                                                            type_service_id={review.type_service_id}
                                                            email={this.state.email}
                                                        />
                                                    )
                                                })
                                            :

                                            <ListGroup>
                                                <ListGroup.Item>
                                                    No hay reseñas
                                                </ListGroup.Item>
                                            </ListGroup>
                                    }
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
                {
                        this.state.reviews.length > 0 ?
                            <ToastContainer position='middle-center'>
                                <Toast bg='success' style={{ margin: '5px' }} autohide delay={3000} show={this.state.showToast} onClose={this.handleCloseToast} >
                                    <Toast.Header>
                                        <strong className="me-auto">Reseñas disponibles.</strong>
                                        <small>Ahora</small>

                                    </Toast.Header>
                                    <Toast.Body className={'text-white'}>Puedes ver las reseñas disponibles al final de la pagina.</Toast.Body>
                                </Toast>
                            </ToastContainer>
                            : null
                    }
            </div>

        );
    }

    handleCloseToast = () => {
        this.setState({
            showToast: false
        })
    }
}