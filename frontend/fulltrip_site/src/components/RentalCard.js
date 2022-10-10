import React,{Component} from 'react';
import Card from 'react-bootstrap/Card';
import {Button, ListGroup} from "react-bootstrap";

export default class RentalCard extends Component{
    constructor(props){
        super(props);
        this.state ={
            brand: this.props.brand,
            car_rental: this.props.car_rental,
            car_rental_id: this.props.car_rental_id,
            city: this.props.city,
            country: this.props.country,
            date_reservation: this.props.date_reservation,
            end_date: this.props.end_date,
            id_car: this.props.id_car,
            img: this.props.img,
            line: this.props.line,
            model: this.props.model,
            observation: this.props.observation,
            price: this.props.price,
            start_date: this.props.start_date,
            user_id: this.props.user_id,
            mode: this.props.mode,
            email: this.props.email

        }
    }

    componentDidMount(){
        if(this.props.mode === 'service'){
            
        }else if(this.props.mode === 'user'){
            
        }
    }

    

    render(){
        return(
            <Card style={{ width: '14rem' }}>
                <Card.Header style={{color:'#303030'}} >
                    <strong>{this.state.brand} {this.state.line},</strong> {this.state.model}
                </Card.Header>
                <Card.Img variant='top' src={this.state.img} height={160} width={100}/>
                <Card.Body style={{color:'#303030'}}>
                    <Card.Title>{this.state.car_rental}</Card.Title>
                    <Card.Text>🟩Entrega: {this.state.start_date} </Card.Text>
                    <Card.Text>🟥Recepcion: {this.state.end_date} </Card.Text>
                <ListGroup>
                    <ListGroup.Item>Fecha de Reservacion: {this.state.date_reservation}</ListGroup.Item>
                    <ListGroup.Item>Precio: ${this.state.price}</ListGroup.Item>
                    <ListGroup.Item>Observaciones: {this.state.observation === '' ? <p>Sin observaciones</p> : <p>{this.state.observation}</p>}</ListGroup.Item>
                    {
                            (this.state.email ==='' || this.state.email === undefined) ? null: <ListGroup.Item variant="info">Contacto de usuario: {this.state.email}</ListGroup.Item>
                        }
                </ListGroup>
                </Card.Body>

                {
                    this.state.mode === 'service' ?
                    <Card.Footer>
                        <Button variant='primary' size='sm' >Editar</Button>
                        <Button variant='danger' size='sm' >Eliminar</Button>
                    </Card.Footer>
                    :
                    <Card.Footer>
                        {/* review button */}
                        <Button variant='primary' href={'/Auto/Calificar/id='+this.state.id_car}>Calificar</Button>
                    </Card.Footer>
                }

            </Card>
        )
    }
}