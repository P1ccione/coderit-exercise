<template>
  <Button @btn-click="$emit('toggle-edit-teacher')" text="CLOSE FORM" />
  <form @submit="submitForm">
    <div class="input-container">
        <label for="firstname">First Name</label>
        <input type="text" name="firstname" id="firstname" v-show="editingTeacher && editingTeacher.firstname" v-model="firstname" />
    </div>
    <div class="input-container">
        <label for="lastname">Last Name</label>
        <input type="text" name="lastname" id="lastname" v-show="editingTeacher && editingTeacher.lastname" v-model="lastname" />
    </div>
    <div class="input-container">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" v-show="editingTeacher && editingTeacher.email" v-model="email" />
    </div>
    <div class="input-container">
        <label for="phonenumber">Phone Number</label>
        <input type="tel" name="phonenumber" id="phonenumber" v-show="editingTeacher && editingTeacher.phonenumber" v-model="phonenumber" />
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
    editingTeacher: {
      type: Object,
      default: null,
    },
  },
  emits: ['edit-teacher', 'toggle-edit-teacher'],
  mounted() {
    console.log(this.editingTeacher);
    if (this.editingTeacher) {
      this.firstname = this.editingTeacher.firstname;
      this.lastname = this.editingTeacher.lastname;
      this.email = this.editingTeacher.email;
      this.phonenumber = this.editingTeacher.phonenumber;
    }
  },
  methods: {
    submitForm(e) {
        e.preventDefault();
        console.log(this.editingTeacher.id);
        if (!this.firstname) {
          alert("Please add the first name");
          return;
        } else if (!this.lastname) {
          alert("Please add the last name");
          return;
        } else if (!this.email) {
          alert("Please add the email address");
          return;
        } else if (!this.phonenumber) {
          alert("Please add the phone number");
          return;
        }
        console.log("passed");
        const newTeacher = {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          phonenumber: this.phonenumber,
        };
        console.log(newTeacher);
        this.$emit("edit-teacher", this.editingTeacher.id, newTeacher);
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