import React, { Component } from "react";

import styles from "./styles/SearchCard.module.css";


// import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import { Button, ListGroup } from "react-bootstrap";
export default class HabitacionCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            room_id: this.props.room_id,
            room_name: this.props.room_name,
            hotel_id: this.props.hotel_id,
            hotel_name: this.props.hotel_name,
            country: this.props.country,
            city: this.props.city,
            amount_people: this.props.amount_people,
            price: this.props.price,
            start_date: this.props.start_date,
            ending_date: this.props.ending_date,
            img: this.props.img,
            mode: this.props.mode

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
        var date_start = new Date(this.state.start_date);
        var date_end = new Date(this.state.ending_date);
        //set date
        this.setState({
            start_date: date_start.getDate() + "/" + (date_start.getMonth() + 1) + "/" + date_start.getFullYear(),
            ending_date: date_end.getDate() + "/" + (date_end.getMonth() + 1) + "/" + date_end.getFullYear()
        });
    }
    render() {
        return (


            <Card style={{ width: '14rem' }}>
                <Card.Header><strong>{this.state.city},</strong> {this.state.country}</Card.Header>
                <Card.Img variant="top" src={this.state.img} height={160} width={100} />
                <Card.Body>
                    <Card.Title>{this.state.room_name}</Card.Title>
                    <Card.Text >
                    {this.state.hotel_name}
                        
                    </Card.Text>

                    <ListGroup >
                        <ListGroup.Item variant="primary" className={styles.item}>Personas: {this.state.amount_people}</ListGroup.Item>
                        <ListGroup.Item variant="secondary" className={styles.item}>Precio: ${this.state.price} / Noche</ListGroup.Item>
                        <ListGroup.Item variant="success" className={styles.item}>Fecha de inicio: {this.state.start_date}</ListGroup.Item>
                        <ListGroup.Item variant="danger" className={styles.item}>Fecha de fin: {this.state.ending_date}</ListGroup.Item>
                    </ListGroup>
                    
                </Card.Body>
                {

this.state.mode === "search" ?
    <Card.Footer className="text-muted">
        <Button variant="primary" href={"/Habitacion/id=" + this.state.room_id}>Reservar</Button>
    </Card.Footer>
    : null
}
{

this.state.mode === "dashboard" ?
    <Card.Footer className="text-muted">
        <Button onClick={this.delete} variant="danger" >Eliminar</Button>
        
        <Button onClick={this.editar} variant="warning">Editar</Button>
    </Card.Footer>
    : null
}

            </Card>
        );
    }
}