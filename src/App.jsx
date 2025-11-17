import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import Admin from "./Admin"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Cart from "./Cart"


function App() {

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
      
    </>
  )
}

export default App
