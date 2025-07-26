import { useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm/LoginForm'
import Navbar from './components/Navbar/Navbar'
import CreatePost from './components/CreatePost/CreatePost'
import Posts from './components/Posts/Posts'

function App() {
  

  return (
    <>
     <Navbar/>
     <CreatePost/>
     <Posts/>
    </>
  )
}

export default App
