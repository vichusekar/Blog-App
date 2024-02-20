import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useFormik } from 'formik'

function SignIn() {
  let navigate = useNavigate()

  let handleSignin = async (e) => {
    e.preventDefault()

    let data = {
      email: e.target.email.value,
      password: e.target.password.value
    }
    try {
      let res = await axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, data)
      if (res.status === 200) {

        sessionStorage.setItem('token', res.data.token)
        toast.success(res.data.message)
        navigate('/')
      }
    } catch (error) {
      toast.error(error.response.data.error || error.response.data.message)
    }
  }
  const formik = useFormik({
    initialValues: {
        email: "",
        password: "",
    },
    validationSchema: yup.object({
        email: yup.string().matches(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/, 'Enter valid email').required("Required"),
        password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'Enter valid password').required("Required"),

    })
})

  return <>
    <div className='signin-title'>
      <h1>SignIn</h1>
    </div>
    <div className='signin-wrapper'>
      <Form onSubmit={handleSignin}>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name='email' />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" name='password' />
        </Form.Group>

        <p className='f-password' onClick={() => navigate('/forgot-password')}>Forgot password</p>

        <Button variant="primary" type="submit" style={{ borderRadius: '10px', marginLeft: '110px', width: '100px', cursor: 'pointer' }}>
          Submit
        </Button>

      </Form>
    </div>
  </>
}

export default SignIn