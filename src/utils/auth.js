import axios from "axios"


const authAxiosInstance = axios.create({
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFTOKEN",
    withCredentials: true
})


// authAxiosInstance.interceptors.request.use(async config =>{
//     let token = "Token " 
//     // TODO reduce requests using local storage cache and cache invalidation
//     const resp = await axios.get("http://localhost:5000/base/current-user-token")
    
//     config.headers["X-CSRFTOKEN"] = resp.data.csrf
//     return config
// })

authAxiosInstance.interceptors.response.use( resp =>{
    return resp
}, err =>{
    console.log("There was an error processing your request.")
    console.error(err)
    throw err
})



export default authAxiosInstance