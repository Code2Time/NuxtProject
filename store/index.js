// store/index.js

// تابع کمکی برای تبدیل اعداد فارسی/عربی به انگلیسی و استخراج عدد
function parseNumericPrice(value) {
  if (value === null || value === undefined) return 0
  const strValue = String(value)
    .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
    .replace(/[0-9]/g, (d) => '0123456789'.indexOf(d))
    .replace(/[^0-9]/g, '')
  return parseInt(strValue, 10) || 0
}

function saveCartToLocalStorage(state, rootState) {
  if (process.client) {
    const userPhone = rootState.auth?.user?.phone || 'guest_user'
    localStorage.setItem(`cart_${userPhone}`, JSON.stringify(state.cart))
  }
}

function saveFavoritesToLocalStorage(state, rootState) {
  if (process.client) {
    const userPhone = rootState.auth?.user?.phone || 'guest_user'
    localStorage.setItem(`favorites_${userPhone}`, JSON.stringify(state.favorites))
  }
}

export const state = () => ({
  cart: [],
  favorites: []
})

export const getters = {
  cartItems: (state) => state.cart,
  cartTotalCount: (state) => state.cart.reduce((total, item) => total + (item.quantity || 1), 0),
  cartTotalPrice: (state) => {
    return state.cart.reduce((total, item) => {
      const rawPrice = item.price ?? item.unitPrice ?? item.unit_price ?? item.totalPrice ?? item.amount ?? item.product?.price ?? 0
      const numericPrice = parseNumericPrice(rawPrice)
      return total + numericPrice * (item.quantity || 1)
    }, 0)
  },

  // Getters برای علاقه‌مندی‌ها
  favoriteItems: (state) => state.favorites,
  favoritesCount: (state) => state.favorites.length,
  isFavorite: (state) => (productId) => {
    return state.favorites.some((item) => (item.id || item.productId || item._id) === productId)
  }
}

export const mutations = {
  // Cart Mutations
  ADD_TO_CART(state, product) {
    const itemKey = product.id || product.productId || product.product_id || product._id
    const existingItem = state.cart.find((item) => (item.id || item.productId || item.product_id || item._id) === itemKey)
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1
    } else {
      state.cart.push({ ...product, quantity: product.quantity || 1 })
    }
  },

  REMOVE_FROM_CART(state, productId) {
    state.cart = state.cart.filter((item) => (item.id || item.productId || item.product_id || item._id) !== productId)
  },

  UPDATE_QUANTITY(state, { productId, quantity }) {
    const item = state.cart.find((i) => (i.id || i.productId || i.product_id || i._id) === productId)
    if (item && quantity > 0) {
      item.quantity = quantity
    }
  },

  SET_CART(state, cartData) {
    state.cart = cartData || []
  },

  // Favorites Mutations
  TOGGLE_FAVORITE(state, product) {
    const prodId = product.id || product.productId || product._id
    const index = state.favorites.findIndex((item) => (item.id || item.productId || item._id) === prodId)
    if (index > -1) {
      state.favorites.splice(index, 1)
    } else {
      state.favorites.push(product)
    }
  },

  REMOVE_FROM_FAVORITES(state, productId) {
    state.favorites = state.favorites.filter((item) => (item.id || item.productId || item._id) !== productId)
  },

  SET_FAVORITES(state, favoritesData) {
    state.favorites = favoritesData || []
  }
}

export const actions = {
  // Cart Actions
  addToCart({ commit, state, rootState }, product) {
    commit('ADD_TO_CART', product)
    saveCartToLocalStorage(state, rootState)
    return true
  },

  removeFromCart({ commit, state, rootState }, productId) {
    commit('REMOVE_FROM_CART', productId)
    saveCartToLocalStorage(state, rootState)
  },

  updateQuantity({ commit, state, rootState }, payload) {
    commit('UPDATE_QUANTITY', payload)
    saveCartToLocalStorage(state, rootState)
  },

  loadUserCart({ commit, rootState }) {
    if (process.client) {
      const userPhone = rootState.auth?.user?.phone || 'guest_user'
      const savedCart = localStorage.getItem(`cart_${userPhone}`)
      if (savedCart) {
        try {
          commit('SET_CART', JSON.parse(savedCart))
        } catch (e) {
          console.error('Error loading cart from localStorage', e)
          commit('SET_CART', [])
        }
      } else {
        commit('SET_CART', [])
      }
    }
  },

  // Favorites Actions
  toggleFavorite({ commit, state, rootState }, product) {
    commit('TOGGLE_FAVORITE', product)
    saveFavoritesToLocalStorage(state, rootState)
  },

  removeFromFavorites({ commit, state, rootState }, productId) {
    commit('REMOVE_FROM_FAVORITES', productId)
    saveFavoritesToLocalStorage(state, rootState)
  },

  loadUserFavorites({ commit, rootState }) {
    if (process.client) {
      const userPhone = rootState.auth?.user?.phone || 'guest_user'
      const savedFavorites = localStorage.getItem(`favorites_${userPhone}`)
      if (savedFavorites) {
        try {
          commit('SET_FAVORITES', JSON.parse(savedFavorites))
        } catch (e) {
          console.error('Error loading favorites from localStorage', e)
          commit('SET_FAVORITES', [])
        }
      } else {
        commit('SET_FAVORITES', [])
      }
    }
  }
}