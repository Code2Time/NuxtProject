const rules_map = {
    required: (v) => !!v || 'این فیلد الزامی است',
    phone: (v) => !v || /^09\d{9}$/.test(v) || 'شماره موبایل معتبر نیست',
    email: (v) => !v || /.+@+\..+/.test(v) || 'ایمیل معتبر نیست',
    min8: (v) => !v || (v && v.length >= 8) || 'حداقل باید 8 کارکتر باشد'
}

export default (context, inject) => {
    const parseRules = (rules_input) => {
        if (!rules_input) return []
        if (Array.isArray(rules_input)) return rules_input
        return rules_input
            .split(',')
            .map(rule => rules_map[rule.trim()])
            .filter(Boolean)
    }

    inject('parseRules', parseRules)
}