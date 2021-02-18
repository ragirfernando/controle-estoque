import services from '@/http'
import * as storage from '../storage'
import * as types from './mutation-types'



export const ActionDoLogin = ({ dispatch }, playload) => {
    return services.auth.login(playload).then(res => {
        dispatch('ActionSetUser', res.data.user);
        dispatch('ActionSetToken', res.data.token);
    })
}

export const ActionCheckToken = ({ dispatch, state }) => {
    if (state.token) {
      return Promise.resolve(state.token)
    }
  
    const token = storage.getLocalToken()
  
    if (!token) {
      return Promise.reject(new Error('Token Inválido'))
    }
  
    dispatch('ActionSetToken', token)
    return dispatch('ActionLoadSession')
  }

export const ActionLoadSession = ({ dispatch }) => {
    return new Promise( (resolve, reject) => {
        try {
            const { data: { token, user } } =  services.auth.loadSession();
            dispatch('ActionSetUser', user);
            dispatch('ActionSetToken', token);
            resolve()
        } catch (err) {
            dispatch('ActionSignOut')
            reject(err)
        }
    })
}

export const ActionSetUser = ({ commit }, playload) => {
    commit(types.SET_USER, playload)
}

export const ActionSetToken = ({ commit }, playload) => {
    storage.setLocalToken(playload)
    storage.setHeaderToken(playload)
    commit(types.SET_TOKEN, playload)
}

export const ActionSignOut = ({ dispatch }) => {
    storage.setHeaderToken('')
    storage.deleteLocalToken()
    dispatch('ActionSetUser', {})
    dispatch('ActionSetToken', '')
  }