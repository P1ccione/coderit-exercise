<template>
    <header>
        <div class="logo">TEACH-LINKER</div>
        <div class="links">
            <router-link to="/teachers">TEACHERS</router-link>
            <router-link to="/courses">COURSES</router-link>
            <router-link to="/assignments">ASSIGNMENTS</router-link>
        </div>
    </header>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
    header {
        width: 100%;
        height: 12vh;
        display: flex;
        justify-content: space-between;
        align-content: center;
        align-items: center;
        padding-left: 60px;
        padding-right: 60px;
    }

    .logo {
        font-size: 1.5rem;
        font-weight: 600;
        cursor: default;
    }

    .links {
        width: auto;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 60px;
        color: black;
        text-decoration:none;
        list-style: none;
    }

    .links router-link:hover {
        text-decoration:underline;
    }
</style>