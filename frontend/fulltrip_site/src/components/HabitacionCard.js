import React, { Component } from "react";

import styles from "./styles/SearchCard.module.css";


// import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import { Button, ListGroup } from "react-bootstrap";
export default class HabitacionCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            hotel: this.props.title,
            description: this.props.description,
            country: this.props.country,
            city: this.props.city,
            persons: this.props.persons,
            price: this.props.price,
            date_start: this.props.date_start,
            date_end: this.props.date_end,
            image: this.props.image,

        }
    }

    reservaHabitacion = () => {
        //go to /Registrarse with window
        //set parameters for url
        var url = "/Habitacion?id=" +this.state.id;
        setTimeout(() => {
            window.location.href = url;
        }
            , 500); 

    }

    componentDidMount() {
        //parse date
        var date_start = new Date(this.state.date_start);
        var date_end = new Date(this.state.date_end);
        //set date
        this.setState({
            date_start: date_start.getDate() + "/" + (date_start.getMonth() + 1) + "/" + date_start.getFullYear(),
            date_end: date_end.getDate() + "/" + (date_end.getMonth() + 1) + "/" + date_end.getFullYear()
        });
    }
    render() {
        return (


            <Card style={{ width: '18rem' }}>
                <Card.Header><strong>{this.state.city},</strong> {this.state.country}</Card.Header>
                <Card.Img variant="top" src={this.state.image} height={160} width={100} />
                <Card.Body>
                    <Card.Title>{this.state.hotel}</Card.Title>
                    <Card.Text >
                        {this.state.description}
                        
                    </Card.Text>

                    <ListGroup >
                        <ListGroup.Item variant="primary" className={styles.item}>Personas: {this.state.persons}</ListGroup.Item>
                        <ListGroup.Item variant="secondary" className={styles.item}>Precio: ${this.state.price}</ListGroup.Item>
                        <ListGroup.Item variant="success" className={styles.item}>Fecha de inicio: {this.state.date_start}</ListGroup.Item>
                        <ListGroup.Item variant="danger" className={styles.item}>Fecha de fin: {this.state.date_end}</ListGroup.Item>
                    </ListGroup>
                    
                </Card.Body>
                <Card.Footer className="text-muted">
                    <Button variant="primary" href={"/Habitacion?id="+this.state.id}>Reservar</Button>
                </Card.Footer>

            </Card>
        );
    }
}