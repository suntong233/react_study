import React from 'react'
import Style from './index.module.scss';
import { Link, withRouter } from 'react-router-dom';
import {connect } from 'react-redux';
 
function s(className, active){
    return active? Style.active + " " + className : className 
}

function Header(props) {
    const {userinfo,history} = props
    const toLogin = () => {
        history.push("/login")
    }
    return (
        <div className={Style.container}>
            <Link className={s(Style.item, props.location.pathname === "/home")} to="/">home</Link>
            <Link className={s(Style.item, props.location.pathname === "/doc")} to="/doc">doc</Link>
            <Link className={s(Style.item, props.location.pathname === "/project")} to="/project">project</Link>
            <Link className={s(Style.item, /^\/user/.test(props.location.pathname))} to="/user">user</Link>
            {
                (userinfo.username&&userinfo.username!=="")? 
                null : (<button onClick={toLogin} className={Style.headerlogin}>登录</button>)
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userinfo: state.UserInfo
    }
}

export default connect(mapStateToProps)(withRouter(Header)) 
