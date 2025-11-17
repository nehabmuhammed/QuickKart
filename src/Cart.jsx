import React, { useEffect, useState } from "react";
import { deleteCartData, loadCartData } from "./service/allApi";
import { IoMdArrowBack } from "react-icons/io";
import "./Admin.css";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Swal from "sweetalert2";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const Cart = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const [userLoc, setUserLoc] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [mapInstance, setMapInstance] = useState(null);
  const [cardData, setCartData] = useState([]);
  let totalAmount = 0;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition([pos.coords.latitude, pos.coords.longitude]);
    });
  }, []);

  const getData = async () => {
    let apiRes = await loadCartData();
    if (apiRes.status == 200) {
      setCartData(apiRes.data);
      let cartCount = JSON.stringify(apiRes.data.length);
      localStorage.setItem("cartValue", cartCount);
    }
  };

  const clickDelete = async (id) => {
    let apiRes = await deleteCartData(id);
    if (apiRes.status == 200) {
      getData();
    }
  };

  const getLocationName = async (lat, lon) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );
    const data = await res.json();
    return data.display_name;
  };

  const findMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setUserLoc(coords);
        if (mapInstance) {
          mapInstance.setView(coords, 16);
        }
        const name = await getLocationName(coords[0], coords[1]);
        setLocationName(name);
      },
      () => {
        alert("Location access denied or unavailable");
      }
    );
  };

  const alertLocaion = () => {
   Swal.fire({
  title: `Order Placed to the Location ${locationName} Total AMount of ₹${totalAmount}`,
  icon: "success",
  draggable: true
});
  }

  totalAmount = cardData.reduce((acc, red) => acc + Number(red["price"]), 0);

  return (
    <>
      <div className="d-flex justify-content-between mt-3 container" style={{ backgroundColor: "#f9fafb" }}>
        <div>
          <h2>Shopping Cart</h2>
          <p>{cardData.length} item added in your cart</p>
        </div>
        <div>
          <button className="btn btn-primary">
            <IoMdArrowBack />
            <Link to={"/"} className="text-white" style={{ textDecoration: "none" }}>
              Contine Shopping
            </Link>
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-8 ms-lg-3">
          <div className="products-section">
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cardData.length > 0 ? (
                    cardData.map((each, index) => (
                      <tr key={index}>
                        <td data-label="#">{index + 1}</td>
                        <td data-label="Image">
                          <img src={each.img} alt={each.name} className="product-img" />
                        </td>
                        <td data-label="Product Name">{each.name}</td>
                        <td data-label="Price">₹{each.price}</td>
                        <td data-label="Description">{each.desc}</td>
                        <td data-label="Actions">
                          <div className="action-btns">
                            <button className="delete-btn" onClick={() => clickDelete(each.id)}>
                              <MdDelete />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="no-data">
                        <h3>No Products Found</h3>
                        <p>Add your first product using the form above</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-3 rounded-2 mt-3 mt-lg-0" style={{ height: "316px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
          <p>Order Summary</p>
          <div className="d-flex justify-content-between">
            <p>Subtotal</p>
            <p>₹{totalAmount}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Shipping</p>
            <p className="text-success">FREE</p>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <p>Total</p>
            <p className="text-success">₹{totalAmount + 2000}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Tax</p>
            <p className="text-danger">₹2000</p>
          </div>
          <button className="btn btn-warning" onClick={handleOpen}>
            Proceed to checkout
          </button>
        </div>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style }}>
          <h2>Payment options</h2>

          <TextField label="UPI" variant="outlined" fullWidth id="upi"/>
          <TextField label="Address" variant="outlined" fullWidth className="mt-3 mb-3" value={locationName} />

          <Button variant="contained" onClick={findMyLocation} sx={{ mt: 2, mb: 2 }}>
            Find My Location
          </Button>

          {locationName && (
            <p style={{ fontWeight: "bold", marginBottom: "10px" }}>{locationName}</p>
          )}

          <div style={{ height: "300px", width: "100%" }}>
            <MapContainer
              center={userLoc || [9.9312, 76.2673]}
              zoom={15}
              style={{ height: "100%", width: "100%" }}
              whenCreated={(map) => {
                setMapInstance(map);
                setTimeout(() => map.invalidateSize(), 200);
              }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {userLoc && (
                <Marker position={userLoc}>
                  <Popup>You are here</Popup>
                </Marker>
              )}
            </MapContainer>
          </div>

          <Button onClick={() => {
            alertLocaion()
            handleClose()
          }} sx={{ mt: 2 }}>
            Place your Order
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;
