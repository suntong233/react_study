import React,{useEffect,useState} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Style from './style.module.scss'
import http from '../../ajax/http.js'
const UserDocsDetails = (props) => {
    const {userinfo} = props
    const [FileContent, setFileContent] = useState([])
    useEffect(() => {
        fetchDocContent()
    },[])
    const fetchDocContent = async () => {
        const res = await http.get("/docs/doc/"+props.match.params.id)
        if(res.status===200 && res.data){
            setFileContent(res.data)
        }
    }
    if(!userinfo.username || userinfo.username === ""){
        return <div>未登录</div>
    }
    return (
        <div className={Style.container}>
            <div>

            </div>
           {FileContent.map((v,i) => {
               return <div key={i}>{v}</div>
           })}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userinfo : state.UserInfo
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserDocsDetails)) 
