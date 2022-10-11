import React, {Component} from 'react';	
import Card from 'react-bootstrap/Card';
import {Button, ListGroup} from "react-bootstrap";
import no_img from '../images/vuelos.png'

export default class FlightCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            airline_id: this.props.airline_id,
            airline_name: this.props.airline_name,
            date_reservation: this.props.date_reservation,
            departure_time: this.props.departure_time,
            flight_date: this.props.flight_date,
            flight_destination: this.props.flight_destination,
            flight_origin: this.props.flight_origin,
            id_flight: this.props.id_flight,
            price: this.props.price,
            return_date: this.props.return_date,
            user_id: this.props.user_id,
            mode:this.props.mode,
            email:this.props.email
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
                    <strong>{this.state.flight_origin},</strong> {this.state.flight_destination}
                </Card.Header>

                <Card.Img variant='top' src={no_img} height={160} width={100}/>
                <Card.Body style={{color:'#303030'}}>
                    <Card.Title>{this.state.airline_name}</Card.Title>
                    <Card.Text>✈️ {this.state.flight_date} | ⌚ {this.state.departure_time} </Card.Text>
                    <ListGroup>
                        <ListGroup.Item>Fecha de Reservacion: {this.state.date_reservation}</ListGroup.Item>
                        {/* <ListGroup.Item>Hora de Salida: {this.state.departure_time}</ListGroup.Item> */}
                        <ListGroup.Item>Precio: ${this.state.price}</ListGroup.Item>
                        
                        
                    
                    
                        {
                            this.state.return_date === "0000-00-00" ? 
                            <ListGroup.Item variant='success'>Regreso Programado: Boleto Solo Ida</ListGroup.Item>
                            : <ListGroup.Item variant='success'>Regreso Programado:  {this.state.return_date}</ListGroup.Item>
                        }
                        {/* <ListGroup.Item>Fecha de Regreso: {this.state.return_date}</ListGroup.Item> */}
                        {
                            (this.state.email ==='' || this.state.email === undefined) ? null: <ListGroup.Item variant="info">Contacto de usuario: {this.state.email}</ListGroup.Item>
                        }
                    </ListGroup>
                </Card.Body>

                {
                    this.state.mode === 'service' ?
                    <Card.Footer>
                        <Button variant='success' size='sm' href={'/Vuelo/id='+this.state.id_flight} >Ver</Button>
                        <Button variant='danger' size='sm' >Eliminar</Button>
                    </Card.Footer>
                    : 
                    <Card.Footer>
                        {/* review button */}
                        <Button variant='primary' size='sm' href={'/Vuelo/Calificar/id='+this.state.id_flight} >Calificar</Button>
                    </Card.Footer>
                }
                
            </Card>
        )
    }
}