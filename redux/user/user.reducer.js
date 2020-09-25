import userActionTypes from './user.types'

const INITIAL_STATE = {
    user: null
}

const userReducer = (state = INITIAL_STATE,action) => {
    switch(action.type){
        case userActionTypes.ADD_LOGIN_USER:
            return{
                ...state,
                user: action.payload
            }
        default:
            return{
                ...state
            }
    }
}

export default userReducer