import React, {Component} from "react";
import styles from "./styles/RegistroGlobal.module.css";
import Swal from "sweetalert2";

export default class RegistroHabitacion extends Component{
    constructor(props){
        super(props);
        this.state={
            hotel : this.props.userName,
        };
        
    };

    componentDidMount(){
        if(this.state.hotel === "" || this.state.hotel === undefined){
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
                <h2>Registrar Habitacion</h2>
                {/* divider */}
                <div className={styles.divider}></div>
                <form>
                    <div className={styles.form_elements}>
                        <div className={styles.form_group}>
                            <label htmlFor="nombre">Nombre de Hotel</label>
                            <input type="text" className="form-control" name="nombre" id="nombre" placeholder={this.state.hotel} disabled/>
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="imagenes">Portada</label>
                            <input type="file" className="form-control" name="Portada" id="imagenes" placeholder="Imagenes"/>
                        </div>
                        <div className={styles.form_group}>
                            <label htmlFor="imagen1">Imagen 1</label>
                            <input type="file" className="form-control" name="imagen1" id="imagen1" placeholder="Imagen1" />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="habitaciones">Habitaciones Disponibles</label>
                            <input type="number" className="form-control" name="habitaciones" id="habitaciones" placeholder="Habitaciones Disponibles" />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="fecha_disponible">Fecha Inicio</label>
                            <input type="date" className="form-control" name="fecha_disponible" id="fecha_disponible" placeholder="Fecha Disponible" />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="fecha_fin">Fecha Fin</label>
                            <input type="date" className="form-control" name="fecha_fin" id="fecha_fin" placeholder="Fecha Fin" />
                        </div>                       
                        
                        <div className={styles.form_group}>
                            <label htmlFor="precio">Precio</label>
                            <input type="number" className="form-control" name="precio" id="precio" placeholder="Precio" min="0" step="0.01"/>
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="contrasena">Contraseña</label>
                            <input type="password" className="form-control" name="contrasena" id="contrasena" placeholder="Contraseña" />
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.btn_regresar}>Volver</button>
                        <button className={styles.btn_crear}>Registrar Habitacion</button>
                    </div>
                </form>
            </div>

        );
    }
}