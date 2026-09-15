```vue
<template>
    <v-btn
        :loading="loading"
        :disabled="disabled"
        :type="type"
        :color="color"
        :block="block"
        :x-large="xLarge"
        :large="large"
        :small="small"
        :rounded="rounded"
        :depressed="depressed"
        :outlined="outlined"
        :class="[
            'white--text',
            'text-none',
            'elevation-0',
            cClass
        ]"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <slot></slot>
    </v-btn>
</template>

<script>
export default {
    name: 'BaseButton',
    inheritAttrs: false,

    props: {
        loading: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'button'
        },
        color: {
            type: String,
            default: 'orange darken-4'
        },
        block: {
            type: Boolean,
            default: true
        },
        xLarge: {
            type: Boolean,
            default: true
        },
        large: {
            type: Boolean,
            default: false
        },
        small: {
            type: Boolean,
            default: false
        },
        rounded: {
            type: Boolean,
            default: true
        },
        depressed: {
            type: Boolean,
            default: true
        },
        outlined: {
            type: Boolean,
            default: false
        },
        cClass: {
            type: [String, Array, Object],
            default: ''
        }
    }
}
</script>