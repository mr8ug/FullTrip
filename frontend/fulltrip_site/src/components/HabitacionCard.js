import React, { Component } from "react";

import styles from "./styles/SearchCard.module.css";


// import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import { ListGroup } from "react-bootstrap";
export default class HabitacionCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
    render() {
        return (


            <Card style={{ width: '18rem' }}>
                <Card.Header><strong>{this.state.city},</strong> {this.state.country}</Card.Header>
                <Card.Img variant="top" src={this.state.image} />
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
            </Card>
        );
    }
}