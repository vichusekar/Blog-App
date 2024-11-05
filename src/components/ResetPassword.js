import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from "yup";
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from "react-toastify"

function ResetPasword() {
    let [passwordVisible, setPasswordVisible] = useState(false);
    let navigate = useNavigate();
    let params = useParams();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    let handleResetPassword = async (e) => {
        e.preventDefault()

        let data = {
            password: e.target.password.value
        }
        try {
            let res = await axios.post(`${process.env.REACT_APP_API_URL}/reset-password/${params.id}`, data)
            if (res.status === 200) {

                toast.success(res.data.message)
                navigate('/')
            }
        } catch (error) {
            toast.error(error.response.data.error || error.response.data.message)
        }
    }
    const formik = useFormik({
        initialValues: {
            password: ""
        },
        validationSchema: yup.object({
            password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'Example@123').required("Required")

        })
    })
    return <>
        <div className='signup-main'>
            <div className='form-header'>
                <h1>Reset Password</h1>
            </div>
            < div className='form-wrapper'>
                <Form onSubmit={handleResetPassword}>

                    <Form.Group className="mb-3 hovering">
                        <Form.Label>New Password</Form.Label>
                        <div className="password-input-wrapper" style={{ position: 'relative' }}>
                            <Form.Control
                                type={passwordVisible ? 'text' : 'password'}
                                name='password'
                                placeholder="Enter password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            <span onClick={togglePasswordVisibility} className="eye-icon position-absolute top-50 end-0 translate-middle-y me-3">
                                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                            <div className='error'>{formik.errors.password}</div>
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

export default ResetPasword
