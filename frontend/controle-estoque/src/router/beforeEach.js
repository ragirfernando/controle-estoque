import store from '../store'

export default async (to, from, next) => {
    console.log(to)
    document.title = `${to.name} - Series Wished`

    if (to.name !== 'login' && !store.getters['auth/hasToken']) {
        try {
            await store.dispatch('auth/ActionCheckToken')

            next({ path: to.name })
        } catch (err) {
            next({ name: 'login' })
        }
    } else {
        if (to.name === 'login' && store.getters['auth/hasToken']) {
            next({ name: 'home' })
        } else {
            next()
        }
    }
}
