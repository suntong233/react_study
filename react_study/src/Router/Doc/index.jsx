import React, { useEffect, useState } from 'react'
import {withRouter} from 'react-router-dom'
import Style from './style.module.scss';
import Header from '../../Components/Header';
import http from '../../ajax/http.js';
function Doc(props) {
    const {history} = props
    const [AllDocs,setAllDocs] = useState([])
    useEffect(() => {
        fetchAllDocs()
    }, [])
    const fetchAllDocs = async () => {
        const res = await http.get("/alldocs")
        if(res.status === 200 && Array.isArray(res.data) ){
            setAllDocs(res.data)
        } else {
            setAllDocs([])
        }
    }
    const docDetails = (data) => {
        history.push("/alldocs/"+data.id)
    }
    return (
        <>
        <Header />
        <div className={Style.container}>
            <div className={Style.main}>
                {
                    AllDocs.map(item => {
                        return (
                            <div onClick={()=>docDetails(item)} className={Style.fileItem} key={item.id}>
                                <div className={Style.itemTitle}><span className={Style.titleicon}></span>{item.title}</div>
                                <div className={Style.itemFileName}>{item.filename}</div>
                                <div className={Style.timeBox}>创建于：{item.createtime}</div>
                                <div className={Style.timeBox}>更新于：{item.updatetime}</div>
                                <div className={Style.itemBot}>
                                    <div>分类：{item.filecat}</div>
                                    <div>作者：{item.author}</div>
                                </div>
                            </div>
                        )
                    })
                }
                           
            </div>
        </div>
        </>
    )
}

export default withRouter(Doc)
