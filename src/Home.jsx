import React, { useEffect, useState } from "react";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { MdLocalShipping } from "react-icons/md";
import { CiShoppingTag } from "react-icons/ci";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaBoltLightning } from "react-icons/fa6";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { loadData, postDataCart } from "./service/allApi";
import Footer from "./Footer";
import Swal from 'sweetalert2'


const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let apiRes = await loadData();
    if (apiRes.status == 200) {
      setData(apiRes.data);
    }
  };

  const postData = async(obj) => {
    let apiRes = await postDataCart(obj)
    if(apiRes.status == 201){
      Swal.fire({
        title: "Cart Added",
        icon: "success",
        draggable: true
      });
    }
  }

  return (
    <>
      <section style={{ backgroundColor: "#f9fafb" }}>
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="3000"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000"
                className="d-block w-100"
                alt="First Slide"
                style={{ height: "80vh", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block">
                <h3>Welcome to QuickKart</h3>
                <p>Shop smarter. Live better.</p>
              </div>
            </div>

            <div className="carousel-item">
              <img
                src="https://t4.ftcdn.net/jpg/08/11/15/37/360_F_811153701_7gPmVssUpwljTVrE7vlMDzfINZqQuJY6.jpg"
                className="d-block w-100"
                alt="Second Slide"
                style={{ height: "80vh", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Latest Gadgets</h5>
                <p>Explore top tech from trusted brands.</p>
              </div>
            </div>

            <div className="carousel-item">
              <img
                src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/2bbcfa99737217.5ef9be3dbb9a9.jpg"
                className="d-block w-100"
                alt="Third Slide"
                style={{ height: "80vh", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Everyday Essentials</h5>
                <p>All your daily needs in one place.</p>
              </div>
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div style={{ height: "112px", backgroundColor: "white" }}>
  <div className="container-fluid">
    <div className="row justify-content-center align-items-center h-100">
      <div className="col-6 col-md-3 text-center mt-4">
        <p className="fs-6 fs-md-5 mb-0">
          <MdLocalShipping className="text-primary fs-4 fs-md-3" />
          <span className="d-none d-sm-inline fs-4"> Free Shipping</span>
        </p>
      </div>
      <div className="col-6 col-md-3 text-center">
        <p className="fs-6 fs-md-5 mb-0">
          <CiShoppingTag className="text-success fs-4 fs-md-3" />
          <span className="d-none d-sm-inline fs-4"> Best Price</span>
        </p>
      </div>
      <div className="col-6 col-md-3 text-center">
        <p className="fs-6 fs-md-5 mb-0">
          <RiSecurePaymentLine className="text-primary fs-4 fs-md-3" />
          <span className="d-none d-sm-inline fs-4"> Secure Payment</span>
        </p>
      </div>
      <div className="col-6 col-md-3 text-center">
        <p className="fs-6 fs-md-5 mb-0">
          <FaBoltLightning className="text-warning fs-4 fs-md-3" />
          <span className="d-none d-sm-inline fs-4"> Fast Delivery</span>
        </p>
      </div>
    </div>
  </div>
</div>
        <div className="display-section">
          <h1 className="ms-4">Featured Products</h1>
          <p className="ms-4">Discover our amazing Collection</p>
          <div className="products-grid">
            {data.length > 0 ? (
              data.map((each, index) => (
                <Card key={index}>
                  <Card.Img
                    variant="top"
                    src={each.img}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{each.name}</Card.Title>
                    <Card.Text>{each.desc}</Card.Text>
                    <Button variant="primary" className="me-3" onClick={() => postData(each)}> 
                      Add to Cart
                    </Button>
                    <Button variant="success" className="fw-bold">
                      <span style={{ fontSize: "0.9rem" }}>₹</span>
                      {each.price}
                    </Button>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <h1>No Products Available</h1>
            )}
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Home;
