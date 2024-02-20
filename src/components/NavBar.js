import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  let navigate = useNavigate()

  // let user = JSON.parse(localStorage.getItem("user-info"))

  return <div className='nav-wrapper'>

    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Blog App</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
          <Nav.Link onClick={() => navigate('/manage')}>Manage</Nav.Link>
          <Nav.Link onClick={() => navigate('/create')}>New</Nav.Link>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav style={{ marginLeft: '800px' }}>
              {/* {
                        localStorage.getItem("user-info") ?
                            <>
                                <Nav>
                                    <NavDropdown title={user && user.name} >
                                        <NavDropdown.Item onClick={Logout}>
                                            LogOut
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </>
                            :
                            <>
                                <Nav.Link onClick={()=>navigate('/sign-up')} >SignUp</Nav.Link>
                            </>

                    } */}
            </Nav>
          </Navbar.Collapse>
        </Nav>
      </Container>
    </Navbar>
  </div>
}

export default NavBar