<template>
    <v-text-field
        :dir="dir"
        :value="value"
        :type="computedType"
        :label="label"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :clearable="clearable"
        :counter="counter"
        :maxlength="maxlength"
        :loading="loading"
        :error="error"
        :error-messages="errorMessages"
        :success="success"
        :success-messages="successMessages"
        :append-icon="appendIcon"
        :append-outer-icon="appendOuterIcon"
        :prepend-icon="prependIcon"
        :prepend-inner-icon="computedPrependInnerIcon"
        :autofocus="autofocus"
        :outlined="outlined"
        :filled="filled"
        :dense="dense"
        :shaped="shaped"
        :solo="solo"
        :rules="computedRules"
        :rounded="rounded"
        :flat="flat"
        :dark="dark"
        :class="['glass-input', cClass]"
        v-on="inputListeners"
        @click:prepend-inner="handlePrependInnerClick"
    >
    </v-text-field>
</template>

<script>
export default {
    name: 'BaseInput',
    inheritAttrs: false,

    props: {

        dir: {
            type: String,
            default: 'rtl'
        },

        value: { 
            type: [String, Number], 
            default: '' 
        },
        
        type: { 
            type: String, 
            default: 'text' 
        },
        
        showPasswordToggle: { 
            type: Boolean, 
            default: true 
        },
        
        label: { 
            type: String, 
            default: undefined 
        },
        
        placeholder: { 
            type: String, 
            default: undefined 
        },
        
        rules: { 
            type: [Array, String], 
            default: () => [] 
        },
        
        disabled: { 
            type: Boolean, 
            default: false 
        },
        
        readonly: { 
            type: Boolean, 
            default: false 
        },
        
        clearable: { 
            type: Boolean, 
            default: false 
        },
        
        counter: { 
            type: [Boolean, Number, String], 
            default: undefined 
        },
        
        maxlength: { 
            type: [Number, String], 
            default: undefined 
        },
        
        loading: { 
            type: [Boolean, String], 
            default: false 
        },
        
        error: { 
            type: Boolean, 
            default: false 
        },
        
        errorMessages: { 
            type: [String, Array], 
            default: () => [] 
        },
        
        success: { 
            type: Boolean, 
            default: false 
        },
        
        successMessages: { 
            type: [String, Array], 
            default: () => [] 
        },
        
        required: { 
            type: Boolean, 
            default: false 
        },
        
        appendIcon: { 
            type: String, 
            default: undefined 
        },
        
        appendOuterIcon: { 
            type: String, 
            default: undefined 
        },
        
        prependIcon: { 
            type: String, 
            default: undefined 
        },
        
        prependInnerIcon: { 
            type: String, 
            default: undefined 
        },
        
        solo: { 
            type: Boolean, 
            default: true 
        },
        
        rounded: { 
            type: Boolean, 
            default: true 
        },
        
        flat: { 
            type: Boolean, 
            default: true 
        },
        
        
        dark: { 
            type: Boolean, 
            default: true 
        },
        
        outlined: { 
            type: Boolean, 
            default: false 
        },
        
        filled: { 
            type: Boolean, 
            default: false 
        },
        
        dense: { 
            type: Boolean, 
            default: false 
        },
        
        shaped: { 
            type: Boolean, 
            default: false 
        },
        
        autofocus: { 
            type: Boolean, 
            default: false 
        },

        cClass: {
            type: [String, Array, Object],
            default: ''
        }
    },

    data() {
        return {
            showPassword: false
        }
    },

    computed: {
        computedType() {
            if (this.type === 'password' && this.showPasswordToggle) {
                return this.showPassword ? 'text' : 'password'
            }
            return this.type
        },

        computedPrependInnerIcon() {
            if (this.type === 'password' && this.showPasswordToggle) {
                return this.showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
            }
            return this.prependInnerIcon
        },

        inputListeners() {
            return {
                ...this.$listeners,
                input: (event) => this.$emit('input', event)
            }
        },

        computedRules() {
            return this.$parseRules(this.rules)
        }
    },

    methods: {
        handlePrependInnerClick(e) {
            if (this.type === 'password' && this.showPasswordToggle) {
                this.showPassword = !this.showPassword
            }
            this.$emit('click:prepend-inner', e)
        }
    }
}
</script>

<style scoped>
.glass-input ::v-deep .v-input__slot {
    background: rgba(30, 41, 59, 0.7) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    backdrop-filter: blur(10px);
    border-radius: 10px !important;
    transition: all 0.2s ease;
}

.glass-input.v-input--is-focused ::v-deep .v-input__slot {
    border-color: #3b82f6 !important;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3) !important;
    background: rgba(30, 41, 59, 0.9) !important;
}

.glass-input ::v-deep input {
    color: #ffffff !important;
    font-size: 1rem !important;
    font-weight: 500 !important;
    direction: inherit;
    text-align: inherit;
}

.glass-input ::v-deep .v-label {
    color: #94a3b8 !important;
    right: 12px !important;
    left: auto !important;
}

.glass-input.v-input--is-focused ::v-deep .v-label {
    color: #60a5fa !important;
}

.glass-input ::v-deep .v-icon {
    color: #94a3b8 !important;
}

.glass-input.v-input--is-focused ::v-deep .v-icon {
    color: #60a5fa !important;
}

.glass-input ::v-deep .v-input__append-inner {
    margin-left: 0 !important;
    margin-right: 12px !important;
}

.glass-input ::v-deep .v-input__prepend-inner {
    margin-right: 0 !important;
    margin-left: 12px !important;
}

.glass-input ::v-deep input::placeholder {
    color: #64748b !important;
    direction: inherit;
    text-align: inherit;
}

.glass-input ::v-deep .v-text-field__details,
.glass-input ::v-deep .v-messages,
.glass-input ::v-deep .v-messages__message {
    direction: rtl !important;
    text-align: right !important;
}
</style>