<template>
    <div class="alert-container">
        <p class="alert-text">{{ alertText }}</p>
    </div>
</template>

<script>
    export default {
        name: "Alert",
        props: {
            alertText: {
                type: String,
                default: "ALERT",
            },
        },
    }
</script>

<style scoped>
    .alert-container {
        position: absolute;
        top: 20px;
        width: auto;
        min-width: 300px;
        background: white;
        border: 2px solid red;
        border-radius: 50px;
        min-height: 50px;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        z-index: 1000
    }

    .alert-text {
        color: red;
        display: flex;
        flex-wrap: wrap;
        max-width: 350px;
        height: auto;
        justify-content: center;
        align-items: center;
        text-align: center;
         word-break: break-all;
    }
</style>