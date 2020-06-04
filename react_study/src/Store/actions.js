import basehttp from '../ajax/http.js'

const getUserInfo = async (dispatch) => {
    const {data} = await basehttp.get("user/userinfo")
    if(data.msg){console.log(data.msg)}
    dispatch({
        type:"getUserInfo",
        value: (!data || data === "" || !data.username) ? {username:""} : data
    })
}

export {getUserInfo}