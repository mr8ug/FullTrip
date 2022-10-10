import Swal from "sweetalert2";
import React,{Component} from "react";

export default class CerrarSesion extends Component{
    componentDidMount(){
        Swal.fire({title:'Cerrando Sesion',text:'Vuelve pronto.'}).then((result) => {if (result.isConfirmed) {window.location.href = "/";}})
    }

    render(){
        return(
            <div></div>
        );
    }
}