import React, { Component } from 'react';
import styles from "./styles/SearchCard.module.css";

import Card from 'react-bootstrap/Card'

import { Button, ListGroup } from "react-bootstrap";

import no_preview_img from '../images/no_preview_available.jpg'


export default class VueloCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_flight: this.props.id_flight,
            airline_id: this.props.airline_id,
            airline_name: this.props.airline_name,
            price: this.props.price,
            flight_date: this.props.flight_date,
            flight_destination: this.props.flight_destination,
            flight_origin: this.props.flight_origin,
            departure_time: this.props.departure_time,
            available_seat: this.props.available_seat,
            image: '',
        }
    }

    checkIfImageExists(urlToFile, callback) {
        var img = new Image();
        img.src = urlToFile;

        if (img.complete) {
            callback(true);
        } else {
            img.onload = () => {
                callback(true);
            };

            img.onerror = () => {
                callback(false);
            };
        }
    }


    componentDidMount() {
        //fix date
        var date = new Date(this.state.flight_date);
        var date_end = new Date(this.state.flight_date_end);
        this.setState({
            flight_date: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
            flight_date_end: date_end.getDate() + "/" + (date_end.getMonth() + 1) + "/" + date_end.getFullYear()
        });

        //fetch an image

        let pais = this.state.flight_destination.split('-')[0].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        // this.setState({
        //     image: 'https://countryflagsapi.com/png/' + pais
        // })

        this.checkIfImageExists('https://countryflagsapi.com/png/' + pais, (existsImage) => {
            if (existsImage) {
                this.setState({
                    image: 'https://countryflagsapi.com/png/' + pais
                })
            } else {
                this.setState({
                    image: no_preview_img
                })
            }
        });






    }

    render() {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Header><strong>{this.state.flight_origin}</strong> 🛬 {this.state.flight_destination}</Card.Header>

                <Card.Img variant="top" src={this.state.image !== '' ? this.state.image : no_preview_img} alt={this.state.flight_destination} height={160} />

                <Card.Body>
                    <Card.Title>{this.state.airline_name}</Card.Title>
                    <ListGroup>
                        <ListGroup.Item variant='primary' className={styles.item}>Fecha Salida:  {this.state.flight_date}</ListGroup.Item>
                        <ListGroup.Item variant='secondary' className={styles.item}>Precio: ${this.state.price}</ListGroup.Item>
                        <ListGroup.Item variant='info' className={styles.item}>Hora Salida: {this.state.departure_time}</ListGroup.Item>
                        <ListGroup.Item variant='success' className={styles.item}>Asientos Disponibles: {this.state.available_seat}</ListGroup.Item>
                    </ListGroup>

                </Card.Body>
                <Card.Footer className="text-muted">
                    <Button variant="primary" href={"/Vuelo?id=" + this.state.id_flight}>Reservar</Button>
                </Card.Footer>
            </Card>
        )
    }
}