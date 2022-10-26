import React, {Component} from "react";
import styles from "./styles/RegistroGlobal.module.css";
import CryptoJS from "crypto-js";
import Swal from "sweetalert2";

export default class RegistroHabitacion extends Component{
    constructor(props){
        super(props);
        this.state={
            usuario: '',
            nombre: '',
            tipo: '',
            id: '',
            todayDate: new Date().toISOString().slice(0, 10)
        };

        
    };

    componentDidMount(){
        var usuario = "";
        var nombre = ""
        var tipo = "";
        var id = "";

        window.sessionStorage.getItem('email') !== null ? usuario = CryptoJS.AES.decrypt(window.sessionStorage.getItem('email'), 'fulltrip').toString(CryptoJS.enc.Utf8) : usuario = "";
        window.sessionStorage.getItem('nombre') !== null ? nombre = CryptoJS.AES.decrypt(window.sessionStorage.getItem('nombre'), 'fulltrip').toString(CryptoJS.enc.Utf8) : nombre = "";
        window.sessionStorage.getItem('tipo') !== null ? tipo = CryptoJS.AES.decrypt(window.sessionStorage.getItem('tipo'), 'fulltrip').toString(CryptoJS.enc.Utf8) : tipo = "";
        window.sessionStorage.getItem('id') !== null ? id = window.sessionStorage.getItem('id') : id = "";
        this.setState({
            usuario: usuario,
            nombre: nombre,
            tipo: tipo,
            id: id
        })
    }

    

    

    onTrigger = (event) =>{
        event.preventDefault();
        var password = document.getElementById("contrasena").value;

        let formData = new FormData();
        formData.append('password', password);
        formData.append('email', this.state.usuario);
        //console.log('Enviando', password, this.state.usuario);


        fetch(process.env.REACT_APP_API_URL+'login', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            //console.log(data)
            if(String(data.userid) === this.state.id){
                Swal.fire({
                    title:'Registrando habitacion',
                    text:'Por favor espere',
                    icon:'info',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                    showConfirmButton: false,
                    


                })
                var nombre = document.getElementById("room_name").value;
                var imagen = document.getElementById("imagen").files[0];
                var amount_people = document.getElementById("habitaciones").value;
                var fecha_disponible = document.getElementById("fecha_disponible").value;
                var fecha_fin = document.getElementById("fecha_fin").value;
                var precio = document.getElementById("precio").value;
                var id_hotel = this.state.id;
                
                var formData = new FormData();
                formData.append('room_name', nombre);
                formData.append('amount_people', amount_people);
                formData.append('price', precio);
                formData.append('start_date', fecha_disponible);
                formData.append('ending_date', fecha_fin);
                formData.append('img', imagen);
                formData.append('user_id', id_hotel);
                
                fetch(process.env.REACT_APP_API_URL+'add_room', {
                    method: 'POST',
                    body: formData
                })
                .then(res => res.json())
                .then(data => {
                    //console.log(data)
                    if(data.status === 'ok'){
                        Swal.fire({
                            title:'Habitacion registrada',
                            text:'La habitacion se ha registrado correctamente',
                            icon:'success',
                            confirmButtonText:'Ok',
                            
                        }).then(
                            function (isConfirm){
                                if(isConfirm){
                                    window.location.href = "/DashboardHotel";
                                }
                            }
                        )
                    }else{
                        Swal.fire({
                            title:'Error',
                            text:'No se ha podido registrar la habitacion',
                            icon:'error',
                            confirmButtonText:'Ok',
                            
                        })
                    }

                })
                

                    
            }else{
                Swal.fire({
                    title:'Contraseña incorrecta',
                    text:'Por favor ingrese la contraseña correcta',
                    icon:'error',
                    confirmButtonText:'Ok',

                })
            }
        })
    }

    render(){
        return(
            <div className={styles.card}>
                <h2>Registrar Habitacion</h2>
                {/* divider */}
                <div className={styles.divider}></div>
                <form onSubmit={this.onTrigger}>
                    <div className={styles.form_elements}>
                        <div className={styles.form_group}>
                            <label htmlFor="nombre">Nombre de Hotel</label>
                            <input type="text" className="form-control" name="nombre" id="nombre" placeholder={this.state.nombre} disabled/>
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="room_name">Nombre de Habitacion</label>
                            <input type="text" className="form-control" name="room_name" id="room_name" placeholder="Nombre de Habitacion" required/>
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="imagen">Portada</label>
                            <input type="file" className="form-control" name="imagen" id="imagen" placeholder="Imagen" required/>
                        </div>
                        {/* <div className={styles.form_group}>
                            <label htmlFor="imagen1">Imagen 1</label>
                            <input type="file" className="form-control" name="imagen1" id="imagen1" placeholder="Imagen1" />
                        </div> */}

                        <div className={styles.form_group}>
                            <label htmlFor="habitaciones">Habitaciones Disponibles</label>
                            <input type="number" className="form-control" name="habitaciones" id="habitaciones" placeholder="Habitaciones Disponibles" required/>
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="fecha_disponible">Fecha Inicio</label>
                            <input type="date" className="form-control" name="fecha_disponible" id="fecha_disponible" min={this.state.todayDate} placeholder="Fecha Disponible" required />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="fecha_fin">Fecha Fin</label>
                            <input type="date" className="form-control" name="fecha_fin" id="fecha_fin" min={this.state.todayDate} placeholder="Fecha Fin" required />
                        </div>                       
                        
                        <div className={styles.form_group}>
                            <label htmlFor="precio">Precio por Noche</label>
                            <input type="number" className="form-control" name="precio" id="precio" placeholder="Precio" min="0" step="0.01" required/>
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="contrasena">Contraseña</label>
                            <input type="password" className="form-control" name="contrasena" id="contrasena" placeholder="Contraseña" required />
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        {/* <button className={styles.btn_regresar}>Volver</button> */}
                        <button  className={styles.btn_crear}>Registrar Habitacion</button>
                    </div>
                </form>
            </div>

        );
    }
}