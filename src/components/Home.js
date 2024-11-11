import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

function Home() {
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
      console.error("Error fetching data:", error)
    }

  }

  useEffect(() => {
    getData()
  }, [])
  return <>
    <div className='home-wrapper'>
      <h2 className='home-title'>Latest Blogs</h2>
      <div className='blog-main'>
        {
          blogs && blogs.map((e, i) => {
            return <BlogItem blog={e} key={i} />
          })
        }
      </div>
    </div>
  </>
}

export default Home


function BlogItem({ blog }) {
  return <div className='blog-wrapper'>
    <div className='blog-title'>{blog.title}</div>

    <img src={blog.imageURL} className='blog-image' alt='...load' />

    <div className='blog-description'>{blog.description}</div>
    <br />
    <div className='blog-author'><b>{blog.author}</b></div><span>{blog.createdAt}</span>
  </div >
}