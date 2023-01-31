export const state = () => ({
    type: null,
    message: null,
    show: false,
})

export const mutations = {
    success(state, message) {
        state.type = 'success'
        state.message = message
    },
    error(state, message) {
        state.type = 'danger'
        state.message = message
        state.show = true
    },
    clear(state) {
        state.type = null
        state.message = null
        state.show = false
    }
}

export const actions = {
    success({ commit }, message) {
        commit('success', message)
    },
    error({ commit }, message) {
        commit('error', message)
    },
    clear({ commit }) {
        commit('clear')
    }
}