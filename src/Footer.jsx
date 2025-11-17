import React from 'react'
import { MdAttachEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa"; 
import { FaLocationDot } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <>
        <div style={{height:'324px',backgroundColor:'#101828'}} className='d-flex justify-content-center align-items-center'>
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-12 col-md-6 col-lg-3 mb-4'>
                <h3 className='text-white'>About quickKart</h3>
                <p className='text-white'>Your one-stop destination for quality products at amazing prices. Shop electronics, fashion, home decor, and more!</p>
              </div>
              <div className='col-12 col-md-6 col-lg-2 mb-4'>
                <h3 className='text-white'>Quick Links</h3>
                <ul className='text-white list-unstyled'>
                  <li>About us</li>
                  <li>Contact</li>
                  <li>Privacy Policy</li>
                  <li>Term and condition</li>
                </ul>
              </div>
              <div className='col-12 col-md-6 col-lg-2 mb-4'>
                <h3 className='text-white'>Customer Service</h3>
                <ul className='text-white list-unstyled'>
                  <li>Help Center</li>
                  <li>Track Order</li>
                  <li>Returns</li>
                  <li>Shipping Info</li>
                </ul>
              </div>
              <div className='col-12 col-md-6 col-lg-3 mb-4'>
                <h3 className='text-white'>Contact Info</h3>
                <ul className='text-white list-unstyled'>
                  <li><MdAttachEmail className='me-2'/>support@gmail.com</li>
                  <li><FaPhone className='me-2'/>+91 8129445595</li>
                  <li><FaLocationDot className='me-2'/>Trivandrum, India</li>
                </ul>
              </div>
            </div>
            
            <hr className='text-white my-4'/>
            
            <div className='row align-items-center'>
              <div className='col-12 col-md-6 text-center text-md-start'>
                <h6 className='text-white mb-0'>&copy; Reserved to N Muhammed Nehab</h6>
              </div>
              <div className='col-12 col-md-6 text-center text-md-end'>
                <h6 className='text-white mb-0'>
                  <CiLinkedin className='me-3' />
                  <FaXTwitter className='me-3' />
                  <FaInstagram className='me-3' />
                  <FaYoutube />
                </h6>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Footer