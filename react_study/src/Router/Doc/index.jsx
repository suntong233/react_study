import React, {useState, useEffect} from 'react'
import axios from "axios"
import style from './style.module.scss';

function Doc() {
    const [Mds, setMds] = useState([])
    
    useEffect(() => {
        fetchMds()
    }, []);
    
    const fetchMds = async () => {
        const {data} = await axios.get("http://localhost:9527/md")
        console.log(data)
        setMds(data)
    }

    return (
        <div className={style.container}>
            <div className={style.main}>
                {
                    Mds.map(item => {
                        return <div className={style.item} key={item.name}>{item.name}</div>
                    })
                }
            </div>
            <div style={{flexGrow:1}}></div>
            <div className={style.botBox}>todo...</div>
        </div>
    )
}

export default Doc
