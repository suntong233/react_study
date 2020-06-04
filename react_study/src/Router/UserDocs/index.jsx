import React,{useState, useEffect} from 'react'
import {connect} from 'react-redux'
import Style from './Style.module.scss'
import {withRouter} from 'react-router-dom'
import http from '../../ajax/http.js'
const UserDocs = (props) => {
    const [ShowUploadBox, setShowUploadBox] = useState(false)
    const [DocCats, setDocCats] = useState([])
    const [MdFiles, setMdFiles] = useState([])
    const [Docs, setDocs] = useState([]);
    const [Cat, setCat] = useState("")
    const [Title, setTitle] = useState("")
    const [Author, setAuthor] = useState("")
    const {userinfo} = props
    useEffect(() => {
        http.get("/docs/cats").then(res=>{
            if (res.data){
                setDocCats(res.data)
            }
        })
        fetchUserDocs()
    }, [userinfo]);
    const handleUploadFiles = async (e) => {
        setMdFiles([])
        const {files} = e.target
        let md5Files = [].filter.call(files,item=>{
            return /\.md$/.test(item.name)
        })
        setMdFiles(md5Files)
    }
    const fetchUserDocs = async () => {
        http.get("/docs/").then(res=>{
            if (res.status === 200 ){
                if(Array.isArray(res.data)){
                    setDocs(res.data)
                } else {
                    setDocs([])
                }
            }
        })
    }
    const upload = async () => {
        if (Cat === ""){
            console.log("请选择分类");
            return
        }
        if (MdFiles.length === 0){
            console.log("请选择md文件");
            return
        }
        let formData = new FormData();
        formData.append("category",Cat);
        formData.append("title",Title);
        formData.append("author",Author);
        [].forEach.call(MdFiles,item=>{
            formData.append("files",item)
        })
        const res = await http.post("/docs/upload", formData, {
            "Content-Type": "multipart/form-data"
        })
        if (res.status === 200 && res.data.msg){
            console.log(res.data.msg);
            setMdFiles([]);
            showUploadBox()
            fetchUserDocs()
        }
    }
    const showUploadBox = () => {
        setShowUploadBox(!ShowUploadBox)
    }
    const selectChange = (e) => {
        setCat(e.target.value)
    }
    const docDetails = (item) => {
        const {id} = item
        props.history.push('/user/docs/'+id)
    }
    const inputTitleChange = (e) => {
        setTitle(e.target.value.trim())
    }
    const inputAuthorChange = (e) => {
        setAuthor(e.target.value.trim())
    }
    const docDetet = (item, e) => {
        e.stopPropagation()
        http.delete("/docs/doc/"+item.id).then(res=>{
            if(res.status === 200){
                console.log(res.data);
                fetchUserDocs()
            }
        })
    }
    if(!userinfo.username || userinfo.username === ""){
        return <div>未登录</div>
    }
    return (
        <div className={Style.container}>
            <div className={Style.topbox}>
                <span>欢迎回来{userinfo.username}</span>
                <button className="btn" onClick={showUploadBox}>上传文档</button>
                {
                    !ShowUploadBox? "" : 
                    <div  className={Style.uploadBox}>
                        <div className={Style.uploadBoxContent}>
                            <span onClick={showUploadBox} className={Style.delete}>取消</span>
                            <div className={Style.inputs}>
                                分类<select onChange={selectChange} value={Cat}>
                                    <option></option>
                                    {
                                        DocCats.map(item=>{
                                            return  <option value={item} key={item}>{item}</option>
                                        })
                                    }
                                </select> 
                                标题：<input onChange={inputTitleChange} type="text"/>
                                作者：<input onChange={inputAuthorChange} type="text"/>
                            </div>
                            <input placeholder="上传md文档" type="file" onChange={handleUploadFiles} multiple/>
                            <button onClick={upload}>upload</button>
                        </div>
                    </div>
                }
            </div>
            <div className={Style.mainbox}>
                {
                    Docs.map(item=>{
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
                                <span onClick={(e)=>docDetet(item, e)} className={Style.deleteItem}>删除</span>
                            </div>
                        )
                    })
                }
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserDocs)) 
