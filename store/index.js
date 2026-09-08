export const state = () => ({
    isLoggedIn: false,
    cart: []
})

export const getters = {
    isLoggedIn: (state) => state.isLoggedIn,
    cartItems: (state) => state.cart,

    cartTotalCount: (state) =>
        state.cart.reduce((total, item) => total + item.quantity, 0),

    cartTotalPrice: (state) =>
        state.cart.reduce((total, item) => {
            const numericPrice =
                parseInt(
                    String(item.price)
                        .replace(/,/g, '')
                        .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)),
                    10
                ) || 0
            return total + numericPrice * item.quantity
        }, 0)
}

function saveCartToLocalStorage(state) {
    if (process.client && state.isLoggedIn) {
        const currentUser = localStorage.getItem('currentUser') || 'default_user'
        localStorage.setItem(`cart_${currentUser}`, JSON.stringify(state.cart))
    }
}

export const mutations = {
    SET_LOGIN_STATUS(state, status) {
        state.isLoggedIn = Boolean(status)
        if (process.client) {
            if (status) {
                localStorage.setItem('isLoggedIn', 'true')
            } else {
                localStorage.removeItem('isLoggedIn')
                state.cart = []
            }
        }
    },

    ADD_TO_CART(state, product) {
        const existingItem = state.cart.find((item) => item.id === product.id)
        if (existingItem) {
            existingItem.quantity++
        } else {
            state.cart.push({ ...product, quantity: 1 })
        }
        saveCartToLocalStorage(state)
    },

    REMOVE_FROM_CART(state, productId) {
        state.cart = state.cart.filter((item) => item.id !== productId)
        saveCartToLocalStorage(state)
    },

    UPDATE_QUANTITY(state, { productId, quantity }) {
        const item = state.cart.find((i) => i.id === productId)
        if (item && quantity > 0) {
            item.quantity = quantity
        }
        saveCartToLocalStorage(state)
    },

    SET_CART(state, cartData) {
        state.cart = cartData || []
    }
}

export const actions = {
    addToCart({ commit, state, dispatch }, product) {
        if (process.client) {
            const isAuth = localStorage.getItem('isLoggedIn') === 'true'
            commit('SET_LOGIN_STATUS', isAuth)
        }

        if (!state.isLoggedIn) {
            return false
        }

        commit('ADD_TO_CART', product)
        return true
    },

    login({ commit, dispatch }) {
        commit('SET_LOGIN_STATUS', true)
        dispatch('loadUserCart')
    },

    logout({ commit }) {
        commit('SET_LOGIN_STATUS', false)
    },

    checkAuth({ commit, dispatch }) {
        if (process.client) {
            const isAuth = localStorage.getItem('isLoggedIn') === 'true'
            commit('SET_LOGIN_STATUS', isAuth)
            if (isAuth) {
                dispatch('loadUserCart')
            }
        }
    },

    loadUserCart({ commit, state }) {
        if (process.client && state.isLoggedIn) {
            const currentUser = localStorage.getItem('currentUser') || 'default_user'
            const userCart = JSON.parse(localStorage.getItem(`cart_${currentUser}`) || '[]')
            commit('SET_CART', userCart)
        }
    }
}