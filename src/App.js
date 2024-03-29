import React from "react";
import NavBar from './components/NavBar'
import CreateBlog from './components/CreateBlog'
import ManageBlogs from './components/ManageBlogs'
import Home from './components/Home'
import EditBlog from './components/EditBlog'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import SignUp from "./components/SignUp";
// import SignIn from "./components/SignIn";

function App() {
  return <>
    <BrowserRouter>
      <div>
        <NavBar />
      </div>
      <div className="container-fluid">
        <Routes>
          {/* <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} /> */}
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/manage" element={<ManageBlogs />} />
          <Route path="/edit/:id" element={<EditBlog />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  </>
}
export default App;
