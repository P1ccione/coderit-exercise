<template>
    <h1>YOU ARE NOT ALLOWED TO ACCESS THAT PAGE</h1>
    <Button buttoncolor="black" buttontext="GO BACK HOME" style="margin-top: 45px;" to="/" />
</template>

<script>
    import Button from '../components//Button.vue';
    export default {
        name: "Forbidden",
        components: {
            Button
        }
    }
</script>

<style scoped>

</style>