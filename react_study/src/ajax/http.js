import axios from 'axios'

const baseHttp = axios.create({
    baseURL: "http://www.ybl-sx.com:9527"  // http://www.ybl-sx.com:9527  http://localhost:9527
})

baseHttp.interceptors.request.use(function (config) {
    if(localStorage.token){
        config.headers.Authorization = 'Bearer ' + (localStorage.token || "")
    }
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
baseHttp.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default baseHttp