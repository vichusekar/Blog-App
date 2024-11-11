import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from "react-toastify"

function ManageBlogs() {
  let navigate = useNavigate()
  let [blogs, setBlogs] = useState([])

  let getData = async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}/getBlogs`)
      if (res.status === 200) {
        if (localStorage.getItem("user-info")) {
          setBlogs(res.data.blogs)
        }
        else {
          toast.warning("Kindly register")
        }
      }
    } catch (error) {
      toast.error(error.response.data.error || error.response.data.message)
      console.log(error)
    }
  }

  let handleDelete = async (id) => {
    try {
      let res = await axios.delete(`${process.env.REACT_APP_API_URL}/${id}`)
      if (res.status === 200) {
        toast.success(res.data.message)
        getData()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return <>
    <div className='main-content'>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: "5%" }}>No</th>
            <th style={{ width: "15%" }}>Title</th>
            <th style={{ width: "40%" }}>Description</th>
            <th style={{ width: "10%" }}>Image</th>
            <th style={{ width: "10%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            blogs.map((e, i) => {
              return <tr key={i} style={{ verticalAlign: "middle" }}>
                <td>{i + 1}</td>
                <td>{e.title}</td>
                <td><Description content={e.description} /></td>
                <td><Image imageURL={e.imageURL} /></td>
                <td><i className="fa-solid fa-pen" style={{ color: "#052c65", cursor: "pointer", marginLeft: '20px' }}
                  onClick={() => navigate(`/edit/${e._id}`)}
                ></i>

                  <i className="fa-solid fa-trash " style={{ color: "#d1625a", cursor: "pointer", marginLeft: '40px' }}
                    onClick={() => handleDelete(e._id)}
                  ></i>
                </td>
              </tr>
            })
          }

        </tbody>
      </Table>
    </div>
  </>
}

export default ManageBlogs

function Image({ imageURL }) {
  return <>
    <div style={{ textAlign: "center", width: "100%" }}>
      <img src={imageURL} alt={"BlogImage"} style={{ width: "50px", height: "50px" }} />
    </div>
  </>
}

function Description({ content }) {
  return <div className='description-wrapper'>
    <div className='description'>
      {content}
    </div>
  </div>
}