<script>
    import { Icon } from '@iconify/vue';
    export default {
        name: "Alert",
        components: {
            Icon,
        },
        pops: {
            title: {
                type: String
            },
            text: {
                type: String
            },
            color: {
                type: String
            },
        }
    }
</script>

<template>
    <v-alert class="alert"
        density="compact"
        :color="color"
        :title="title"
        :text="text"
        role="alert"
    >
        <Icon icon="ri:alert-fill" width="30" height="30" class="alert-icon" />
    </v-alert>
</template>

<style scoped>
    .alert{
        max-width: 500px;
        height: fit-content;
        padding-left: 60px;
        padding-right: 20px;
        position: relative;
        line-break: break-all;
    }
    .alert-icon {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
    }
    
</style>