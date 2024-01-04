<template>
    <div style="margin-top: 47px; margin-bottom: 50px; min-height: 350px;">
        <h1>{{ $t('forbidden_page') }}</h1>
        <Button buttoncolor="black" :buttontext="$t('forbidden_button')" style="margin-top: 45px;" to="/" />
    </div> 
</template>

<script>
    import Button from '../components/Button.vue';
    import { useI18n } from 'vue-i18n';
    export default {
        name: "Forbidden",
        components: {
            Button
        },
        setup() {
            const { t } = useI18n() // use as global scope
            return {
                t
            }
        },
    }
</script>

<style scoped>

</style>