import React, { Component } from 'react';

//import navbar
import Navbar from './Navbar';
//estilos de header
// import styles from './Header.css';


export default class Header extends Component {
    render() {
        return (
            <header>
                
                <Navbar/>

            </header>
        );
    }
}