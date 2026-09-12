const FAVORITES_KEY = 'user_favorites'
const CART_KEY = 'user_cart'

export class Helper {
    constructor(ctx) {
        this.ctx = ctx
    }

    getFavorites() {
        if (process.client) {
            const saved = localStorage.getItem(FAVORITES_KEY)
            return saved ? JSON.parse(saved) : []
        }
        return []
    }

    isFavorite(productId) {
        const favorites = this.getFavorites()
        return favorites.some((item) => item.id === productId)
    }

    toggleFavorite(product) {
        if (!process.client) return

        const favorites = this.getFavorites()
        const existsIndex = favorites.findIndex((item) => item.id === product.id)

        if (existsIndex > -1) {
            favorites.splice(existsIndex, 1)
            if (this.ctx.$toast) {
                this.ctx.$toast.info('محصول از لیست علاقه‌مندی‌ها حذف شد.')
            }
        } else {
            favorites.push(product)
            if (this.ctx.$toast) {
                this.ctx.$toast.success('محصول به لیست علاقه‌مندی‌ها اضافه شد.')
            }
        }

        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))

        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('favorites-updated'))
        }
    }

    removeFromFavorites(productId) {
        if (!process.client) return

        const favorites = this.getFavorites()
        const updatedFavorites = favorites.filter((item) => item.id !== productId)
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites))

        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('favorites-updated'))
        }

        if (this.ctx.$toast) {
            this.ctx.$toast.info('محصول از لیست علاقه‌مندی‌ها حذف شد.')
        }
    }

    getFavoriteCount() {
        return this.getFavorites().length
    }

    getCart() {
        if (process.client) {
            const saved = localStorage.getItem(CART_KEY)
            return saved ? JSON.parse(saved) : []
        }
        return []
    }

    addToCart(product, quantity = 1) {
        if (!process.client) return

        const cart = this.getCart()
        const existsIndex = cart.findIndex((item) => item.id === product.id)

        if (existsIndex > -1) {
            cart[existsIndex].quantity = (cart[existsIndex].quantity || 1) + quantity
        } else {
            cart.push({ ...product, quantity })
        }

        localStorage.setItem(CART_KEY, JSON.stringify(cart))

        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('cart-updated'))
        }

        if (this.ctx.$toast) {
            this.ctx.$toast.success('محصول با موفقیت به سبد خرید اضافه شد.')
        }
    }

    updateCartQuantity(productId, quantity) {
        if (!process.client) return

        const cart = this.getCart()
        const item = cart.find((i) => i.id === productId)

        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId)
                return
            }
            item.quantity = quantity
            localStorage.setItem(CART_KEY, JSON.stringify(cart))

            if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('cart-updated'))
            }
        }
    }

    removeFromCart(productId) {
        if (!process.client) return

        const cart = this.getCart()
        const updatedCart = cart.filter((item) => item.id !== productId)
        localStorage.setItem(CART_KEY, JSON.stringify(updatedCart))

        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('cart-updated'))
        }

        if (this.ctx.$toast) {
            this.ctx.$toast.info('محصول از سبد خرید حذف شد.')
        }
    }

    clearCart() {
        if (!process.client) return

        localStorage.removeItem(CART_KEY)

        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('cart-updated'))
        }
    }

    getCartCount() {
        const cart = this.getCart()
        return cart.reduce((total, item) => total + (item.quantity || 1), 0)
    }

    getCartTotal() {
        const cart = this.getCart()
        return cart.reduce(
            (total, item) => total + (item.price || 0) * (item.quantity || 1),
            0
        )
    }
}

export default (ctx, inject) => {
    const helper = new Helper(ctx)
    inject('helper', helper)
}