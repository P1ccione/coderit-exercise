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
      const selectedTeacher = props.teachers.find(teacher => teacher.userEmail === values.selectTeacher);
      const selectedCourse = props.courses.find(course => course.nome === values.selectCourse);

      // Estrai gli ID dagli oggetti selezionati
      const teacherId = selectedTeacher ? selectedTeacher.userId : null;
      const courseId = selectedCourse ? selectedCourse.id : null;

      const assignment = {
        moduleId: courseId,
        professorId: teacherId,
      };

      console.log(assignment, "assignment");
      emit("create-assignment", assignment);
    } catch (error) {
      console.error('Errore durante l\'invio del modulo', error);
    }
  });
</script>

<script>
import { useStore } from 'vuex/dist/vuex.esm-bundler.js';
  export default {
    name: "AddAssignmentForm",
    components: {
        Button,
    },
    data() {
      return {
          store: useStore()
      }
    },
  }
</script>

<template>
  <form @submit.prevent="submit" role="form" :aria-label="$t(form_aggiunta_docenze)">
    
    <v-select
      v-if="props.teachers"
      v-model="selectTeacher.value.value"
      :items="props.teachers.map(teacher => teacher.userEmail)"
      :error-messages="selectTeacher.errorMessage.value"
        :label="$t('seleziona_professore')"
        aria-label="Seleziona email del professore"
        required
        role="listbox"
      ></v-select>

    <v-select
      v-if="props.courses"
      v-model="selectCourse.value.value"
      :items="props.courses.map(course => course.nome)"
      :error-messages="selectCourse.errorMessage.value"
        :label="$t('seleziona_corso')"
        aria-label="Seleziona nome del corso"
        required
        role="listbox"
    ></v-select>
    <div class="big-btn-group" role="group" aria-label="Azioni del form">
      <div class="btn-group">
          <v-btn color="#04c717" class="me-4" type="submit" role="button"> {{ $t('invio') }} </v-btn>
          <v-btn color="#fe2315" @click="handleReset" role="button"> {{ $t('cancella') }} </v-btn>
      </div>
      <Button buttoncolor="black" :buttontext="$t('chiudi')"  @btn-click="store.dispatch('toggleCreateAssignment')" role="button"/>
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