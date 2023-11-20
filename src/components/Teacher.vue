<template>
    <div class="teacher-card">
        <div class="column-content">{{ teacher.firstname }}</div>
        <div class="column-content">{{ teacher.lastname }}</div>
        <div class="column-content">{{ teacher.email }}</div>
        <div class="column-content">{{ teacher.phonenumber }}</div>
        <div class="buttons-group">
            <Button btnheight="40px" btnwidth="40px" @btn-click="$emit('toggle-edit-teacher', teacher)">
                <template #icon>
                    <img src="../assets/edit_icon.svg" alt="">
                </template>
            </Button>
            <Button btnheight="40px" btnwidth="40px" @btn-click="$emit('delete-teacher', teacher.id)" color="red">
                <template #icon>
                    <img src="../assets/delete_icon.svg" alt="">
                </template>
            </Button>
        </div>
    </div>
</template>

<script>

    import Button from "./Button"

    export default {
        name: "Teacher",
        components: {
            Button,
        },
        props: {
            teacher: {
                type: Object
            }
        },
    }
</script>

<style scoped>

    .teacher-card {
        width: auto;
        height: 50px;
        display: flex;
        align-items: center;
    }

    .column-content {
        width: 200px;
        height: 100%;
        border: .3px solid rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .buttons-container {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        row-gap: 10px;
    }
    .buttons-group {
        width: 125px;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 10px;
    }
</style>