import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import * as yup from "yup"
import { useFormik } from 'formik'

function ForgotPassword() {

  let navigate = useNavigate()
  let params = useParams()

  let handleForgotPassword = async (e) => {
    e.preventDefault()

    let data = {
      email: e.target.email.value
    }
    try {
      let res = await axios.post(`${process.env.REACT_APP_API_URL}/forgot-password/${params.id}`, data)
      if (res.status === 200) {
        toast.success(res.data.message)
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error || error.response.data.message)
    }
  }
  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: yup.object({
      email: yup.string().matches(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/, 'Enter valid email').required("Required")

    })
  })
  return <>
    <div className='signup-main'>
      <div className='form-header'>
        <h1>Forgot Password</h1>
      </div>
      < div className='form-wrapper'>
        <Form onSubmit={handleForgotPassword}>

          <Form.Group className="mb-3 hovering" >
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name='email'
              placeholder="Enter registered email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='error'>{formik.errors.email}</div>
            ) : null}
          </Form.Group>

          <Button type="submit" style={{ marginLeft: '50px', width: '220px', color: 'white' }}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  </>
}

export default ForgotPassword