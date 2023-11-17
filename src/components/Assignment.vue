<template>
    <div class="assignment-card">
      <div class="column-content">{{ teacher.firstname }} {{ teacher.lastname }}</div>
      <div class="column-content">{{ course.coursename }}</div>
      <div class="buttons-group">
        <Button btnheight="30px" btnwidth="80px" @btn-click="deleteAssignment" text="DELETE" color="red" />
      </div>
    </div>
  </template>
  
  <script>
  import Button from "./Button";
  
  export default {
    name: "Assignment",
    components: {
      Button,
    },
    props: {
      assignment: {
        type: Object,
      },
      course: {
        type: Object,
      },
      teacher: {
        type: Object,
      },
    },
    methods: {
      editAssignment() {
        // Puoi aggiungere la logica per gestire l'evento di modifica
        this.$emit("toggle-edit-assignment", this.assignment);
      },
      deleteAssignment() {
        // Puoi aggiungere la logica per gestire l'evento di eliminazione
        this.$emit("delete-assignment", this.assignment.id);
      },
    },
  };
  </script>

<style scoped>

    .assignment-card {
        width: auto;
        height: 150px;
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
        width: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 10px;
    }
</style>