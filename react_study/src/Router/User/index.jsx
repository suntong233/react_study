import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Style from './style.module.scss'
import Header from '../../Components/Header'
const User = (props) => {
    const {userinfo,getUserInfo,history} = props
    if(!userinfo.hasOwnProperty("username")){
        getUserInfo()
    }
    const handleRouter = (e) => {
        const routerPath = e.target.dataset["router"]
        history.push(routerPath)
    }
    return (
        <>
            <Header />
        <div className={Style.container}>
            <div className={Style.userBox}>
                <div>用户中心</div>
                <div>用户名：{userinfo.username}</div>
                <div>邮箱：{userinfo.email}</div>
                <div>电话：{userinfo.phone}</div>
                <div>最近活跃时间：{userinfo.updatetime}</div>
                <div>账号注册时间：{userinfo.signat}</div>
                <hr/>
                <div data-router="/user/docs" onClick={handleRouter} className={Style.userBoxRouter}>用户文档管理</div>
            </div>
            <div className={Style.main}>
                {props.children}
            </div>
        </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        userinfo : state.UserInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo(){
            import('../../Store/actions.js').then(module=>{
                module.getUserInfo(dispatch)
            }).catch(err => {
                console.log(err);
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(User)) 
