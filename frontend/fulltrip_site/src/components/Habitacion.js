import React, { Component } from "react";
import { Carousel, ListGroup, Button, Accordion, ToastContainer, Toast } from "react-bootstrap";
import Swal from "sweetalert2";
import CryptoJS from "crypto-js";




import styles from "../components/styles/ServiceView.module.css";
import ReviewCard from "./ReviewCard";




export default class Habitacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            usuario: '',
            nombre: '',
            tipo: '',
            id_usuario: '',

            data: {
                room_id: "",
                room_name: '',
                amount_people: '',
                price: '',
                hotel_id: '',
                hotel_name: '',
                country: '',
                city: '',
                user_id: '',
                img: '',
                email: '',
                start_date: '',
                ending_date: '',

            },

            reservation: {
                start_date: '',
                end_date: '',
                reservation_description: '',
                room_id: '',
                user_id: '',
            },

            reviews: []


        }
    }

    componentDidMount() {
        //get id from url
        var url = window.location.href;
        var id = url.substring(url.lastIndexOf('=') + 1);
        this.setState({
            id: id
        });

        this.setState({
            reservation: {
                ...this.state.reservation,
                room_id: parseInt(id)
            }
        })

        //fetch data about room
        let formData = new FormData();
        formData.append("id", id);
        fetch(process.env.REACT_APP_API_URL+'info_room', {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.room) {
                    // console.log(data.room)
                    this.setState({
                        data: data.room
                    });


                } else {
                    Swal.fire({
                        title: 'Hmmm...',
                        text: 'Error al cargar la habitacion, talvez no existo (?)',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,

                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                            window.location.href = "/Hoteles";

                        }

                    })
                }

            })


        //fetch reviews
        fetch(process.env.REACT_APP_API_URL+'all_reviews', {
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
                        review.type_service_id === 1
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

    handleStartDateChange = (e) => {
        this.setState({
            reservation: {
                ...this.state.reservation,
                start_date: e.target.value
            }
        })
    }

    handleEndDateChange = (e) => {
        // let date = e.target.value;
        this.setState({
            reservation: {
                ...this.state.reservation,
                end_date: e.target.value
            }
        })


    }

    handleDescriptionChange = (e) => {
        this.setState({
            reservation: {
                ...this.state.reservation,
                reservation_description: e.target.value
            }
        })
    }



    onTrigger = (e) => {
        e.preventDefault();
        let contrasena = document.getElementById("contrasena").value;
        //review password for reservation using login api

        let formData = new FormData();
        formData.append("id", parseInt(this.state.id_usuario));
        formData.append("password", contrasena);

        // console.log('formdata', this.state.id_usuario, contrasena)
        fetch(process.env.REACT_APP_API_URL+'info_password', {
            method: "POST",
            body: formData

        })
            .then(response => response.json())
            .then(data => {
                if (data.password_state) {
                    // console.log('respuesta de contrasena', data.password_state)
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

                        formData.append("start_date", this.state.reservation.start_date);
                        formData.append("end_date", this.state.reservation.end_date);
                        formData.append("reservation_description", this.state.reservation.reservation_description);
                        formData.append("room_id", this.state.data.room_id);
                        formData.append("user_id", this.state.reservation.user_id);

                        // console.log(this.state.data.room_id, this.state.reservation.user_id)
                        //enviar serevacion
                        fetch(process.env.REACT_APP_API_URL+'add_hotel_reservation', {
                            method: "POST",
                            body: formData
                        })
                            .then(response => response.json())
                            .then(data => {
                                // console.log(data)
                                if (data.status === 'ok') {
                                    Swal.fire({
                                        title: 'Reservacion enviada!',
                                        text: 'Su reservacion ha sido enviada, puede encontrar la reservacion en su perfil',
                                        icon: 'success',
                                        timer: 2000,
                                        timerProgressBar: true,

                                    }).then((result) => {
                                        if (result.dismiss === Swal.DismissReason.timer || result.isConfirmed) {
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
                                            window.location.href = "/Hoteles";

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

        // console.log(this.state.reservation, contrasena)
    }



    render() {
        return (
            <div className={styles.container}>
                <div className={styles.jumbotron}>
                    <h1>{this.state.data.room_name}</h1>
                    <p>Reserva ya!</p>

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
                                        <h3>{this.state.data.room_name}</h3>


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
                                        <h3>Solicita mas fotos</h3>
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
                                    {this.state.data.hotel_name}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {this.state.data.city}, {this.state.data.country}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {this.state.data.amount_people} personas
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    ${this.state.data.price}/noche
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {this.state.data.start_date} a {this.state.data.ending_date}
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
                                            <input type="text" id="usuario" className="form-control" disabled value={this.state.usuario} />
                                        </div>

                                        <div className={styles.form_group}>
                                            <label htmlFor="habitacion">Habitacion</label>
                                            <input type="text" id="habitacion" className="form-control" disabled value={this.state.data.room_name} />
                                        </div>

                                        <div className={styles.form_group}>
                                            <label htmlFor="start_date" >Fecha de entrada</label>
                                            <input type="date" id="start_date" className="form-control" min={this.state.data.start_date} max={this.state.data.ending_date} required onChange={this.handleStartDateChange} />
                                        </div>

                                        <div className={styles.form_group}>
                                            <label htmlFor="end_date" >Fecha de salida</label>
                                            <input type="date" id="end_date" className="form-control" min={this.state.reservation.start_date} max={this.state.data.ending_date} onChange={this.handleEndDateChange} required />
                                        </div>

                                        <div className={styles.form_group}>
                                            <label htmlFor="description" >Agregar detalles a reservacion</label>
                                        </div>

                                        <textarea id="description" className="form-control" placeholder="Notas de reservacion (opcional)" rows={5} onChange={this.handleDescriptionChange}></textarea>




                                        <div className={styles.form_group}>
                                            <label htmlFor="contrasena" >Contraseña</label>
                                            <input type="password" id="contrasena" className="form-control" required />

                                        </div>

                                        <Button type="submit">Solicitar Boleto</Button>

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