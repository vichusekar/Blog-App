import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import * as yup from "yup"
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { toast } from "react-toastify"

function SignIn() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: yup.object({
      email: yup.string().matches(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/, 'Enter valid email').required("Required"),
      password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'Example@123').required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, values)
        if (res.status === 200) {
          toast.success(res.data.message)
          localStorage.setItem("user-info", JSON.stringify(res.data.user))
          navigate('/')
        }
      } catch (error) {
        toast.error(error.response?.data?.error || error.response?.data?.message)
      }
    }
  })

  return (
    <div className='signup-main'>
      <div className='form-header'>
        <h1>Sign In</h1>
      </div>
      <div className='form-wrapper'>
        <Form onSubmit={formik.handleSubmit}>

          <Form.Group className="mb-3 hovering">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name='email'
              placeholder="Enter email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='error'>{formik.errors.email}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3 hovering">
            <Form.Label>Password</Form.Label>
            <div className="password-input-wrapper" style={{ position: 'relative' }}>
              <Form.Control
                type={passwordVisible ? 'text' : 'password'}
                name='password'
                placeholder="Enter password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <span onClick={togglePasswordVisibility} className="eye-icon position-absolute top-50 end-0 translate-middle-y me-3" style={{ cursor: 'pointer' }}>
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className='error'>{formik.errors.password}</div>
            ) : null}
          </Form.Group>

          <p onClick={() => navigate("/forgot-password")} style={{ color: "blue", textDecoration: "underline", marginLeft: "190px", cursor: "pointer" }}>
            Forgot Password ?
          </p>
          <Button type="submit" style={{ marginLeft: '50px', width: '220px', color: 'white' }}>
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default SignIn
