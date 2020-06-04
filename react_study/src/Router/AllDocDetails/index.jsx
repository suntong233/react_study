import React,{useEffect,useState} from 'react'
import MdEngine from '../../Components/MdEngine'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Style from './style.module.scss'
import http from '../../ajax/http.js'
import Header from '../../Components/Header'
const AllDocsDetail = (props) => {
    const {history} = props
    const [FileContent, setFileContent] = useState("")
    useEffect(() => {
        fetchDocContent()
    },[])
    const fetchDocContent = async () => {
        const res = await http.get("/alldocs/"+props.match.params.id)
        if(res.status===200 && res.data){
            setFileContent(res.data)
        }
    }
    const back = () => { history.goBack() }
    return (
        <>
        <Header />
        <div className={Style.container}>
            <div>
                <button onClick={back} className="btn">back</button>
            </div>
            <MdEngine data={FileContent}/>
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

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AllDocsDetail)) 
