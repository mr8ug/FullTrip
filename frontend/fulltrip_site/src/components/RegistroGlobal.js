import React,{Component} from "react";
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
        // console.log("selected value",ciudadSeleccionada)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ country: ciudadSeleccionada })
        };

        fetch('https://countriesnow.space/api/v0.1/countries/cities', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ cityList: data.data })
            })
            .catch(error => {
                console.log(error);
            });




        //console.log(this.state.cityList);

    }

    

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


    }
    render() {
        return (
            <div className={styles.card}>
                <h2>Registrar {this.props.userType}</h2>
                {/* divider */}
                <div className={styles.divider}></div>
                <form>
                    <div className={styles.form_elements}>
                        <div className={styles.form_group}>
                            <label htmlFor="nombre">Nombre de {this.props.userType}</label>
                            <input type="text" className="form-control" name="nombre" id="nombre" placeholder={"Nombre de "+ this.props.userType}  />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="correo">Correo Electrónico</label>
                            <input type="email" className="form-control" name="correo" id="correo" placeholder="Correo Electrónico" />

                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="pais">Pais</label>
                            <select className="form-control" onChange={this.handlerCountryChange} id="pais">
                            {
                                    Object.keys(this.state.countryList).map((key, index) => (
                                        <option key={index} value={this.state.countryList[key].name}>{this.state.countryList[key].name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        

                        <div className={styles.form_group}>
                            <label htmlFor="contrasena">Contraseña</label>
                            <input type="password" className="form-control" name="contrasena" id="contrasena" placeholder="Contraseña" />
                        </div>

                        
                        <div className={styles.form_group}>
                            <label htmlFor="ciudad">Ciudad</label>
                            
                            <select className="form-control" id="ciudad" placeholder="Seleccione Pais">
                                {
                                    Object.keys(this.state.cityList).map((key, index) => (
                                        <option key={index} value={this.state.cityList[key]}>{this.state.cityList[key]}</option>
                                    ))
                                }
                            </select>

                        </div>

                        

                        <div className={styles.form_group}>
                            <label htmlFor="contrasena2">Confirmar Contraseña</label>
                            <input type="password" className="form-control" name="contrasena2" id="contrasena2" placeholder="Contraseña" />
                        </div>


                    </div>
                    <div className={styles.buttons}>
                        {/* <button className={styles.btn_regresar}>Volver</button> */}
                        <button className={styles.btn_crear}>Registrar {this.props.userType}</button>
                    </div>
                </form>
            </div>

        );
    }
}