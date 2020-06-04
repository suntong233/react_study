
const defaultState = {
    UserInfo: {}
}

export default (state=defaultState, action) => {
    switch (action.type) {
        case "getUserInfo": 
            return {...state,UserInfo:action.value}
        default:
            return state
    }
}
