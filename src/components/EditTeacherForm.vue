<template>
    <Button @btn-click="$emit('toggle-edit-teacher')" text="CLOSE FORM" />
    <form @submit="submitForm">
        <div class="input-container">
            <label for="firstname">First Name</label>
            <input type="text" name="firstname" id="firstname" v-if="teacher && teacher.firstname" v-model="teacher.firstname" />
        </div>
        <div class="input-container">
            <label for="lastname">Last Name</label>
            <input type="text" name="lastname" id="lastname" v-if="teacher && teacher.lastname" v-model="teacher.lastname" />
        </div>
        <div class="input-container">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" v-if="teacher && teacher.email" v-model="teacher.email" />
        </div>
        <div class="input-container">
            <label for="phonenumber">Phone Number</label>
            <input type="tel" name="phonenumber" id="phonenumber" v-if="teacher && teacher.phonenumber" v-model="teacher.phonenumber" />
        </div>
        <input type="submit" value="EDIT TEACHER"/>
    </form>
</template>

<script>
import Button from "./Button";

export default {
  name: "EditTeacherForm",
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: "",
    };
  },
  components: {
    Button,
  },
  props: {
    teacher: {
      type: Object,
      default: null,
    },
  },
  emits: ['edit-teacher', 'toggle-edit-teacher'],
  methods: {
    submitForm(e) {
        e.preventDefault();
        console.log(this.teacher.id);
        if (!this.teacher.firstname) {
        alert("Please add the first name");
        return;
        } else if (!this.teacher.lastname) {
        alert("Please add the last name");
        return;
        } else if (!this.teacher.email) {
        alert("Please add the email address");
        return;
        } else if (!this.teacher.phonenumber) {
        alert("Please add the phone number");
        return;
        }
        const newTeacher = {
        firstname: this.teacher.firstname,
        lastname: this.teacher.lastname,
        email: this.teacher.email,
        phonenumber: this.teacher.phonenumber,
        };
        console.log(newTeacher);
        this.$emit("edit-teacher", this.teacher.id, newTeacher);
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