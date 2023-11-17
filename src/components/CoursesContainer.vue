<template>
    <div class="courses-container">
        <Button @btn-click="$emit('toggle-create-course')" text="CREATE COURSE" />
        <div class="columnsNames">
            <div class="columnName">Course name</div>
            <div class="columnName">Course duration</div>
            <div class="columnName">Course participants</div>
        </div>
        <div :key="course.id" v-for="course in courses">
            <Course :course = "course" @toggle-edit-course="$emit('toggle-edit-course', course)" @delete-course="$emit('delete-course', course.id)"/>
        </div>
    </div>
</template>

<script>
    import Course from "./Course"
    import Button from "./Button"

    export default {
        name: "CoursesContainer",
        components: {
            Course,
            Button,
        },
        props: {
            courses: {
                type: Array
            }
        },
    }
</script>

<style scoped>
    .courses-container {
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