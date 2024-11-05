/*eslint-disable */
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

function EditBlog() {
  let navigate = useNavigate()
  let params = useParams()
  let [count, setCount] = useState(0)
  let [oldTitle, setTitle] = useState("")
  let [oldImageUrl, setImageUrl] = useState("")
  let [oldDescription, setDescription] = useState("")

  const totalCount = 400;

  let handleSubmit = async (e) => {
    try {
      let res = await axios.put(`${process.env.REACT_APP_API_URL}/${params.id}`, e)
      toast.success(res.data.message)
      navigate('/main')
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const formik = useFormik({
    initialValues: {
      title: oldTitle,
      imageUrl: oldImageUrl,
      description: oldDescription
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().min(2, 'Too Short').max(24, 'Too Long').required('Required'),
      imageUrl: Yup.string().required('Required').matches(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g, 'Must be url'),
      description: Yup.string().min(100, 'Min 100 Characters Expected').max(totalCount, 'Too Long').required('Required')
    }),
    onSubmit: values => {
      values.active_flag = false
      handleSubmit(values)
    }
  })

  const getBlogById = async (_id) => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}/${_id}`)

      setTitle(res.data.blog.title)
      setImageUrl(res.data.blog.imageUrl)
      setDescription(res.data.blog.description)

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
            id='imageUrl'
            name='imageUrl'
            placeholder="Image URL"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.imageUrl}
          />
          {formik.touched.imageUrl && formik.errors.imageUrl ? (
            <div className='error'>{formik.errors.imageUrl}</div>
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  </div>
}

export default EditBlog