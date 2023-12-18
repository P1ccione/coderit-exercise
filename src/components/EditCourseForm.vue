<script setup>
  import { useField, useForm } from 'vee-validate'
  import { watch, defineProps } from 'vue';
  import Button from './Button.vue';
    
  const emit = defineEmits(['edit-course'])
  const props = defineProps(
    {
      editingCourse: Object,
    }
  )
  const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        coursename(value) {
            if (value?.length >= 2) return true
            return 'Course Name needs to be at least 2 characters.'
        },
    },
  })

  const coursename = useField('coursename')

  const submit = handleSubmit(values => {
    const course = {
      nome: values.coursename,
      registraEmail: true
    }
    console.log(course);
    emit("edit-course", course)
  })
  watch(() => props.editingCourse, (newCourse) => {
    console.log(newCourse, "old course");
    if (newCourse) {
      coursename.value.value = newCourse.nome || '';
    }
  }, { immediate: true });
</script>

<script>
  import { useStore } from 'vuex/dist/vuex.esm-bundler.js';
  export default {
    name: "EditCourseForm",
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
    <form @submit.prevent="submit">
      <v-text-field
        variant="outlined"
        v-model="coursename.value.value"
        :error-messages="coursename.errorMessage.value"
        label="Course Name"
      ></v-text-field>
      <div class="big-btn-group">
        <div class="btn-group">
            <v-btn color="#04c717" class="me-4" type="submit"> submit </v-btn>
            <v-btn color="#d11b0f" @click="handleReset"> clear </v-btn>
        </div>
        <Button buttoncolor="black" buttontext="CLOSE"  @btn-click="store.dispatch('toggleEditCourseForm')" />
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