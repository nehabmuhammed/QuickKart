import axios from "axios";

const axiosConfig = async(method,url,reqBody) => {
    let obj ={
        method:method,
        url:url,
        data:reqBody
    }

    return await axios(obj).then((res)=> {
        return res
    }).catch((err) => {
        return err
    })
}
export default axiosConfig