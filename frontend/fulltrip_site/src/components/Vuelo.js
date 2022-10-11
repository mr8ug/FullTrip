import React, { Component } from "react";
import Swal from "sweetalert2";

import CryptoJS from "crypto-js";
import { Button, Carousel, ListGroup, Accordion, ToastContainer, Toast } from "react-bootstrap";
import styles from "../components/styles/ServiceView.module.css";
import no_preview_img from '../images/vuelos.png'
import ReviewCard from "./ReviewCard";


export default class Vuelo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            usuario: "",
            nombre: "",
            tipo: "",
            id_usuario: "",

            data: {
                airline_id: '',
                airline_name: '',
                user_id: '',
                flight_id: '',
                flight_date: '',
                flight_destination: '',
                origin_flight: '',
                number_seat: '',
                price: '',
                departure_time: '',
                available_seat: '',
                email: '',
                img: '',
            },

            reservation: {
                return_date: '',
                observation: '',
                user_id: '',
                flight_id: '',
            },
            reviews:[],
            showToast:true
        }
    }

    checkIfImageExists(urlToFile, callback) {
        var img = new Image();
        img.src = urlToFile;

        if (img.complete) {
            callback(true);
        } else {
            img.onload = () => {
                callback(true);
            };

            img.onerror = () => {
                callback(false);
            };
        }
    }

    componentDidMount() {
        var url = window.location.href;
        var id = url.substring(url.lastIndexOf('=') + 1);
        this.setState({ id: id });

        this.setState({
            reservation: {
                ...this.state.reservation,
                flight_id: parseInt(id)
            }
        })

        //fetch data about flight
        let formData = new FormData();
        formData.append('id', id);
        fetch('http://localhost:4000/api/info_flight', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.flight) {
                    console.log(data.flight)
                    this.setState({
                        data: data.flight

                    })
                } else {
                    Swal.fire({
                        title: 'Hmmm...',
                        text: 'Error al cargar el vuelo, talvez no existo (?)',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,

                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                            window.location.href = "/Aerolineas";

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
                        JSON.parse(review.description).opinion.service_id === id
                        &&
                        review.type_service_id === 3
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

    handleFechaRetornoChange = (e) => {

        const fecha = e.target.value;
        if (fecha !== this.state.data.flight_date || fecha !== "0000-00-00") {
            // console.log("vuelo ida y vuelta", fecha, this.state.data.flight_date)
            this.setState({
                reservation: {
                    ...this.state.reservation,
                    return_date: fecha
                }
            })
        } else {
            // console.log("vuelo solo ida")
            this.setState({
                reservation: {
                    ...this.state.reservation,
                    return_date: ""
                }
            })
        }
    }


    handleObservacionChange = (e) => {
        this.setState({
            reservation: {
                ...this.state.reservation,
                observation: e.target.value
            }
        })
    }

    onTrigger = (e) =>{
        e.preventDefault();
        let contrasena = document.getElementById("contrasena").value;

        let formData = new FormData();
        formData.append('id', parseInt(this.state.id_usuario));
        formData.append('password', contrasena);

        
        

        fetch("http://localhost:4000/api/info_password", {
            method: "POST",
            body: formData

        })
            .then(response => response.json())
            .then(data => {
                if (data.password_state) {
                    console.log('respuesta de contrasena', data.password_state)
                    if (data.password_state === 1) {
                        Swal.fire({
                            title: 'Enviando reservacion...',
                            text: 'Por favor espere',
                            allowEnterKey: false,
                            allowEscapeKey: false,
                            allowOutsideClick: false,

                        })

                        Swal.showLoading();

                        //send reservation to api
                        let formData = new FormData();

                        formData.append('return_date', this.state.reservation.return_date);
                        formData.append('observation', this.state.reservation.observation);
                        formData.append('user_id', this.state.reservation.user_id);
                        formData.append('flight_id', this.state.data.flight_id);


                        console.log(this.state.data.flight_id, this.state.reservation.user_id)
                        //enviar serevacion
                        fetch("http://localhost:4000/api/add_flight_reservation", {
                            method: "POST",
                            body: formData
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log(data)
                                if (data.status ==='ok') {
                                    Swal.fire({
                                        title: 'Reservacion enviada!',
                                        text: 'Su reservacion ha sido enviada, puede encontrar la reservacion en su perfil',
                                        icon: 'success',
                                        timer: 2000,
                                        timerProgressBar: true,

                                    }).then((result) => {
                                        if (result.dismiss === Swal.DismissReason.timer || result.isConfirmed)  {
                                            window.location.href = "/Perfil";

                                        }

                                    })
                                } 
                                
                                else {
                                    Swal.fire({
                                        title: 'Hmmm...',
                                        text: 'Error al enviar la reservacion, talvez no existo (?)',
                                        icon: 'error',
                                        timer: 2000,
                                        timerProgressBar: true,

                                    }).then((result) => {
                                        if (result.dismiss === Swal.DismissReason.timer) {
                                            window.location.href = "/Aerolineas";

                                        }

                                    })
                                }

                            }).catch(error => {
                                console.log(error)
                            })

                    






                    }
                }
                else if (!data.password_state || data.password_state === 0) {
                    Swal.fire({
                        title: 'Hmmm...',
                        text: 'Contraseña incorrecta',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,

                    })
                }
            })

        console.log(this.state.reservation, contrasena)



    }



    render() {
        return (
            <div className={styles.container}>
                <div className={styles.jumbotron}>
                    <h1>{this.state.data.origin_flight} {" ✈️ "}{this.state.data.flight_destination}</h1>
                    <p>Reserva tu boleto!</p>
                </div>

                <div className={styles.room_info}>
                    <div className={styles.leftPanel}>
                        <div className={styles.gallery}>
                            <Carousel>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={no_preview_img}
                                        alt="First slide" />

                                    <Carousel.Caption>
                                        <h5>{this.state.data.flight_destination}</h5>
                                        <p>{this.state.data.airline_name}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>

                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={no_preview_img}
                                        alt="Second slide"
                                        style={{ filter: "blur(10px)" }} />


                                    <Carousel.Caption>
                                        <h5>Solicita mas informacion</h5>
                                        <p>{this.state.data.email}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
                        </div>

                        <div className={styles.info}>
                            <ListGroup>
                                <ListGroup.Item>
                                    <h3>Informacion</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Fecha de salida: {this.state.data.flight_date}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Hora de salida: {this.state.data.departure_time}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Asientos disponibles: {this.state.data.available_seat} / {this.state.data.number_seat}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Precio: ${this.state.data.price}
                                </ListGroup.Item>

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
                                            <input type="text" id="usuario" className="form-control" name="usuario" value={this.state.usuario} disabled />
                                        </div>

                                        <div className={styles.form_group}>
                                            <label htmlFor="fecha">Fecha Regreso (?)</label>
                                            <input type="date" id="fecha" className="form-control" name="fecha" min={this.state.data.flight_date} onChange={this.handleFechaRetornoChange} />
                                        </div>

                                        <div className={styles.form_group}>
                                            <label htmlFor="origen">Origen</label>
                                            <input type="text" id="origen" className="form-control" name="origen" value={this.state.data.origin_flight} disabled />
                                        </div>

                                        <div className={styles.form_group}>
                                            <label htmlFor="destino">Destino</label>
                                            <input type="text" id="destino" className="form-control" name="destino" value={this.state.data.flight_destination} disabled />
                                        </div>



                                        <div className={styles.form_group}>
                                            <label>Observaciones</label>
                                        </div>

                                        <div className={styles.form_group}>
                                            <textarea className="form-control" name="observaciones" id="observaciones" rows="3" onChange={this.handleObservacionesChange}></textarea>
                                        </div>

                                        <div className={styles.form_group}>
                                            <label htmlFor="contrasena" >Contraseña</label>
                                            <input type="password" id="contrasena" className="form-control" required />

                                        </div>

                                        <Button type="submit">Reservar Boleto</Button>

                                    </form>
                                    <p>(?) En caso 'Fecha Regreso' sea igual a la fecha de salida, el vuelo sera tomado como solo de ida.</p>
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