import React, {Component} from "react";
import styles from "./styles/RegistroGlobal.module.css";

import Swal from "sweetalert2";
// import countryList from "react-select-country-list";

export default class RegistroVuelo extends Component{
    constructor(props){
        super(props);
        this.state={
            aerolinea : this.props.userName,
            countryList: [],
            paisSeleccionado:'',
            destinationList:[],
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
            this.setState({countryList: data.data})
        })
        .catch(error => {
            console.log(error);
        }
        );

        if(this.state.aerolinea === "" || this.state.aerolinea === undefined){
            Swal.fire({
                title:'Hmm parece que no estas logueado',
                text:'Por favor inicia sesion para poder acceder a esta pagina',
                icon:'warning',
                confirmButtonText:'Ok',
                
            }).then(
                function (isConfirm){
                    if(isConfirm){
                        window.location.href = "/IniciarSesion";
                    }
                }
            )
        }
    }

    handlerCountryChange = (e) => {
        e.preventDefault();
        var ciudadSeleccionada = e.target.value;
        // console.log("selected value",ciudadSeleccionada)
        this.setState({
            paisSeleccionado: ciudadSeleccionada,
            destinationList: this.state.countryList.filter((country) => country.name !== ciudadSeleccionada)
        })
    }

    render(){
        
        return(
            <div className={styles.card}>
                <h2>Registrar Vuelo</h2>
                {/* divider */}
                <div className={styles.divider}></div>
                <form>
                    <div className={styles.form_elements}>
                        <div className={styles.form_group}>
                            <label htmlFor="nombre">Nombre de Aerolinea</label>
                            <input type="text" className="form-control" name="nombre" id="nombre" placeholder={this.state.aerolinea} disabled  />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="asientos">Asientos Disponibles </label>
                            <input type="number" className="form-control" name="asientos" id="asientos" placeholder="Asientos Disponibles" min={1} max={300}/>
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="origen">Origen</label>
                            {/* <input type="text" className="form-control" name="origen" id="origen" placeholder="Origen" /> */}
                            <select className="form-control" id="origen" name="origen" onChange={this.handlerCountryChange}>
                            {
                                    Object.keys(this.state.countryList).map((key, index) => (
                                        <option key={index} value={this.state.countryList[key].name}>{this.state.countryList[key].name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="destino">Destino</label>
                            {/* <input type="text" className="form-control" name="destino" id="destino" placeholder="Destino" /> */}
                            <select className="form-control" id="destino" name="destino" >
                            {
                                    Object.keys(this.state.destinationList).map((key, index) => (
                                        
                                        <option key={index} value={this.state.destinationList[key].name}>{this.state.destinationList[key].name}</option>
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
                        <button className={styles.btn_regresar}>Volver</button>
                        <button className={styles.btn_crear}>Registrar Vuelo</button>
                    </div>
                </form>
            </div>

        );
    }
}