<script>
    import { Icon } from '@iconify/vue';
    export default {
        name: "Button",
        props: {
            buttonheight: {
                type: Number
            },
            buttonheight: {
                type: Number
            },
            buttoncolor: {
                type: String
            },
            buttontext: {
                type: String
            }
        },
        components: {
            Icon,
        },
        methods: {
            onClick() {
                this.$emit('btn-click');
            }
        }
    }
</script>

<template>
    <v-btn :color="buttoncolor" @click="onClick()"><slot name="icon"></slot>{{ buttontext }}<slot name="tooltip"></slot></v-btn>
</template>

<style scoped>

</style>