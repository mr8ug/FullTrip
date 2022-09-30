import React, {Component} from 'react';

// import Swal from 'sweetalert2';
import styles from './styles/DashboardGlobal.module.css';


import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';



export default class DashboardUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: this.props.userName,
            examplecards: [
                //list example cards
                
            ],
        }

        
    }

    // componentDidMount(){
    //     if(this.state.user === "" || this.state.user === undefined){
    //         Swal.fire({
    //             title:'Hmm parece que no estas logueado',
    //             text:'Por favor inicia sesion para poder acceder a esta pagina',
    //             icon:'warning',
    //             confirmButtonText:'Ok',
                
    //         }).then(
    //             function (isConfirm){
    //                 if(isConfirm){
    //                     window.location.href = "/IniciarSesion";
    //                 }
    //             }
    //         )
    //     }
    // }

    render() {
        return (
            <div className={styles.dashboard_user}>
                <div className={styles.jumbotron}>
                    <h1 >Hola, {this.state.user}!</h1>
                    <p className={styles.hand}> &#128075;</p>
                    <p >Es un placer verte de nuevo.</p>
                </div>

                <Tabs className={styles.tabs}
                    defaultActiveKey="profile"
                    id="fill-tabs"
                    
                    justify
                    //list all variants
                    variant='tabs'
                    
                    // pills
                    // fill
                    // justify
                    // vertical
                    // nav-justified
                    // nav-fill
                    // nav
                >
                    <Tab className={styles.tabs} eventKey="profile" title="Perfil">
                        <div className={styles.tab_content}>
                            <h1>Perfil</h1>
                            <p>En esta seccion podras ver tu informacion personal</p>
                        </div>
                    </Tab>
                    <Tab eventKey="reservas" title="Mis Reservas" bg="dark" variant='dark'>
                        <div className={styles.tab_content}>
                            <h1>Reservas</h1>
                            <p>En esta seccion podras ver tus reservas</p>
                        </div>
                    </Tab>

                    <Tab eventKey="alquileres" title="Mis Alquileres">
                        <div className={styles.tab_content}>
                            <h1>Alquileres</h1>
                            <p>En esta seccion podras ver tus vehiculos alquilados</p>
                        </div>
                    </Tab>

                    <Tab eventKey="vuelos" title="Mis Vuelos">
                        <div className={styles.tab_content}>
                            <h1>Vuelos</h1>
                            <p>En esta seccion podras ver tus vuelos</p>
                        </div>
                    </Tab>

                    <Tab eventKey="reviews" title="Mis Reseñas">
                        <div className={styles.tab_content}>
                            <h1>Reseñas</h1>
                            <p>En esta seccion podras ver y crear reseñas</p>
                        </div>
                    </Tab>


                </Tabs>

                <Tab.Container id="left-tabs-example" defaultActiveKey="first" variant="dark">
                    <Row>
                        <Col>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Tab 1</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Tab 2</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    Tab 1 content
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    Tab 2 content
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>

            </div>
        );
    }
}