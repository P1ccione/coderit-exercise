<script setup>
  import { useField, useForm } from 'vee-validate'
  import Button from './Button.vue';
    
  const emit = defineEmits(['create-course'])
  const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        coursename(value) {
            if (value?.length >= 2) return true
            return 'Course Name needs to be at least 2 characters.'
        },
        courseduration(value) {
            if (value?.length >= 2) return true
            return 'Duration needs to be at least 2 characters.'
        },
        coursepartecipants(value) {
            if (value?.length > 1 && /^[0-9-]+$/.test(value)) return true
            return 'Partecipants needs to be at least 1 digits.'
        },
    },
  })
  const courseduration = useField('courseduration')
  const coursename = useField('coursename')
  const coursepartecipants = useField('coursepartecipants')

  const submit = handleSubmit(values => {
    const course = {
      coursename: values.coursename,
      courseduration: values.courseduration,
      coursepartecipants: values.coursepartecipants,
    }
    console.log(course);
    emit("create-course", course)
  })
</script>

<script>
    export default {
        name: "AddCourseForm",
        components: {
            Button,
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

      <v-text-field
        variant="outlined"
        v-model="courseduration.value.value"
        :error-messages="courseduration.errorMessage.value"
        label="Duration"
      ></v-text-field>

      <v-text-field
        variant="outlined"
        v-model="coursepartecipants.value.value"
        :error-messages="coursepartecipants.errorMessage.value"
        label="Partecipants"
      ></v-text-field>
      <div class="big-btn-group">
        <div class="btn-group">
          <v-btn color="#04c717" class="me-4" type="submit"> submit </v-btn>
          <v-btn color="#d11b0f" @click="handleReset"> clear </v-btn>
        </div>
        <Button buttoncolor="black" buttontext="CLOSE" @btn-click="this.$store.commit('toggleAddCourseForm')" />
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