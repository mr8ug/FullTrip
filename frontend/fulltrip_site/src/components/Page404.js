import React, {Component} from "react";
// import { redirect } from "react-router-dom";

import styles from "../components/styles/Page404.module.css";


import image from "../images/404 Error-bro.svg"




export default class Page404 extends Component {
    constructor(props){
        super(props);
        this.state = {
            tiempo: "Te sacaremos de aquí en 5 segundos"
        }
    }
    
    //redirect on timeout to index
    componentDidMount(){
        setTimeout(() => {
            
            //make a clock of 5 seconds
            this.setState({
                tiempo: "Te sacaremos de aquí en 4 segundos"
            });
            setTimeout(() => {
                this.setState({
                    tiempo: "Te sacaremos de aquí en 3 segundos"
                });
                setTimeout(() => {
                    this.setState({
                        tiempo: "Te sacaremos de aquí en 2 segundos"
                    });
                    setTimeout(() => {
                        this.setState({
                            tiempo: "Bon voyage !"
                        });
                        setTimeout(() => {
                            window.location.href = "/";
                            
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);

    }
    render(){
        return(
            <div className={styles.hidescroll}>
                <h1>{this.state.tiempo}</h1> 
                <img className={styles.imagen} src={image} alt="404 error"/>
                
                

            </div>
        );
    }
}