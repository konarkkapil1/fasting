import userActionTypes from './user.types'

export const setCurrentUser = user => ({
    type: userActionTypes.ADD_LOGIN_USER,
    payload: user
})