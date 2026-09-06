const rulesMap = {
    required: (v) => !!v || 'این فیلد الزامی است',
    phone: (v) => !v || /^09\d{9}$/.test(v) || 'شماره موبایل معتبر نیست',
    email: (v) => !v || /.+@+\..+/.test(v) || 'ایمیل معتبر نیست',
    min8: (v) => !v || (v && v.length >= 8) || 'حداقل باید 8 کارکتر باشد'
}

export default(context, inject) => {
    const parseRules = (rulesInput) => {
        if (!rulesInput) return []
        if (Array.isArray(rulesInput)) return rulesInput
        return rulesInput
            .split(',')
            .map(rule => rulesMap[rule.trim()])
            .filter(Boolean)
    }

    inject('parseRules', parseRules)
}