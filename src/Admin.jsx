import React, { useEffect } from "react";
import "./admin.css";
import TextField from "@mui/material/TextField";
import { deleteData, editData, loadData, postData } from "./service/allApi";
import { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import Swal from 'sweetalert2'

const Admin = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState(null);
  const [desc, setDesc] = useState("");
  const [productArr, setProductArr] = useState([]);
  const[editId,setEditID] = useState(null)

  useEffect(() => {
    getData();
  }, []);

  
  const addProduct = async () => {
    let productObj = {
      name: productName,
      price: price,
      img: img,
      desc: desc,
    };
   
    ;
   if(productName && price && desc){
    let apiRes = await postData(productObj)
     if(apiRes.status == 201){
      reform()
      getData()
    }
   }else{
    Swal.fire({
  title: "Enter the Fields",
  icon: "error",
  draggable: true
});
   }
  };

  const getData = async () => {
    let apiRes = await loadData();
    if (apiRes.status == 200) {
      setProductArr(apiRes.data);
    }
  };

  const clickDelete = async(id) => {
    let apiRes = await deleteData(id)
    // console.log(apiRes)
    
      if(apiRes.status == 200){
      getData()
    }
    
  }
  const editClick = (each) => {
      setEditID(each.id)
      setProductName(each.name)
      setPrice(each.price)
      setDesc(each.desc)
      setImg(each.img)
  }
  const mainClick = async() =>{
    
    let obj = {
      name: productName,
      price: price,
      img: img,
      desc: desc
    }
    let apires = await editData(editId,obj)
    if(apires.status==200){
      Swal.fire({
  title: "Product Edit",
  icon: "success",
  draggable: true
});
      reform()
    }else{
      alert('Error in Editing Operation')
    }
  }
  const reform = () => {
    setEditID("")
      setProductName("")
      setPrice("")
      setDesc("")
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Panel</h2>
        <p>Manage your product inventory</p>
      </div>

      
      <div className="add-section">
        <h4>Add New Product</h4>
        <div className="form-row">
          <div className="form-group">
            <TextField
              label="Product Name"
              variant="outlined"
              fullWidth
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
            />
          </div>
          <div className="form-group">
            <TextField
              label="Product Price"
              variant="outlined"
              fullWidth
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>
        </div>
        <div className="form-group">
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
        </div>
        <div className="file-upload">
          <input
            type="file"
            id="imgInp"
            onChange={(e) => setImg(URL.createObjectURL(e.target.files[0]))}
            // value={img}
          />
        </div>
        {editId?<button className="btn btn-warning" onClick={mainClick}>Edit Product</button>
        :<button className="add-btn" onClick={addProduct}>
          Add Product
        </button>}
      </div>

     
      <div className="products-section">
        <h3 className="section-title">Product Details ({productArr.length})</h3>
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
              {productArr.length > 0 ? (
                productArr.map((each, index) => (
                  <tr key={index}>
                    <td data-label="#">{index + 1}</td>
                    <td data-label="Image">
                      <img 
                        src={each.img} 
                        alt={each.name}
                        className="product-img"
                      />
                    </td>
                    <td data-label="Product Name">{each.name}</td>
                    <td data-label="Price">₹{each.price}</td>
                    <td data-label="Description">{each.desc}</td>
                    <td data-label="Actions">
                      <div className="action-btns">
                        <button className="edit-btn" onClick={()=>editClick(each)}>
                          <MdEdit />
                        </button>
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
  );
};

export default Admin;