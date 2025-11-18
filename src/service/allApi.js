import axiosConfig from "./axiosConfig"
import { baseUrl } from "./baseUrl"

export const postData = async(reqBody) =>{
    return await axiosConfig('post',`${baseUrl}/product`,reqBody)
}


export const loadData = async() =>{
    return await axiosConfig('get',`${baseUrl}/product`,'')
}
export const deleteData = async(id) =>{
    return await axiosConfig('delete',`${baseUrl}/product/${id}`,{})
}
export const editData= async(id,reqbody) =>{
    return await axiosConfig('put',`${baseUrl}/product/${id}`,reqbody)

}

export const postDataCart = async(reqBody) =>{
    return await axiosConfig('post',`${baseUrl}/cart`,reqBody)
}

export const loadCartData = async() =>{
    return await axiosConfig('get',`${baseUrl}/cart`,'')
}
export const deleteCartData = async(id) =>{
    return await axiosConfig('delete',`${baseUrl}/cart/${id}`,{})
}