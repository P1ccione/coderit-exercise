<template>
    <div style="margin-top: 47px; margin-bottom: 50px; min-height: 350px;">
        <h1>YOU ARE NOT ALLOWED TO ACCESS THAT PAGE</h1>
        <Button buttoncolor="black" buttontext="GO BACK HOME" style="margin-top: 45px;" to="/" />
    </div> 
</template>

<script>
    import Button from '../components/Button.vue';
    export default {
        name: "Forbidden",
        components: {
            Button
        }
    }
</script>

<style scoped>

</style>