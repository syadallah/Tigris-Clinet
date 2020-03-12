import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link style={{ color: '#fff' }}href="#change-password">Change Password</Nav.Link>
    <Nav.Link style={{ color: '#fff' }}href="#sign-out">Sign Out</Nav.Link>
    <Nav.Link style={{ color: '#fff' }}href="#create-product">Add Product</Nav.Link>
    <Nav.Link style={{ color: '#fff' }}href="#my-store">My Store</Nav.Link>
    <Nav.Link style={{ color: '#fff' }}href="#products">Start Shopping</Nav.Link>

  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link style={{ color: '#fff' }}href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link style={{ color: '#fff' }}href="#sign-in">Sign In</Nav.Link>
    <Nav.Link style={{ color: '#fff' }}href="#/">Home</Nav.Link>
  </Fragment>

)

const Header = ({ user }) => (
  <Navbar bg="dark" variant="light" expand="md">
    <Navbar.Brand href="#">
      Tigris
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2" style={{ color: '#fff' }}>Welcome, {user.email}</span>}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
