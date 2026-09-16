function parseNumericPrice(value) {
    if (value === null || value === undefined || value === '') {
        return 0
    }

    const englishValue = String(value)
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹'
    const arabicDigits = '٠١٢٣٤٥٦٧٨٩'
    const converted = englishValue
        .replace(/[۰-۹]/g, (d) => persianDigits.indexOf(d))
        .replace(/[٠-٩]/g, (d) => arabicDigits.indexOf(d))

    const onlyDigits = converted.replace(/[^0-9]/g, '')

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