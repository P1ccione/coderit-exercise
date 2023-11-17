<template>
    <Button @btn-click="$emit('toggle-create-assignment')" text="CLOSE FORM" />
    <form @submit="submitForm">
        <div class="input-container">
            <label for="idcourse">Course</label>
            <select name="idcourse" id="idcourse"></select>
        </div>
        <div class="input-container">
            <label for="idteacher">Teacher</label>
            <select name="idteacher" id="idteacher"></select>
        </div>
        <input type="submit" value="CREATE ASSIGNMENT"/>
    </form>
</template>

<script>

    import Button from "./Button"

    export default {
        name: "AddAssignmentFrom",
        data(){
            return{
                idcourse:'',
                idteacher:'',
            }
        },
        components: {
            Button,
        },
        methods:{
            submitForm(e){
                e.preventDefault()
                if(!this.idteacher) {
                    alert('Please select a teacher')
                    return
                } else if(!this.idcourse) {
                    alert('Please select a course')
                    return
                }
                const newAssignment = {
                    idteacher: this.idteacher,
                    idcourse: this.idcourse,
                }

                this.$emit('create-assignment', newAssignment)

                this.idteacher = ''
                this.idcourse = ''
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