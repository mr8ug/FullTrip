import React, {Component} from "react";

import styles from "./styles/DashboardGlobal.module.css"



export default class DashboardThirdService extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: this.props.title,
            description: this.props.description,
            image: this.props.image,
            link: this.props.link
        }
    }
    render(){
        return(
            <div className={styles.card}>
                <div className={styles.cardImage}>
                    <img src={this.state.image} alt="Imagen de servicio" />
                </div>
                <div className={styles.cardContent}>
                    <h3>{this.state.title}</h3>
                    <p>{this.state.description}</p>
                    <a href={this.state.link} target="_blank" rel="noreferrer">Ir al servicio</a>
                </div>
            </div>
        );
    }
}
