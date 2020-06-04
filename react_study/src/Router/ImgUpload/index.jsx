import React, {useState, Fragment} from 'react'
import style from './style.module.scss';

function ImgUpload() {
    const [ImgBase64, setImgBase64] = useState([])
    
    const getFile = (e) => {
        const files = e.target.files;
        const imgs = [].filter.call(files,(item)=>{
            if(/^image\//.test(item.type)){
                return true
            }
        })
        if(imgs.length){setImgBase64([])}
        imgs.forEach(v=>{
            const {size, name, type} = v
            const data = {
                size,name,type,
                kb: size/1024,
                mb: size/1024/1024,
            }
            if(data.mb < 10) {
                const fr = new FileReader()
                fr.readAsDataURL(v)
                fr.onload = () => {
                    setImgBase64(ImgBase64 => [...ImgBase64, fr.result])
                }
            }else {
                console.log(`文件${name}:${data.mb} 大于10mb,不能上传`);
            }
        })
    }
    const uploadImg = () => {
        window.alert("该功能后端接口暂时取消")
        // UploadImgs.forEach(item=>{
        //     let formData=new FormData();
        //     formData.append('name',item.name)
        //     formData.append('img',item)
        //     axios.post('http://localhost:9527/upload',formData,{
        //         'Content-Type':'multipart/form-data'
        //     }).then(res=>{
        //         setImgBase64(v=>v.slice(1))
        //         setUploadImgs(v=>v.slice(1))
        //         console.log(res.data)
        //     })
        // })
    }
    const removeImg = () => {
        setImgBase64([])
    }
    return (
        <Fragment>
            <div className={style.upInputBox}>
                <div className={style.upInput}>
                    选择文件
                    <input accept="image/*" type="file" multiple onChange={getFile}/>
                </div>
                <button className={style.btn} onClick={uploadImg}>upload</button>
                <button className={style.btn} onClick={removeImg}>remove</button>
            </div>
            <div className={style.imgboxContainer}>
                {
                    ImgBase64.map((base64, i) => {
                        return <div key={i} className={style.imgbox}><img src={base64} alt="" /></div>
                    })
                }
            </div>
        </Fragment>
    )
}

export default ImgUpload
