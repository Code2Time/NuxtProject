export const state = () => ({
    token: null,
    user: null,
    userPassword: ''
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
        state.userPassword = ''
    },

    SET_USER_PASSWORD(state, password) {
        state.userPassword = password
    }
}

export const actions = {
    initAuth({ commit }) {
        if (process.client) {
            const token = localStorage.getItem('user_token')
            const userInfo = localStorage.getItem('user_info')
            const password = localStorage.getItem('user_password')

            if (token) commit('SET_TOKEN', token)
            if (userInfo) commit('SET_USER', JSON.parse(userInfo))
            if (password) commit('SET_USER_PASSWORD', password)
        }
    },

    register({ commit }, userData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (process.client) {
                    try {
                        const existingUsers = JSON.parse(localStorage.getItem('registered_users') || '[]')
                        const userExists = existingUsers.some(u => u.phone === userData.phone)

                        if (userExists) {
                            return reject(new Error('این شماره موبایل قبلاً ثبت شده است.'))
                        }

                        existingUsers.push(userData)
                        localStorage.setItem('registered_users', JSON.stringify(existingUsers))
                        resolve({ success: true })
                    } catch (error) {
                        reject(new Error('خطا در ذخیره‌سازی اطلاعات ثبت‌نام.'))
                    }
                } else {
                    reject(new Error('عملیات فقط در سمت کلاینت امکان‌پذیر است.'))
                }
            }, 800)
        })
    },

    login({ commit }, credentials) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (process.client) {
                    try {
                        const existingUsers = JSON.parse(localStorage.getItem('registered_users') || '[]')

                        if (existingUsers.length === 0) {
                            return reject(new Error('هیچ حسابی ثبت نشده است. لطفاً ابتدا ثبت نام کنید.'))
                        }

                        const user = existingUsers.find(
                            u => u.phone === credentials.phone && u.password === credentials.password
                        )

                        if (user) {
                            const token = 'mock-jwt-token-' + Date.now()
                            
                            // بررسی تمام نام‌های احتمالی ارسال شده از فرم ثبت‌نام
                            const extractedName = user.fullName || user.name || user.username || user.first_name || 'کاربر سیستم'

                            const userInfo = {
                                fullName: extractedName,
                                phone: user.phone || credentials.phone,
                                email: user.email || 'ثبت نشده',
                                role: user.role || 'کاربر عادی',
                                lastLogin: new Date().toLocaleDateString('fa-IR')
                            }

                            commit('SET_TOKEN', token)
                            commit('SET_USER', userInfo)
                            commit('SET_USER_PASSWORD', credentials.password)

                            localStorage.setItem('user_token', token)
                            localStorage.setItem('user_info', JSON.stringify(userInfo))
                            localStorage.setItem('user_password', credentials.password)

                            resolve({ success: true })
                        } else {
                            reject(new Error('شماره موبایل یا رمز عبور اشتباه است (یا هنوز ثبت نام نکرده‌اید).'))
                        }
                    } catch (error) {
                        reject(new Error('خطا در پردازش اطلاعات ورود.'))
                    }
                } else {
                    reject(new Error('عملیات فقط در سمت کلاینت امکان‌پذیر است.'))
                }
            }, 800)
        })
    },

    logout({ commit }) {
        commit('LOGOUT')
        if (process.client) {
            localStorage.removeItem('user_token')
            localStorage.removeItem('user_info')
            localStorage.removeItem('user_password')
        }
    }
}

export const getters = {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
    userPassword: (state) => state.userPassword || (process.client ? localStorage.getItem('user_password') : '')
}