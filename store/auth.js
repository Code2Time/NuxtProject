const toEnglishDigits = (str) => {
    return String(str || '').replace(
        /[۰-۹]/g,
        (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)
    )
}

export const state = () => ({
    token: null,
    user: null
})

export const mutations = {
    SET_TOKEN(state, token) {
        state.token = token
    },

    SET_USER(state, user) {
        state.user = user
    },

    LOGOUT(state) {
        state.token = null
        state.user = null
    }
}

export const actions = {
    initAuth({ commit }) {
        if (process.client) {
            const token = localStorage.getItem('user_token')
            const userInfo = localStorage.getItem('user_info')

            if (token && userInfo) {
                const user = JSON.parse(userInfo)

                commit('SET_TOKEN', token)
                commit('SET_USER', user)
            }
        }
    },

    login({ commit }, credentials) {
        return new Promise((resolve, reject) => {
              const inputPhone = toEnglishDigits(credentials.phone).trim()
              const inputPassword = String(credentials.password).trim()
              const isValidPhone = inputPhone === '09111111111'
              const isValidPassword = inputPassword === '12345678'

              if (isValidPhone && isValidPassword) {
                  const token = 'mock-token-123456'
                  const userInfo = { fullName: 'مدیر سیستم', phone: inputPhone, role: 'کاربر آنلاین'}

                  commit('SET_TOKEN', token)
                  commit('SET_USER', userInfo)

                  if (process.client) {
                      localStorage.setItem('user_token', token)
                      localStorage.setItem('user_info', JSON.stringify(userInfo))
                  }
                  resolve({ success: true })
              } else {
                  reject( new Error( 'شماره موبایل یا رمز عبور اشتباه است.'))
              }
        })
    },

    logout({ commit }) {
        commit('LOGOUT')

        if (process.client) {
            localStorage.removeItem('user_token')
            localStorage.removeItem('user_info')
        }
    }
}

export const getters = {
    isAuthenticated: (state) => !!state.token || !!state.user,
    currentUser: (state) => state.user
}