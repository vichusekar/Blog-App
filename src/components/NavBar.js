import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useNavigate } from 'react-router-dom'

function NavBar() {
  let navigate = useNavigate()

  function logout() {
    localStorage.clear()
    navigate('/main')
  }

  return <div className='nav-wrapper'>

    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand style={{cursor:"pointer"}} onClick={() => navigate('/main')}>Blog App</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={() => navigate('/main')}>Home</Nav.Link>
          <Nav.Link onClick={() => navigate('/manage')}>Manage</Nav.Link>
          <Nav.Link onClick={() => navigate('/create')}>New</Nav.Link>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav style={{ marginLeft: '800px' }}>
              {
                localStorage.getItem("user-info") ?
                  <>
                    <Nav>

                      <Nav.Link onClick={logout}>
                        LogOut
                      </Nav.Link>

                    </Nav>
                  </>
                  :
                  <>
                    <Nav.Link onClick={() => navigate('/sign-up')} >SignUp</Nav.Link>
                  </>

              }
            </Nav>
          </Navbar.Collapse>
        </Nav>
      </Container>
    </Navbar>
  </div>
}

export default NavBar