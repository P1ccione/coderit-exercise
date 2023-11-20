<template>
    <Button @btn-click="$emit('toggle-edit-course')" text="CLOSE FORM" />
    <form @submit="submitForm">
        <div class="input-container">
            <label for="coursename">Course Name</label>
            <input type="text" name="coursename" id="coursename" v-show="course && course.coursename" v-model="coursename" />
        </div>
        <div class="input-container">
            <label for="courseduration">Course Duration</label>
            <input type="text" name="courseduration" id="courseduration" v-show="course && course.courseduration" v-model="courseduration" />
        </div>
        <div class="input-container">
            <label for="coursepartecipants">Course Partecipants</label>
            <input type="number" name="coursepartecipants" id="coursepartecipants" v-show="course && course.coursepartecipants" v-model="coursepartecipants" />
        </div>
        <input type="submit" value="EDIT COURSE"/>
    </form>
</template>

<script>
import Button from "./Button";

export default {
  name: "EditCourseForm",
  data() {
    return {
        coursename:'',
        courseduration:'',
        coursepartecipants:'',
    }  ;  
  },
  components: {
    Button,
  },
  props: {
    course: {
      type: Object,
      default: null,
    },
  },
  emits: ['edit-course', 'toggle-edit-course'],
  mounted() {
    console.log(this.course);
    if (this.course) {
      this.coursename = this.course.coursename;
      this.courseduration = this.course.courseduration;
      this.coursepartecipants = this.course.coursepartecipants;
    }
  },
  methods: {
    submitForm(e) {
        e.preventDefault();
        console.log(this.course.id);
        if (!this.course.coursename) {
            alert("Please add the course name");
            return;
        } else if (!this.course.courseduration) {
            alert("Please add the course duration");
            return;
        } else if (!this.course.coursepartecipants) {
            alert("Please add the course partecipants");
            return;
        }
        const newCourse = {
            coursename: this.course.coursename,
            courseduration: this.course.courseduration,
            coursepartecipants: this.course.coursepartecipants,
        };
        console.log(newCourse);
        this.$emit("edit-course", this.course.id, newCourse);
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