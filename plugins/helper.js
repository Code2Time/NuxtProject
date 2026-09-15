export class Helper {
    constructor(ctx) {
        this.ctx = ctx
    }

    toEnglishDigits(value) {
        return String(value || '').replace(/[۰-۹]/g, (digit) => {
            return '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)
        })
    }

    parseNumericPrice(value) {
        if (value === null || value === undefined) {
            return 0
        }

        const normalized = this.toEnglishDigits(value)
        const numericValue = normalized.replace(/[^0-9]/g, '')

        return parseInt(numericValue, 10) || 0
    }

    formatPrice(value) {
        return this.parseNumericPrice(value).toLocaleString('fa-IR')
    }

    getProductId(product) {
        if (!product) {
            return null
        }

        return (
            product.id ||
            product.productId ||
            product.product_id ||
            product._id ||
            null
        )
    }
}

export default (ctx, inject) => {
    inject('helper', new Helper(ctx))
}