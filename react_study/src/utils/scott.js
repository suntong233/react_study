
// 功能 css样式动态化
const easyClassNames = (...args) => {
    args = [...args]
    args = args.map( v => {
        let ret = ""
        if (typeof v === "string"){ret = v}
        if (Array.isArray(v)){ret = v.join(" ")}
        if (typeof v === "object"){
            for (var key in v) {
                if(v[key]){ ret += `${key} ` }
            }
        }
        return ret
    })
    return args.join(" ")
}
export {
    easyClassNames
}