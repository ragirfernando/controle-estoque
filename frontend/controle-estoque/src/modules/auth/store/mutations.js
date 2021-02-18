import * as types from './mutation-types'

export default{
    [types.SET_USER] (state, playload){
        state.user = playload
    },
    [types.SET_TOKEN] (state, playload){
        state.token = playload
    }
}