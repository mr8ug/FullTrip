import React, {Component} from "react";
import styles from "./styles/RegistroGlobal.module.css";
import CryptoJS from "crypto-js";
// import Swal from "sweetalert2";
// import countryList from "react-select-country-list";

export default class RegistroVuelo extends Component{
    constructor(props){
        super(props);
        this.state={
            usuario: "",
            nombre: "",
            tipo: "",
            id: "",
            
            paisOrigenSeleccionado:'',
            paisDestinoSeleccionado:'',
            ciudadOrigenSeleccionada:'',
            ciudadDestinoSeleccionada:'',
            countryOriginList: [],
            cityOriginList: [],
            countryDestinationList: [],
            cityDestinationList: [],
            

            
        };
        
    };


    componentDidMount(){
        const requestOptions ={
            method: 'GET',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        };

        fetch('https://countriesnow.space/api/v0.1/countries/capital', requestOptions)
        .then(response => response.json())
        .then(data => {
            this.setState({countryOriginList: data.data})
        })
        .catch(error => {
            console.log(error);
        }
        );


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


        // if(this.state.aerolinea === "" || this.state.aerolinea === undefined){
        //     Swal.fire({
        //         title:'Hmm parece que no estas logueado',
        //         text:'Por favor inicia sesion para poder acceder a esta pagina',
        //         icon:'warning',
        //         confirmButtonText:'Ok',
                
        //     }).then(
        //         function (isConfirm){
        //             if(isConfirm){
        //                 window.location.href = "/IniciarSesion";
        //             }
        //         }
        //     )
        // }
    }

    handlerOriginCountryChange = (e) => {
        e.preventDefault();
        var paisSeleccionado = e.target.value;
        // console.log("selected value",ciudadSeleccionada)

        //fetch cities
        
        // console.log("selected value",ciudadSeleccionada)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ country: paisSeleccionado })
        };

        fetch('https://countriesnow.space/api/v0.1/countries/cities', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ cityOriginList: data.data })
            })
            

        this.setState({
            paisOrigenSeleccionado: paisSeleccionado,
            countryDestinationList: this.state.countryOriginList,
            
        })
    }

    handlerOriginCityChange = (e) => {
        e.preventDefault();
        var ciudadSeleccionada = e.target.value;
        // console.log("selected value",ciudadSeleccionada)
        this.setState({
            ciudadOrigenSeleccionada: ciudadSeleccionada,
            // cityDestinationList: this.state.cityOriginList.filter((city) => city !== ciudadSeleccionada)
        })
    }

    handlerDestinationCountryChange = (e) => {
        e.preventDefault();
        var paisSeleccionado = e.target.value;
        
        // console.log("selected value",ciudadSeleccionada)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ country: paisSeleccionado })
        };

        fetch('https://countriesnow.space/api/v0.1/countries/cities', requestOptions)
            .then(response => response.json())
            .then(data => {
                let cityList = data.data;
                let cityListFiltered = cityList.filter((city) => city !== this.state.ciudadOrigenSeleccionada);
                this.setState({ cityDestinationList: cityListFiltered })
            })
    }

    onTrigger = (e) => {
        e.preventDefault();
        console.log("triggered");
    }

    render(){
        
        return(
            <div className={styles.card}>
                <h2>Registrar Vuelo</h2>
                {/* divider */}
                <div className={styles.divider}></div>
                <form onSubmit={this.onTrigger}>
                    <div className={styles.form_elements}>
                        <div className={styles.form_group}>
                            <label htmlFor="nombre_empresa">Nombre de Aerolinea</label>
                            <input type="text" className="form-control" name="nombre_empresa" id="nombre_empresa" placeholder={this.state.nombre} disabled  />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="asientos">Asientos Disponibles </label>
                            <input type="number" className="form-control" name="asientos" id="asientos" placeholder="Asientos Disponibles" min={1} max={300}/>
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="pais_origen">Pais Origen</label>
                            {/* <input type="text" className="form-control" name="origen" id="origen" placeholder="Origen" /> */}
                            <select className="form-control" id="pais_origen" name="pais_origen" onChange={this.handlerOriginCountryChange}>
                            {
                                    Object.keys(this.state.countryOriginList).map((key, index) => (
                                        <option key={index} value={this.state.countryOriginList[key].name}>{this.state.countryOriginList[key].name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="ciudad_origen">Ciudad Origen</label>
                            {/* <input type="text" className="form-control" name="origen" id="origen" placeholder="Origen" /> */}
                            <select className="form-control" id="ciudad_origen" name="ciudad_origen" onChange={this.handlerOriginCityChange}>
                            {
                                    Object.keys(this.state.cityOriginList).map((key, index) => (
                                        <option key={index} value={this.state.cityOriginList[key]}>{this.state.cityOriginList[key]}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="pais_destino">Pais Destino</label>
                            {/* <input type="text" className="form-control" name="destino" id="destino" placeholder="Destino" /> */}
                            <select className="form-control" id="pais_destino" name="pais_destino" onChange={this.handlerDestinationCountryChange} >
                            {
                                    Object.keys(this.state.countryDestinationList).map((key, index) => (
                                        
                                        <option key={index} value={this.state.countryDestinationList[key].name}>{this.state.countryDestinationList[key].name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="ciudad_destino">Ciudad Destino</label>
                            <select className="form-control" id="ciudad_destino" name="ciudad_destino" >
                            {
                                    Object.keys(this.state.cityDestinationList).map((key, index) => (
                                        <option key={index} value={this.state.cityDestinationList[key]}>{this.state.cityDestinationList[key]}</option>
                                    ))
                            }
                            </select>
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="fecha">Fecha</label>
                            <input type="date" className="form-control" name="fecha" id="fecha" placeholder="Fecha" />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="hora">Hora</label>
                            <input type="time" className="form-control" name="hora" id="hora" placeholder="Hora" />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="precio">Precio</label>
                            <input type="number" className="form-control" name="precio" id="precio" placeholder="Precio" min="0" step="0.01"/>
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="contrasena">Confirmar Contraseña</label>
                            <input type="password" className="form-control" name="contrasena" id="contrasena" placeholder="Confirmar Contraseña" />

                        </div>

                        


                    </div>
                    <div className={styles.buttons}>
                        
                        <button className={styles.btn_crear}>Registrar Vuelo</button>
                    </div>
                </form>
            </div>

        );
    }
}