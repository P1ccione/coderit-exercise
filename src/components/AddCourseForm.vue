<template>
    <Button @btn-click="$emit('toggle-create-course')" text="CLOSE FORM" />
    <form @submit="submitForm">
        <div class="input-container">
            <label for="coursename">Course Name</label>
            <input type="text" name="coursename" id="coursename" v-model="coursename" />
        </div>
        <div class="input-container">
            <label for="courseduration">Course Duration</label>
            <input type="text" name="courseduration" id="courseduration" v-model="courseduration" />
        </div>
        <div class="input-container">
            <label for="coursepartecipants">Course Partecipants</label>
            <input type="number" name="coursepartecipants" id="coursepartecipants" v-model="coursepartecipants" />
        </div>
        <input type="submit" value="CREATE COURSE"/>
    </form>
</template>

<script>

    import Button from "./Button"

    export default {
        name: "AddCourseForm",
        data(){
            return{
                coursename:'',
                courseduration:'',
                coursepartecipants:'',
            }
        },
        components: {
            Button,
        },
        methods:{
            submitForm(e){
                e.preventDefault()
                if(!this.coursename) {
                    alert('Please add the first name')
                    return
                } else if(!this.courseduration) {
                    alert('Please add the last name')
                    return
                }else if(!this.coursepartecipants) {
                    alert('Please add the email address')
                    return
                }
                const newCourse = {
                    coursename: this.coursename,
                    courseduration: this.courseduration,
                    coursepartecipants: this.coursepartecipants,
                }

                this.$emit('create-course', newCourse)

                this.coursename = ''
                this.courseduration = ''
                this.coursepartecipants = ''
            }
        }
    }
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

    form input {
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