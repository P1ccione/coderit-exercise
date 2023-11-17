<template>
    <Button @btn-click="$emit('toggle-create-assignment')" text="CLOSE FORM" />
    <form @submit="submitForm">
        <div class="input-container">
            <label for="idcourse">Course</label>
            <select name="idcourse" id="idcourse" v-model="idcourse">
                <option :key="course.id" v-for="course in courses" :value="course.id">{{ course.coursename }}</option>
            </select>
        </div>
        <div class="input-container">
            <label for="idteacher">Teacher</label>
            <select name="idteacher" id="idteacher" v-model="idteacher">
                <option :key="teacher.id" v-for="teacher in teachers" :value="teacher.id">{{ teacher.firstname }} {{ teacher.lastname }}</option>
            </select>
        </div>
        <input type="submit" value="CREATE ASSIGNMENT"/>
    </form>
</template>

<script>
import Button from "./Button";

export default {
    name: "AddAssignmentForm",
    data() {
        return {
            idcourse: null,
            idteacher: null,
        };
    },
    props: {
        courses: {
            type: Array,
            required: true,
        },
        teachers: {
            type: Array,
            required: true,
        },
    },
    components: {
        Button,
    },
    methods: {
        submitForm(e) {
            e.preventDefault();
            if (!this.idcourse) {
                alert("Please select a course");
                return;
            } else if (!this.idteacher) {
                alert("Please select a teacher");
                return;
            }
            const newAssignment = {
                idteacher: this.idteacher,
                idcourse: this.idcourse,
            };
            console.log(newAssignment);
            this.$emit("create-assignment", newAssignment);

            this.idteacher = null;
            this.idcourse = null;
        },
    },
};
</script>
             
<style scoped>
    form {
        width: auto;
        min-width: 400px;
        background: ghostwhite;
        display: flex;
        justify-content: center;
        align-items: center;
        height: auto;
        padding-bottom: 40px;
        padding-top: 40px;
        flex-direction: column;
        row-gap: 10px;
        border-radius: 50px;
    }

    form .input-container {
        display: flex;
        flex-direction: column;
    }

    form select, input {
        width: 200px;
        height: 35px;
        padding-left: 10px;
    }

    form input[type="submit"] {
        cursor: pointer;
        background-color: black;
        color: white;
        border-radius: 50px;
        outline: none;
        border: none;
        height: 50px;
    }
</style>