<template>
    <button :style="{width: btnwidth, height: btnheight, background: color}" @click="onClick()" class="btn">
        {{ text }}
    </button>
</template>

<script>
import { setBlockTracking } from 'vue';

export default {
    name: "Button",
    props: {
        text: {
            type: String
        },
        btnheight: {
            type: String,
            default: "50px"
        },
        btnwidth: {
            type: String,
            default: "200px"
        },
        color: {
            type: String,
            default: "black"
        }
    },
    methods: {
        onClick() {
            this.$emit('btn-click');
        }
    }
}
</script>

<style scoped>
    .btn {
        /* outline: 1px orange solid; */
        border-radius: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        outline: none;
        border: none;
        padding-left: 10px;
        padding-right: 10px;
        color: white
    }

</style>