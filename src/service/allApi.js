import axiosConfig from "./axiosConfig"

export const postData = async(reqBody) =>{
    return await axiosConfig('post','http://localhost:3000/product',reqBody)
}


export const loadData = async() =>{
    return await axiosConfig('get','http://localhost:3000/product','')
}
export const deleteData = async(id) =>{
    return await axiosConfig('delete',`http://localhost:3000/product/${id}`,{})
}
export const editData= async(id,reqbody) =>{
    return await axiosConfig('put',`http://localhost:3000/product/${id}`,reqbody)

}

export const postDataCart = async(reqBody) =>{
    return await axiosConfig('post','http://localhost:3000/cart',reqBody)
}

export const loadCartData = async() =>{
    return await axiosConfig('get','http://localhost:3000/cart','')
}
export const deleteCartData = async(id) =>{
    return await axiosConfig('delete',`http://localhost:3000/cart/${id}`,{})
}