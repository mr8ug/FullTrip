import React,{Component} from "react";
import Swal from "sweetalert2";
import styles from "./styles/RegistroGlobal.module.css";

export default class RegistroGlobal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            countryList: [],
            cityList: [],
            userType : this.props.userType //para enviar atravez del formulario el userType de servicio que es.
        }


    }



    handlerCountryChange = (e) => {
        e.preventDefault();
        var ciudadSeleccionada = e.target.value;
        // //console.log("selected value",ciudadSeleccionada)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ country: ciudadSeleccionada })
        };

        fetch('https://countriesnow.space/api/v0.1/countries/cities', requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.data){
                    this.setState({ cityList: data.data })
                }else{
                    this.setState({ cityList: [] })
                }
                
            })
            .catch(error => {
                this.setState({ cityList: [] })
            });




        ////console.log(this.state.cityList);

    }

    

    componentDidMount(){
        const requestOptions ={
            method: 'GET',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        };

        fetch('https://countriesnow.space/api/v0.1/countries/capital', requestOptions)
        .then(response => response.json())
        .then(data => {
            if(data.data){
                this.setState({countryList: data.data})
            }else{
                this.setState({countryList: []})
            }
            
        })
        .catch(error => {
            this.setState({countryList: []})
        }
        );


        //deshabilitar boton de enviar
        
    
    }

    sendTrigger = (e) => {
        e.preventDefault();
        var nombre = document.getElementById("nombre").value;
        var correo = document.getElementById("correo").value;
        var pais = document.getElementById("pais").value;
        var ciudad = document.getElementById("ciudad").value;
        var contrasena = document.getElementById("contrasena").value;
        var contrasena2 = document.getElementById("contrasena2").value;
        var userType = '';
        if(this.props.userType === "Hotel"){
            userType = "5";
        }else if(this.props.userType === "Arrendador"){
            userType = "6";
        }else if(this.props.userType === "Aerolinea"){
            userType = "7";
        }

        // //console.log(nombre,correo,pais,ciudad,contrasena,contrasena2,userType);
        
        //check if the passwords are the same
        if(contrasena !== contrasena2){
            Swal.fire({
                title: 'Error',
                text: 'Las contraseñas no coinciden',
                icon: 'error',
                confirmButtonText: 'Ok'

            })
        }else{
            //send
            let formdata = new FormData();
            formdata.append("full_name",nombre);
            formdata.append("email",correo);
            formdata.append("country",pais);
            formdata.append("city",ciudad);
            formdata.append("password",contrasena);
            formdata.append("type_user",parseInt(userType));
            formdata.append('date_birth','2000-01-01');
            formdata.append('nickname',correo)

            fetch(process.env.REACT_APP_API_URL+'signup',{
                method: 'POST',
                body: formdata
            })
            .then(response => response.json())
            .then(data => {
                if(data.status ==='ok'){
                    Swal.fire({
                        title: 'Exito',
                        text: this.state.userType+ ' registrado. Inicie sesión para continuar',
                        icon: 'success',
                        timer: 3000

                    })
                    .then(() => {
                        window.sessionStorage.clear();
                        window.location.href = '/IniciarSesion';
                    })
                }else{
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un error al registrar el '+this.props.userType,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                    //console.log(data);
                }
            })

        }


    }



    render() {
        return (
            <div className={styles.card}>
                <h2>Registrar {this.props.userType}</h2>
                {/* divider */}
                <div className={styles.divider}></div>
                <form onSubmit={this.sendTrigger} id="formulario">
                    <div className={styles.form_elements}>
                        <div className={styles.form_group}>
                            <label htmlFor="nombre">Nombre de {this.props.userType}</label>
                            <input type="text" className="form-control" name="nombre" id="nombre" placeholder={"Nombre de "+ this.props.userType} required  />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="correo">Correo Electrónico</label>
                            <input type="email" className="form-control" name="correo" id="correo" placeholder="Correo Electrónico" required />

                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="pais">Pais</label>
                            <select className="form-control" onChange={this.handlerCountryChange} id="pais" required>
                            {
                                    Object.keys(this.state.countryList).map((key, index) => (
                                        <option key={index} value={this.state.countryList[key].name}>{this.state.countryList[key].name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        

                        

                        
                        <div className={styles.form_group}>
                            <label htmlFor="ciudad">Ciudad</label>
                            
                            <select className="form-control" id="ciudad" placeholder="Seleccione Ciudad">
                                {
                                    Object.keys(this.state.cityList).map((key, index) => (
                                        <option key={index} value={this.state.cityList[key]}>{this.state.cityList[key]}</option>
                                    ))
                                }
                            </select>

                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="contrasena">Contraseña</label>
                            <input type="password" className="form-control" name="contrasena" id="contrasena" placeholder="Contraseña"  required/>
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="contrasena2">Confirmar Contraseña</label>
                            <input type="password" className="form-control" name="contrasena2" id="contrasena2" placeholder="Contraseña" required />
                        </div>


                    </div>
                    <div className={styles.buttons}>
                        {/* <button className={styles.btn_regresar}>Volver</button> */}
                        <button id="botonSend" type='submit' className={styles.btn_crear}>Registrar {this.props.userType}</button>
                    </div>
                </form>
            </div>

        );
    }
}