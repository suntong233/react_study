import React, { Fragment } from 'react'
import Style from "./style.module.scss";
import {withRouter} from 'react-router-dom';
function HomeMenu(props) {
    const MenuIndex = [
        { name: "图片上传" , path:"/home"},
        { name: "todo...1" , path:"/home/todo1"},
        { name: "todo...2" , path:"/home/todo2"},
        { name: "todo...3" , path:"/home/todo3"}
    ]
    return (
        <Fragment>
            {
                MenuIndex.map(item => {
                    return <div className={Style.item + (props.location.pathname===item.path? " "+ Style.active: "")} onClick={()=>props.history.push(item.path)} key={item.name}>{item.name}</div>
                })
            }
        </Fragment>
    )
}

export default withRouter(HomeMenu)
