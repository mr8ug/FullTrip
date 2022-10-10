import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';

import React, { Component } from 'react';


import { NavDropdown } from 'react-bootstrap';

class NavbarBootrap extends Component {
    // let paginaActual = getElementById(pagina);
    // paginaActual.style.fontWeight = "bold";
    // const expand = "md";
    constructor(props) {
        super(props);
        this.state = {
            expand: 'sm',
        }



    }

    componentDidUpdate() {
        // console.log("TipoPagina",this.props.pagina);
        if(this.props.pagina) {

            try{
            let paginaActual = document.getElementById(this.props.pagina);
            paginaActual.style.transition = "all 0.5s ease";
            paginaActual.style.borderBottom = "3px solid #ffc107";
            paginaActual.style.fontWeight = "bold";
            }catch(e){
                
                
            }
            
        }

        
        

    }

    render() {
        return (
            <div>
                <Navbar key={this.state.expand} bg="light" variant='light' expand={this.state.expand}>
                    <Container fluid>

                        <Navbar.Brand href="/Inicio">
                            <strong>Full</strong>Trip
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${this.state.expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${this.state.expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${this.state.expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${this.state.expand}`}>
                                    <strong>Full</strong>Trip
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body >
                                <Nav className='justify-content-start flex-grow-1 pe-3' >
                                    <Nav.Link href="/Inicio" id="inicio">Inicio</Nav.Link>
                                    <Nav.Link href="/Hoteles" id='hoteles'>Hoteles</Nav.Link>
                                    <Nav.Link href="/Autos" id='autos'>Arrendadores</Nav.Link>
                                    <Nav.Link href="/Aerolineas" id='aerolineas'>Aerolineas</Nav.Link>
                                

                                {/* Si el usuario esta logueado */}
                                {
                                    this.props.user_logged ? (
                                        <div>
                                            <NavDropdown title="Cuenta" className='justify-content-end flex-grow-2 pe-3'>
                                                <NavDropdown.Item href="/Perfil" id="perfil" >Perfil</NavDropdown.Item>
                                                <NavDropdown.Item href="/CerrarSesion" id='cerrarSesion'>Cerrar Sesion</NavDropdown.Item>
                                            </NavDropdown>
                                        </div>
                                    ) : (
                                        <div>
                                            <NavDropdown title="Acceder" className='justify-content-end flex-grow-2 pe-3' >
                                                <NavDropdown.Item href="/IniciarSesion" id="iniciarSesion" >Iniciar Sesion</NavDropdown.Item>
                                                <NavDropdown.Item href="/Registrarse"  id='registrarse' >Registrarse</NavDropdown.Item>
                                            </NavDropdown>
                                        </div>
                                    )
                                }

                                </Nav>

                                <Form className='d-flex'>
                                    <Form.Control
                                        type="search"
                                        placeholder="Que estas buscando?"
                                        className="me-2"
                                        aria-label="Search"
                                    />
                                    <Button variant="outline-success">Buscar</Button>
                                </Form>

                                

                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            </div>
        );
    }

}

export default NavbarBootrap;