<template>
    <div class="teachers-container">
        <Button @btn-click="$emit('toggle-create-teacher')" text="CREATE TEACHER" />
        <div class="columnsNames">
            <div class="columnName">First name</div>
            <div class="columnName">Last name</div>
            <div class="columnName">Email</div>
            <div class="columnName">Phone number</div>
        </div>
        <div :key="teacher.id" v-for="teacher in teachers">
            <Teacher :teacher = "teacher" @toggle-edit-teacher="$emit('toggle-edit-teacher', teacher)" @delete-teacher="$emit('delete-teacher', teacher.id)"/>
        </div>
    </div>
</template>

<script>
    import Teacher from "./Teacher"
    import Button from "./Button"

    export default {
        name: "TeachersContainer",
        components: {
            Teacher,
            Button,
        },
        props: {
            teachers: {
                type: Array
            }
        },
    }
</script>

<style scoped>
    .teachers-container {
        padding-top: 50px;
        width: auto;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
    }

    .columnsNames {
        width: auto;
        height: 50px;
        display: flex;
        margin-top: 30px
    }

    .columnName {
        width: 200px;
        height: 100%;
        border: .3px solid rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>