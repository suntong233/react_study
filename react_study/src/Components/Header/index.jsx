import React from 'react'
import Style from './index.module.scss';
import { Link, withRouter } from 'react-router-dom';


function s(className, active){
    return active? Style.active + " " + className : className 
}

function Header(props) {
    return (
        <div className={Style.container}>
            <Link className={s(Style.item, props.location.pathname === "/home")} to="/">home</Link>
            <Link className={s(Style.item, props.location.pathname === "/doc")} to="/doc">doc</Link>
            <Link className={s(Style.item, props.location.pathname === "/project")} to="/project">project</Link>
        </div>
    )
}

export default withRouter(Header)
