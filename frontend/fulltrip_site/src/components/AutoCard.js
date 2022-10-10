import React, { Component } from 'react';
import styles from "./styles/SearchCard.module.css";

import Card from 'react-bootstrap/Card'

import { Button, ListGroup } from "react-bootstrap";

export default class AutoCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            line: this.props.line,
            model: this.props.model,
            brand: this.props.brand,
            price: this.props.price,
            country: this.props.country,
            city: this.props.city,
            car_rental: this.props.car_rental,
            car_rental_id: this.props.car_rental_id,
            img: this.props.img,
            mode: this.props.mode,
            

        }
    }


    componentDidMount() {
        // console.log('type of price' + typeof (this.state.price));
    }

    delete = () => {
        //fetch para eliminar por id
    }

    editar = () => {
        //fetch para editar por id
    }


    render() {
        return (
            <Card style={{ width: '14rem' }}>
                <Card.Header><strong>{this.state.city},</strong> {this.state.country}</Card.Header>
                <Card.Img variant="top" src={this.state.img} height={160} width={100} />
                <Card.Body>
                    <Card.Title>{this.state.brand} - {this.state.line}</Card.Title>
                    <Card.Text >
                        {this.state.car_rental}
                    </Card.Text>
                    <ListGroup>
                        <ListGroup.Item variant='primary' className={styles.item}>Modelo:  {this.state.model}</ListGroup.Item>
                        <ListGroup.Item variant='secondary' className={styles.item}>Precio: ${this.state.price} / Dia</ListGroup.Item>
                        
                    </ListGroup>
                </Card.Body>

                {

                    this.state.mode === "search" ?
                        <Card.Footer className="text-muted">
                            <Button variant="primary" href={"/Auto/id=" + this.state.id}>Reservar</Button>
                        </Card.Footer>
                        : null
                }
                {

                    this.state.mode === "dashboard" ?
                        <Card.Footer className="text-muted">
                            <Button onClick={this.delete} variant="danger" >Eliminar</Button>
                            
                            <Button href={'/Auto/id='+this.state.id} variant="success">Ver</Button>
                        </Card.Footer>
                        : null
                }



            </Card>



        );
    }
}