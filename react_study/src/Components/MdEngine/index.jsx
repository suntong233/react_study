import React from 'react'
import Style from './style.module.scss'

const marked = (str) => {   // 解析markdown文档为html标签
    if (str){
        str = str.replace(/</g,"&lt;")
        str = str.replace(/>/g,"&gt;")
        let titles = str.match(/#+ ([^\n]+)/g)
        if(titles && titles.length){
            [].forEach.call(titles,function(v){
                let v1 = /#+ (.+)/.exec(v)[1]
                str = str.replace(v,`<h4>${v1}</h4>`)
            })
        }
        let lists = str.match(/\n\*[^/]?([^\n]+)/g)
        if(lists && lists.length){
            [].forEach.call(lists,function(v){
                let v1 = /\n\*[^/]?([^\n]+)/.exec(v)[1]
                str = str.replace(v,`<li>${v1}</li>`)
            })
        }
        let pres = str.match(/```\s?[^\n]+\n[^\n]?([^`]+)```/g)
        if(pres && pres.length){
            [].forEach.call(pres,function(v){
                let v1 = /```\s?[^\n]+\n[^\n]?([^`]+)```/.exec(v)[1]
                str = str.replace(v,`<pre>${v1}</pre>`)
            })
        }
        return str
    }
    return "tmp"
}
const MdEngine = (props) => {
    const {data} = props
    return (
        <div className={Style.container}>
            <div className={Style.mdBox} dangerouslySetInnerHTML={{__html:marked(data)}}></div>
        </div>
    )
}

export default MdEngine
