import React, { Component } from "react";

import { Card, Button } from "react-bootstrap";

import CryptoJS from "crypto-js";

import Swal from "sweetalert2";

import styles from './styles/ServiceView.module.css';

import review from '../images/review.png';

export default class RegistroReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tipo_servicio: this.props.tipo_servicio,
            email: "",
            name: "",
            tipo: "",
            id_usuario: "",
            

            review: {
                user_id: "",
                type_service_id: "",
                description: {
                    opinion: {}
                },
            },

            opinion: {
                service_id: "",
                service_review: "",
            }
        }
    }

    componentDidMount() {



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
            // console.log(this.props.tipo_servicio)
            if (this.state.tipo_servicio === "hotel") {
                this.setState({

                    review: {
                        ...this.state.review,
                        user_id: parseInt(id_usuario),
                        type_service_id: 1,
                    }
                })
            }
            if (this.props.tipo_servicio === "auto") {
                this.setState({

                    review: {
                        ...this.state.review,
                        user_id: parseInt(id_usuario),
                        type_service_id: 2,
                    }
                })
            }
            if (this.props.tipo_servicio === "vuelo") {
                this.setState({

                    review: {
                        ...this.state.review,
                        user_id: parseInt(id_usuario),
                        type_service_id: 3,
                    }
                })
            }

            //obtener informacion de la url
            var url = window.location.href;
            var url_id = url.substring(url.lastIndexOf('=') + 1);

            this.setState({


                opinion: {
                    ...this.state.opinion,
                    service_id: url_id,
                }
            })



            //realizar fetch de todos los reviews de el servicio
            //el dato esta incluido en la propiedad de descripcion, hacer split de datos

        }




    }

    onChangeDescription = (e) => {
        let opinion = e.target.value;
        this.setState({
            opinion: {
                ...this.state.opinion,
                service_review: opinion,
            },

            
        })
        
    }

    

    onTrigger = (e) => {
        e.preventDefault();
        let contrasena = document.getElementById("contrasena").value;
        //realizar fetch para agregar revi
        this.setState({
            review: {
                ...this.state.review,
                description: {
                    
                    opinion: this.state.opinion,
                }
            }
        })

        let formData = new FormData();
        formData.append("id", this.state.id_usuario);
        formData.append("password", contrasena);

        fetch('http://localhost:4000/api/info_password', {
            method: 'POST',
            body: formData,
        })
        .then(res => res.json())
        .then(data => {
            console.log('data', data);
            if(data.password_state){
                if(data.password_state === 1){
                    Swal.fire({
                        title:'Enviando calificacion',
                        text: 'Por favor espere',
                        icon: 'info',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        allowEnterKey: false,
                        showConfirmButton: false,
                    })

                    Swal.showLoading();

                    //send comentario

                    let formData = new FormData();
                    formData.append('user_id', this.state.review.user_id);
                    formData.append('type_service_id', this.state.review.type_service_id);
                    formData.append('description', JSON.stringify(this.state.review.description));

                    fetch('http://localhost:4000/api/create_review',{
                        method: 'POST',
                        body: formData,

                    })
                    .then(res => res.json())
                    .then(data => {
                        console.log('data', data);
                        if(data.status === 'ok'){
                            Swal.fire({
                                title: 'Calificacion enviada',
                                text: 'Gracias por tu opinion',
                                icon: 'success',
                                confirmButtonText: 'Ok',
                            }).then(
                                function(isConfirm){
                                    if(isConfirm){
                                        window.location.href = "/Perfil";
                                    }
                                }
                            )
                        }else{
                            Swal.fire({
                                title: 'Error',
                                text: 'No se pudo enviar la calificacion',
                                icon: 'error',
                                confirmButtonText: 'Ok',
                            })
                        }
                    })
                }
            }else if(!data.password_state || data.password_state === 0){
                Swal.fire({
                    title: 'Error',
                    text: 'La contraseña es incorrecta',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                })
            }

            
        })
            
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.room_info}>
                    
                        
                        
                    

                    
                        <Card>
                        <Card.Header>Calificacion</Card.Header>
                            <Card.Img src={review} variant='bottom'/>
                            

                            <Card.Body>
                                <form onSubmit={this.onTrigger} className={styles.reserva}>
                                    {/* <div className={styles.form_elements}> */}
                                    <div className={styles.form_group}>
                                        <label htmlFor='user'>Usuario</label>
                                        <input className="form-control" type='text' name='user' id='user' value={this.state.email} disabled />
                                    </div>

                                    <div className={styles.form_group}>
                                        <label htmlFor='name'>Nombre</label>
                                        <input className="form-control" type='text' name='name' id='name' value={this.state.name} disabled />
                                    </div>

                                    <div className={styles.form_group}>
                                        <label htmlFor='description'>Opinion</label>
                                    </div>
                                    <textarea className="form-control" id="description" name="description" rows="4" cols="50" onChange={this.onChangeDescription} required/>

                                    <div className={styles.form_group}>
                                        <label htmlFor="contrasena">Contrasena</label>
                                        <input className="form-control" id="contrasena" name="contrasena"required/>

                                    </div>

                                    <Button variant="primary" type="submit" className={styles.btn}>Enviar Reseña </Button>
                                    {/* </div> */}
                                </form>
                            </Card.Body>
                        </Card>
                    
                </div>
            </div>


        )
    }
}