function parseNumericPrice(value) {
    if (value === null || value === undefined || value === '') {
        return 0
    }

    const Value = String(value)
    const onlyDigits = Value.replace(/[^0-9]/g, '')

    return parseInt(onlyDigits, 10) || 0
}


function formatPrice(value) {
    const price = parseNumericPrice(value)
    return price.toLocaleString('fa-IR')
}

function getProductId(product) {
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

export default function (_, inject) {
    inject('helper', {
        parseNumericPrice,
        formatPrice,
        getProductId
    })
}