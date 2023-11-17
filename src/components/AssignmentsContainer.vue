<template>
    <div class="assignments-container">
      <Button @btn-click="$emit('toggle-create-assignment')" text="CREATE ASSIGNMENT" />
      <div class="columnsNames">
        <div class="columnName">Teacher name</div>
        <div class="columnName">Course name</div>
      </div>
      <div :key="assignment.id" v-for="assignment in assignments">
        <Assignment
          :assignment="assignment"
          :teacher="getTeacher(assignment.teacherid)"
          :course="getCourse(assignment.courseid)"
          @delete-assignment="$emit('delete-assignment', assignment.id)"
        />
      </div>
    </div>
  </template>
  
  <script>
  import Assignment from "./Assignment";
  import Button from "./Button";
  
  export default {
    name: "AssignmentsContainer",
    components: {
      Assignment,
      Button,
    },
    props: {
      assignments: {
        type: Array,
      },
      teachers: {
        type: Array,
      },
      courses: {
        type: Array,
      },
    },
    methods: {
      getTeacher(teacherId) {
        return this.teachers.find((teacher) => teacher.id === teacherId) || {};
      },
      getCourse(courseId) {
        return this.courses.find((course) => course.id === courseId) || {};
      },
    },
  };
  </script>

<style scoped>
    .assignments-container {
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