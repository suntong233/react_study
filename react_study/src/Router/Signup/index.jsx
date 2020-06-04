import React, {useState} from 'react'
import Style from './style.module.scss'
import { easyClassNames } from '../../utils/scott.js'
import {withRouter} from 'react-router-dom'
import axios from 'axios';
function SignUp(props) {
    const classNames = easyClassNames(Style.container)
    const [UserLogin, setUserLogin] = useState({username:"",password:"",verification:false});
    const verificate = (data) => {
        const {username,password} = data
        if(username !== "" && password !== ""){  // 临时的验证方式 不为空就行
            setUserLogin({username:username,password:password,verification:true})
        } else {
            setUserLogin({username:username,password:password,verification:false})
        }
    }
    // 更新用户名
    const handleChangeUserName = (e) => {
        let username = e.target.value
        const data = {username:username,password:UserLogin.password,verification:UserLogin.verification}
        setUserLogin(data)
        verificate(data)
    }
    // 更新密码
    const handleChangePassWord = (e) => {
        let password = e.target.value
        const data = {username:UserLogin.username,password:password,verification:UserLogin.verification}
        setUserLogin(data)
        verificate(data)
    }
    
    const submitUserInfo = () => {
        axios.post("http://www.ybl-sx.com:9527/user/signup",{
            username: UserLogin.username,
            userpwd: UserLogin.password
        }).then(res=>{
            console.log(res);
            if ( res.status === 200 && res.data.id>0){
                props.history.push("/login")
            }
        })
    }
    return (
        <div className={classNames}>
            <div className={Style.boxL}>
                <img style={{width:"130%",height:"130%"}} src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1226759401,228991783&fm=26&gp=0.jpg" alt=""/>
            </div>
            <div className={Style.boxR}>
                <div>注册 <a href="/login">已有账号?前往登录</a></div>
                <div>
                    <input placeholder="用户名" onChange={handleChangeUserName} value={UserLogin.username} type="text"/>
                </div>
                <div>
                    <input type="password" placeholder="密码" onChange={handleChangePassWord} value={UserLogin.password} />
                </div>
                <div>
                    <input type="checkbox" />我已阅读并同意 使用条款 及 用户账号管理规范
                </div>
                <div>
                    <button disabled={!UserLogin.verification} onClick={submitUserInfo}>立即注册</button>
                </div>
                <div>
                    ----其他登录方式----
                </div>
                <div>微信 qq</div>
            </div>
        </div>
    )
}

export default withRouter(SignUp)
