import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import CreateBlogs from './components/CreateBlogs'
import ManageBlogs from './components/ManageBlogs'
import Home from './components/Home'
import EditBlogs from './components/EditBlogs'
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import ForgotPassword from "./components/ForgotPassword"
import ResetPassword from "./components/ResetPassword"

function App() {
  return <>
    <BrowserRouter>
      <div>
        <NavBar />
      </div>
      <div className="container-fluid">
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/create" element={<CreateBlogs />} />
          <Route path="/manage" element={<ManageBlogs />} />
          <Route path="/edit/:id" element={<EditBlogs />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:id" element={<ResetPassword />} />
          <Route path="/main" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  </>
}

export default App
