import React, {Component} from "react";
import Card from "react-bootstrap/Card";
import { ListGroup} from "react-bootstrap";
import review from '../images/review.png';
export default class ReviewCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            description: this.props.description,
            type_service_id: this.props.type_service_id,
            email:'',

            opinion:{
                id_servicio:'',
                comentario:''
            },

            datos_servicio:{
                tipo_producto:'',
                nombre_producto:'',
                descripcion_producto:'',

            }
        

            //1 para habitacion, 2 para vehiculo y 3 para venta de boletos
        }
    }

    componentDidMount(){
        

        //parse de descripcion
        try{
            var descripcion = this.state.description;
            var descripcion_parseada = JSON.parse(descripcion);
            if((descripcion_parseada.opinion) && (descripcion_parseada.opinion.service_id !== '')){
                
                this.setState({
                    opinion:{
                        id_servicio:descripcion_parseada.opinion.service_id,
                        comentario:descripcion_parseada.opinion.service_review
                    }
                })
    
                //fetch de id de habitacion
                let formData = new FormData();
                formData.append('id', parseInt(descripcion_parseada.opinion.service_id));
    
                if(this.state.type_service_id === 1){
                    this.setState({
                        datos_servicio:{
                            tipo_producto:'Habitacion',
                        }
                    })
                    
                    fetch('http://localhost:4000/api/info_room',{
                        method: 'POST',
                        body: formData
                    })
                    .then(res => res.json())
                    .then(data => {
                        if(data.room){
                            this.setState({
                                datos_servicio:{
                                    tipo_producto:'Habitacion',
                                    nombre_producto:data.room.room_name,
                                    descripcion_producto:data.room.hotel_name + ' - ' +data.room.city+' , '+data.room.country 
                                }
                            })
                        }
                    })
        
                }else if(this.state.type_service_id === 2){
                    this.setState({
                        datos_servicio:{
                            tipo_producto:'Vehiculo',
                        }
                    })

                    fetch('http://localhost:4000/api/info_car',{
                        method: 'POST',
                        body: formData
                    })
                    .then(res => res.json())
                    .then(data => {
                        if(data.car){
                            this.setState({
                                datos_servicio:{
                                    tipo_producto:'Vehiculo',
                                    nombre_producto:data.car.brand + ' ' +data.car.line+' '+data.car.model ,
                                    descripcion_producto: data.car.car_rental_name + ' - ' +data.car.city+' , '+data.car.country
                                }
                            })
                        }
                    })
                }else if(this.state.type_service_id === 3){
                    this.setState({
                        datos_servicio:{
                            tipo_producto:'Boleto',
                        }
                    })

                    fetch('http://localhost:4000/api/info_flight',{
                        method: 'POST',
                        body: formData
                    })
                    .then(res => res.json())
                    .then(data => {
                        if(data.flight){
                            // console.log(data.flight)
                            this.setState({
                                datos_servicio:{
                                    tipo_producto:'Boleto',
                                    nombre_producto:data.flight.airline_name,
                                    descripcion_producto: data.flight.origin_flight+' ✈️ '+data.flight.flight_destination
                                }
                            })
                        }
                    })

                }
            }
            
        }catch(e){
            this.setState({
                opinion:{
                    id_servicio:'Sin informacion',
                    comentario:this.state.description
                },

                datos_servicio:{
                    tipo_producto:'Sin informacion',
                    nombre_producto:'Sin informacion',
                    descripcion_producto:'Sin informacion'
                }
            })
        }

        
        

        

        


    }

    render(){
        return(
            <Card style={{ width: '14rem' }}>
                <Card.Img src={review} variant={'bottom'} height={160} />
                <Card.Header style={{ color: '#303030' }}>
                    <strong>{this.state.datos_servicio.tipo_producto.toUpperCase()}</strong>
                </Card.Header>

                <Card.Body style={{ color: '#303030' }}>
                    <Card.Title>{this.state.datos_servicio.nombre_producto}</Card.Title>
                    <Card.Text>{this.state.datos_servicio.descripcion_producto}</Card.Text>
                </Card.Body>
                <ListGroup>
                    <ListGroup.Item variant='primary'  >{this.state.opinion.comentario}</ListGroup.Item>
                </ListGroup>
                
            </Card>
        )
    }
}