import React, {useState, useEffect} from 'react'
import Style from './style.module.scss'
import { easyClassNames } from '../../utils/scott.js'
import {withRouter} from 'react-router-dom'
import http from '../../ajax/http.js'
function Login(props) {
    const classNames = easyClassNames(Style.container)
    const [UserLogin, setUserLogin] = useState({username:"",password:"",verification:false});
    const [Jizhu, setJizhu] = useState(false);
    useEffect(() => {
        if(localStorage.UserLogin){setUserLogin(JSON.parse(localStorage.UserLogin))}
    }, []);
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
        http.post("/user/login",{
            username: UserLogin.username,
            userpwd: UserLogin.password
        }).then(res=>{
            console.log(res);
            if (res.status === 200){
                const {data} = res
                localStorage.token = data.token
                console.log("登录成功 即将跳转");
                if(Jizhu){
                    localStorage.UserLogin = JSON.stringify(UserLogin)
                }
                props.history.push("/user")
            }
        })
    }
    const jizhuwo = () => {
        setJizhu(!Jizhu)
    }
    return (
        <div className={classNames}>
            <div className={Style.boxL}>
                <img style={{width:"130%",height:"130%"}} src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1226759401,228991783&fm=26&gp=0.jpg" alt=""/>
            </div>
            <div className={Style.boxR}>
                <div>登录  <a href="/signup">没有账号？立即注册</a></div>
                <div>
                    <input placeholder="用户名" onChange={handleChangeUserName} value={UserLogin.username} type="text"/>
                </div>
                <div>
                    <input placeholder="密码" onChange={handleChangePassWord} value={UserLogin.password} type="passworld"/>
                </div>
                <div>
                    <input onChange={jizhuwo} type="checkbox" value={Jizhu} />记住我
                </div>
                <div>
                    <button disabled={!UserLogin.verification} onClick={submitUserInfo}>登录</button>
                </div>
                <div>
                    <span>已有账号,忘记密码</span>
                </div>
                <div>
                    ----其他登录方式----
                </div>
                <div>微信 qq</div>
            </div>
        </div>
    )
}

export default withRouter(Login)
