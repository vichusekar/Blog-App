import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import * as Yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

function EditBlogs() {
    let navigate = useNavigate()
    let params = useParams()
    let [count, setCount] = useState(0)
    let [oldTitle, setTitle] = useState("")
    let [oldImageUrl, setImageUrl] = useState("")
    let [oldDescription, setDescription] = useState("")
    let [oldAuthor, setAuthor] = useState("")

    const totalCount = 800

    let handleSubmit = async (e) => {
        try {
            let res = await axios.put(`${process.env.REACT_APP_API_URL}/${params.id}`, e)
            toast.success(res.data.message)
            navigate('/main')
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message || error.response.data.error)
        }
    }

    const formik = useFormik({
        initialValues: {
            title: oldTitle,
            imageURL: oldImageUrl,
            description: oldDescription,
            author: oldAuthor
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            title: Yup.string().min(2, 'Too Short').required('Required'),
            imageURL: Yup.string().required('Required').matches(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g, 'Must be url'),
            description: Yup.string().min(100, 'Min 100 Characters Expected').required('Required'),
            author: Yup.string().required('Required')
        }),
        onSubmit: values => {
            handleSubmit(values)
        }
    })

    const getBlogById = async (_id) => {
        try {
            let res = await axios.get(`${process.env.REACT_APP_API_URL}/${_id}`)

            setTitle(res.data.blog.title)
            setImageUrl(res.data.blog.imageURL)
            setDescription(res.data.blog.description)
            setAuthor(res.data.blog.author)

        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(() => {
        if (params.id) {
            getBlogById(params.id)
        }
    }, [])

    return <div className='main-content'>
        <div>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        id='title'
                        name='title'
                        placeholder="Title"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                    />
                    {formik.touched.title && formik.errors.title ? (
                        <div className='error'>{formik.errors.title}</div>
                    ) : null}
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        type="text"
                        id='imageURL'
                        name='imageURL'
                        placeholder="Image URL"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.imageURL}
                    />
                    {formik.touched.imageURL && formik.errors.imageURL ? (
                        <div className='error'>{formik.errors.imageURL}</div>
                    ) : null}
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        id='description'
                        name='description'
                        placeholder="Description"
                        onChange={formik.handleChange}
                        onKeyUp={(e) => setCount(e.target.value.length)}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                    />
                    <Form.Text>{count} of {totalCount} Characters</Form.Text>
                    {formik.touched.description && formik.errors.description ? (
                        <div className='error'>{formik.errors.description}</div>
                    ) : null}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        type="text"
                        id='author'
                        name='author'
                        placeholder="Author"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.author}
                    />
                    {formik.touched.author && formik.errors.author ? (
                        <div className='error'>{formik.errors.author}</div>
                    ) : null}
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    </div>
}

export default EditBlogs