import React, { Component } from "react";
// import styles from "./styles/SearchCard.module.css";

import Card from "react-bootstrap/Card";
import { Button, ListGroup } from "react-bootstrap";


export default class ReservationCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount_people: this.props.amount_people,
            city: this.props.city,
            country: this.props.country,
            end_date_r: this.props.end_date_r,
            ending_date_d: this.props.ending_date_d,
            hotel_id: this.props.hotel_id,
            hotel_name: this.props.hotel_name,
            id_room: this.props.id_room,
            img: this.props.img,
            price: this.props.price,
            reservation_description: this.props.reservation_description,
            room_name: this.props.room_name,
            start_date_d: this.props.start_date_d,
            start_date_r: this.props.start_date_r,
            user_id: this.props.user_id,
            mode: this.props.mode,
            email:this.props.email
        }
    }

    componentDidMount() {
        if (this.props.mode === 'service') {
            //fetch for looking for user email

        } else if (this.props.mode === 'user') {
            //fetch for looking for hotel email

        }
        // console.log(this.state.email)
    }

    render() {
        return (
            <Card style={{ width: '14rem' }}>
                <Card.Header style={{ color: '#303030' }}>
                    <strong>{this.state.city},</strong> {this.state.country}
                </Card.Header>

                <Card.Img variant="top" src={this.state.img} height={160} width={100} />
                <Card.Body style={{ color: '#303030' }}>
                    <Card.Title>{this.state.room_name}
                    </Card.Title>
                    <Card.Text>{this.state.hotel_name}</Card.Text>
                    <ListGroup>

                        <ListGroup.Item>Precio: ${this.state.price} / noche</ListGroup.Item>
                        <ListGroup.Item>Fecha de Reservacion: {this.state.start_date_r} {" al "} {this.state.end_date_r}</ListGroup.Item>
                        <ListGroup.Item variant="warning">Detalles de Reservacion: {this.state.reservation_description}</ListGroup.Item>
                        {
                            (this.state.email ==='' || this.state.email === undefined) ? null: <ListGroup.Item variant="info">Contacto de usuario: {this.state.email}</ListGroup.Item>
                        }
                    </ListGroup>
                </Card.Body>

                <Card.Footer>
                    {
                        this.props.mode === 'service' ?
                            <div>
                                <Button variant="success" href={"/Habitacion/id=" + this.state.id_room}>Ver</Button>
                                <Button variant="danger" >Cancelar Reservacion</Button>
                            </div>

                            :
                            <div>
                                {/* review button */}
                                <Button variant='primary' size='sm' href={'/Habitacion/Calificar/id='+this.state.id_room} >Calificar</Button>
                            </div>


                    }
                </Card.Footer>
            </Card>
        );
    }
}
