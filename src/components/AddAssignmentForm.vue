<script setup>
  import { useField, useForm } from 'vee-validate';
  import { ref, defineProps, defineEmits } from 'vue';
  import Button from './Button.vue';
  
  const props = defineProps(["teachers", "courses"]);
  const emit = defineEmits(['create-assignment']);
    
  const { handleSubmit, handleReset, setFieldError } = useForm({
    validationSchema: {
      selectTeacher: value => (value ? true : 'Select a teacher.'),
      selectCourse: value => (value ? true : 'Select a course.'),
    },
  });

  const selectTeacher = useField('selectTeacher');
  const selectCourse = useField('selectCourse');

  const submit = handleSubmit(async (values) => {
    try {

      // Trova gli oggetti selezionati
      const selectedTeacher = props.teachers.find(teacher => teacher.email === values.selectTeacher);
      const selectedCourse = props.courses.find(course => course.coursename === values.selectCourse);

      // Estrai gli ID dagli oggetti selezionati
      const teacherId = selectedTeacher ? selectedTeacher.id : null;
      const courseId = selectedCourse ? selectedCourse.id : null;

      const assignment = {
        idcourse: courseId,
        idteacher: teacherId,
      };

      console.log(assignment, "assignment");
      emit("create-assignment", assignment);
    } catch (error) {
      console.error('Errore durante l\'invio del modulo', error);
    }
  });
</script>

<script>
    export default {
        name: "AddAssignmentForm",
        components: {
            Button,
        },
    }
</script>

<template>
  <form @submit.prevent="submit">
    
    <v-select
      v-if="props.teachers"
      v-model="selectTeacher.value.value"
      :items="props.teachers.map(teacher => teacher.email)"
      :error-messages="selectTeacher.errorMessage.value"
      label="Select Teacher"
      ></v-select>

    <v-select
      v-if="props.courses"
      v-model="selectCourse.value.value"
      :items="props.courses.map(course => course.coursename)"
      :error-messages="selectCourse.errorMessage.value"
      label="Select Course"
    ></v-select>
    <div class="big-btn-group">
      <div class="btn-group">
          <v-btn color="#04c717" class="me-4" type="submit"> submit </v-btn>
          <v-btn color="#d11b0f" @click="handleReset"> clear </v-btn>
      </div>
      <Button buttoncolor="black" buttontext="CLOSE"  @btn-click="this.$store.commit('toggleCreateAssignment')" />
    </div>
  </form>
</template>

<style scoped>
    form{
        width: 400px;
        background-color: white;
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        padding: 20px;
        border-radius: 20px;
    }

    .btn-group{
      width: fit-content;
      height: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .big-btn-group{
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
</style>