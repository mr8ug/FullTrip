import React, {Component} from 'react';
import styles from "./styles/SearchCard.module.css";

import Card from 'react-bootstrap/Card'

import {Button, ListGroup} from "react-bootstrap";

export default class VueloCard extends Component{
    constructor(props){
        super(props);
        this.state ={
            id_flight: this.props.id_flight,
            airline_id: this.props.airline_id,
            airline_name: this.props.airline_name,
            price: this.props.price,
            flight_date: this.props.flight_date,
            flight_date_end: this.props.flight_date_end,
            flight_destination: this.props.flight_destination,
            flight_origin: this.props.flight_origin,
            flight_time: this.props.flight_time,
        }
    }

    componentDidMount(){
        //fix date
        var date = new Date(this.state.flight_date);
        var date_end = new Date(this.state.flight_date_end);
        this.setState({
            flight_date: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
            flight_date_end: date_end.getDate() + "/" + (date_end.getMonth() + 1) + "/" + date_end.getFullYear()
        });
    }

    render(){
        return(
            <Card style={{ width: '18rem' }}>
                <Card.Header><strong>{this.state.flight_origin}</strong>🛬{this.state.flight_destination}</Card.Header>
                <Card.Body>
                    <Card.Title>{this.state.airline_name}</Card.Title>
                    <ListGroup>
                        <ListGroup.Item variant='primary' className={styles.item}>Fecha:  {this.state.flight_date}</ListGroup.Item>
                        <ListGroup.Item  variant='secondary' className={styles.item}>Precio: ${this.state.price}</ListGroup.Item>
                        <ListGroup.Item  variant='info' className={styles.item}>Hora: {this.state.flight_time}</ListGroup.Item>
                    </ListGroup>

                </Card.Body>
                <Card.Footer className="text-muted">
                    <Button variant="primary" href={"/Vuelo?id=" + this.state.id_flight}>Reservar</Button>
                </Card.Footer>
            </Card>
        )
    }
}