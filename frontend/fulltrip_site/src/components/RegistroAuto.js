import React, {Component} from "react";
import styles from "./styles/RegistroGlobal.module.css";
import CryptoJS from "crypto-js";
import Swal from "sweetalert2";
// import Swal from 'sweetalert2';


export default class RegistroAuto extends Component{
    constructor(props){
        super(props);
        this.state={
            usuario: "",
            nombre: "",
            tipo:"",
            id: "",


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
        //console.log('Enviando', formData);

        fetch(process.env.REACT_APP_API_URL+'login',{
            method: 'POST',
            body: formData
        })
        .then (res => res.json())
        .then (data =>{
            //console.log(data);
            if(String(data.userid) === this.state.id){
                Swal.fire({
                    title:'Registrando vehiculo',
                    text: 'Espere un momento',
                    icon: 'info',
                    allowOutsideClick: false,
                    allowEnterKey: false,
                    allowEscapeKey: false,
                    showConfirmButton: false
                
                })
                
                var marca = document.getElementById("marca").value;
                var linea = document.getElementById("linea").value;
                var modelo = document.getElementById("modelo").value;
                var placa = document.getElementById("placa").value;
                var precio = document.getElementById("precio").value;
                var foto = document.getElementById("foto").files[0];
                var id_arrendador = this.state.id;

                var formData = new FormData();
                formData.append('brand', marca);
                formData.append('line', linea);
                formData.append('model', modelo);
                formData.append('placa', placa);
                formData.append('price', precio);
                formData.append('img', foto);
                formData.append('user_id', id_arrendador);

                fetch(process.env.REACT_APP_API_URL+'add_car',{
                    method: 'POST',
                    body: formData
                })
                .then (res => res.json())
                .then (data =>{
                    //console.log(data);
                    if(data.status === 'ok'){
                        Swal.fire({
                            title:'Vehiculo registrado',
                            text: 'El vehiculo se ha registrado correctamente',
                            icon: 'success',
                            confirmButtonText:'Ok'
                        })
                        .then(
                            function(isConfirm){
                                if(isConfirm){
                                    window.location.href = "/DashboardArrendador";
                                }
                            }
                        )
                    }else{
                        Swal.fire({
                            title:'Error',
                            text: 'Ha ocurrido un error al registrar el vehiculo',
                            icon: 'error',
                            confirmButtonText:'Ok'
                        })
                    }
                })

            }else{
                Swal.fire({
                    title:'Contraseña incorrecta',
                    text:'Por favor ingrese la contraseña correcta',
                    icon:'error',
                    confirmButtonText:'Ok'
                })
            }

        })
    }


        


    render(){
        return(
            <div className={styles.card}>
                <h2>Registrar Auto</h2>
                {/* divider */}
                <div className={styles.divider}></div>
                <form onSubmit={this.onTrigger}>
                    <div className={styles.form_elements}>
                        <div className={styles.form_group}>
                            <label htmlFor="nombre">Nombre de Arrendador</label>
                            <input type="text" className="form-control" name="nombre" id="nombre" placeholder={this.state.nombre} disabled  />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="marca">Marca</label>
                            <input type="text" className="form-control" name="marca" id="marca" placeholder="Marca" />
                            </div>

                            <div className={styles.form_group}>
                            <label htmlFor="linea">Linea</label>
                            <input type="text" className="form-control" name="linea" id="linea" placeholder="Linea" />
                        </div>
                        <div className={styles.form_group}>
                            <label htmlFor="modelo">Modelo</label>
                            <input type="text" className="form-control" name="modelo" id="modelo" placeholder="Modelo" />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="placa">Placa</label>
                            <input type="text" className="form-control" name="placa" id="placa" placeholder="Placa" />
                            </div>

                        <div className={styles.form_group}>
                            <label htmlFor="precio">Precio / Dia</label>
                            <input type="number" className="form-control" name="precio" id="precio" placeholder="Precio por dia" min="0" step="0.01" />
                        </div>

                        
                        <div className={styles.form_group}>
                            <label htmlFor="foto">Foto</label>
                            <input type="file" className="form-control" name="foto" id="foto" placeholder="Foto" />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="contrasena">Confirmar Contraseña</label>
                            <input type="password" className="form-control" name="contrasena" id="contrasena" placeholder="Contraseña" />
                        </div>

                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.btn_crear}>Registrar Auto</button>
                    </div>
                </form>
            </div>

        );
    }
}