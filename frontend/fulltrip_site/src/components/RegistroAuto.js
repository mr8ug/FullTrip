import React, {Component} from "react";
import styles from "./styles/RegistroGlobal.module.css";

import Swal from 'sweetalert2';


export default class RegistroAuto extends Component{
    constructor(props){
        super(props);
        this.state={
            arrendador : this.props.userName,
        };
        
    };

    componentDidMount(){
        if(this.state.arrendador === "" || this.state.arrendador === undefined){
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

        


    render(){
        return(
            <div className={styles.card}>
                <h2>Registrar Auto</h2>
                {/* divider */}
                <div className={styles.divider}></div>
                
                    <div className={styles.form_elements}>
                        <div className={styles.form_group}>
                            <label htmlFor="nombre">Nombre de Arrendador</label>
                            <input type="text" className="form-control" name="nombre" id="nombre" placeholder={this.state.arrendador} disabled  />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="marca">Marca</label>
                            <input type="text" className="form-control" name="marca" id="marca" placeholder="Marca" />
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
                            <label htmlFor="precio">Precio</label>
                            <input type="number" className="form-control" name="precio" id="precio" placeholder="Precio" min="0" step="0.01" />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="color">Color</label>
                            <input type="text" className="form-control" name="color" id="color" placeholder="Color" />
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
                        <button className={styles.btn_regresar}>Volver</button>
                        <button className={styles.btn_crear}>Registrar Auto</button>
                    </div>
                
            </div>

        );
    }
}