import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import '../style/style.css';

export class Navigation extends Component{
 render(){
    return (
    <Navbar className='nav p-3' expand="lg">
        <Navbar.Toggle aria-controls='basic-navbar-nav'/>
        <Navbar.Collapse id='basic-navbar-nav'>
        <Nav>
            <NavLink onClick={event =>  window.location.href='./home'} className='d-inline navlinks p-2  text-black' to="/">
                Home
            </NavLink>
            <NavLink onClick={event =>  window.location.href='./cars'} className='d-inline navlinks p-2 text-black' to="/cars" >
                Cars
            </NavLink>
            <NavLink onClick={event =>  window.location.href='./carcategory'}  className='d-inline navlinks p-2 text-black' to="/carcategory">
                CarCategory
            </NavLink>

        </Nav>

        </Navbar.Collapse>
        

        <button onClick={event =>  window.location.href='./'} className='d-inline p-3 bg-primary navbutton border-0 text-white' to="/carcategory">
            Login
            </button>
            <button onClick={event =>  window.location.href='./register'} className='d-inline p-3 bg-primary navbutton border-0 text-white' to="/carcategory">
            Register
            </button>
    </Navbar>      
    )
 }

}
