import React, {Component} from "react";



import styles from "../components/styles/ServiceView.module.css";


export default class Habitacion extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: "",
        }
    }

    componentDidMount(){
        this.setState({id: URLSearchParams("id")});


    }



    render(){
        return(
            <div className={styles.jumbotron}>
                <h1>Habitacion</h1> 
                <p>id: {URLSearchParams("id")}</p>
            </div>
        );
    }
}