<template>
    <v-alert
        v-if="message"
        :type="type"
        :dismissible="dismissible"
        :dense="dense"
        :outlined="outlined"
        :border="border"
        :icon="icon"
        :class="alertClass"
        v-bind="$attrs"
        v-on="$listeners"
    >
        {{ message }}
    </v-alert>
</template>

<script>
export default {
    name: 'BaseAlert',
    inheritAttrs: false,

    props: {
        message: { 
            type: String, 
            default: '' 
        },
        
        type: { 
            type: String, 
            default: 'error', 
            validator: (val) => ['error', 'success', 'warning', 'info'].includes(val)
        },
        
        dismissible: { 
            type: Boolean, 
            default: true 
        },
        
        dense: { 
            type: Boolean, 
            default: true 
        },
        
        outlined: { 
            type: Boolean, 
            default: false 
        },
        
        border: { 
            type: String, 
            default: undefined 
        },
        
        icon: { 
            type: String, 
            default: undefined 
        }
    },

    computed: {
        alertClass() {
            return [
                'rounded-lg',
                `glass-alert-${this.type}`,
                this.$attrs.class
            ]
        }
    }
}
</script>

<style scoped>
.glass-alert-error,
.glass-alert-success {
    display: flex !important;
    align-items: center !important;
    text-align: right !important;
    padding: 10px 14px !important;
    color: #ffffff !important;
    font-size: 0.95rem !important;
    font-weight: 600 !important;
}

.glass-alert-error {
    background: rgba(180, 20, 20, 0.85) !important;
    border: 1px solid #ff4d4d !important;
}

.glass-alert-success {
    background: rgba(20, 120, 50, 0.85) !important;
    border: 1px solid #4caf50 !important;
}

.glass-alert-error ::v-deep .v-alert__wrapper,
.glass-alert-success ::v-deep .v-alert__wrapper {
    display: flex !important;
    align-items: center !important;
    width: 100% !important;
}

.glass-alert-error ::v-deep .v-alert__dismissible,
.glass-alert-success ::v-deep .v-alert__dismissible {
    order: -1 !important;
    margin-left: 10px !important;
    margin-right: -4px !important;
}

.glass-alert-error ::v-deep .v-icon,
.glass-alert-error ::v-btn,
.glass-alert-success ::v-deep .v-icon,
.glass-alert-success ::v-btn {
    color: #ffffff !important;
}
</style>