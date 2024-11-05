// import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import * as yup from "yup";
// import { useFormik } from 'formik';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { toast } from "react-toastify"

// function SignUp() {
//     let [passwordVisible, setPasswordVisible] = useState(false);
//     let navigate = useNavigate();

//     const togglePasswordVisibility = () => {
//         setPasswordVisible(!passwordVisible);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         let data = {
//             name: e.target.name.value,
//             email: e.target.email.value,
//             password: e.target.password.value
//         };

//         try {
//             let res = await axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, data);
//             if (res.status === 200) {
//                 localStorage.setItem("user-info", JSON.stringify(res.data.user));
//                 toast.success(res.data.message)
//                 navigate('/');
//             }
//         } catch (error) {
//             console.log(error)
//             toast.error(error.response.data.message || error.response.data.error)
//         }
//     };

//     const formik = useFormik({
//         initialValues: {
//             name: "",
//             email: "",
//             password: "",
//         },
//         validationSchema: yup.object({
//             name: yup.string().required("Required"),
//             email: yup.string().matches(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/, 'Enter valid email').required("Required"),
//             password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'Enter valid password').required("Required"),
//         })
//     });

//     return (
//         <div className='signup-main'>
//             <div className='form-header'>
//                 <h1>Sign Up</h1>
//             </div>
//             <div className='form-wrapper'>
//                 <Form onSubmit={handleSubmit}>
//                     <Form.Group className="mb-3 hovering">
//                         <Form.Label>Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name='name'
//                             placeholder="Enter name"
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.name}
//                         />
//                         {formik.touched.name && formik.errors.name ? (
//                             <div className='error'>{formik.errors.name}</div>
//                         ) : null}
//                     </Form.Group>

//                     <Form.Group className="mb-3 hovering">
//                         <Form.Label>Email</Form.Label>
//                         <Form.Control
//                             type="email"
//                             name='email'
//                             placeholder="Enter email"
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.email}
//                         />
//                         {formik.touched.email && formik.errors.email ? (
//                             <div className='error'>{formik.errors.email}</div>
//                         ) : null}
//                     </Form.Group>

//                     <Form.Group className="mb-3 hovering">
//                         <Form.Label>Password</Form.Label>
//                         <div className="password-input-wrapper" style={{ position: 'relative' }}>
//                             <Form.Control
//                                 type={passwordVisible ? 'text' : 'password'}
//                                 name='password'
//                                 placeholder="Enter password"
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 value={formik.values.password}
//                             />
//                             <span onClick={togglePasswordVisibility} className="eye-icon position-absolute top-50 end-0 translate-middle-y me-3">
//                                 {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//                             </span>
//                         </div>
//                         {formik.touched.password && formik.errors.password ? (
//                             <div className='error'>{formik.errors.password}</div>
//                         ) : null}
//                     </Form.Group>

//                     <p onClick={() => navigate("/sign-in")} style={{ color: "blue", textDecoration: "underline", marginLeft: "110px", cursor: "pointer" }}>
//                         Already you have an account?
//                     </p>
//                     <Button type="submit" style={{ marginLeft: '50px', width: '220px', color: 'white' }}>
//                         Sign Up
//                     </Button>
//                 </Form>
//             </div>
//         </div>
//     );
// }

// export default SignUp;


import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from "yup";
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from "react-toastify";

function SignUp() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Required"),
            email: yup.string().matches(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/, 'Enter valid email').required("Required"),
            password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'Example@123').required("Required"),
        }),
        onSubmit: async (values) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, values);
                if (res.status === 200) {
                    localStorage.setItem("user-info", JSON.stringify(res.data.user));
                    toast.success(res.data.message);
                    navigate('/');
                }
            } catch (error) {
                console.error(error);
                toast.error(error.response?.data?.message || error.response?.data?.error || "An error occurred");
            }
        }
    });

    return (
        <div className='signup-main'>
            <div className='form-header'>
                <h1>Sign Up</h1>
            </div>
            <div className='form-wrapper'>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3 hovering">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name='name'
                            placeholder="Enter name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <div className='error'>{formik.errors.name}</div>
                        )}
                    </Form.Group>

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
                        {formik.touched.email && formik.errors.email && (
                            <div className='error'>{formik.errors.email}</div>
                        )}
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
                        {formik.touched.password && formik.errors.password && (
                            <div className='error'>{formik.errors.password}</div>
                        )}
                    </Form.Group>

                    <p onClick={() => navigate("/sign-in")} style={{ color: "blue", textDecoration: "underline", marginLeft: "140px", cursor: "pointer" }}>
                        Already have an account?
                    </p>
                    <Button type="submit" style={{ marginLeft: '50px', width: '220px', color: 'white' }}>
                        Sign Up
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default SignUp;
