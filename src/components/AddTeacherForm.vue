<script setup>
  import { useField, useForm } from 'vee-validate'
  import { defineEmits } from 'vue'
  import Button from './Button.vue';
    
  const emit = defineEmits(['create-teacher'])
  const { handleSubmit, handleReset } = useForm({
    validationSchema: {
      name(value) {
            if (value?.length >= 2) return true
            return 'First Name needs to be at least 2 characters.'
        },
        surname(value) {
            if (value?.length >= 2) return true
            return 'Last Name needs to be at least 2 characters.'
        },
        userEmail(value) {
            if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
            return 'Must be a valid e-mail.'
        },
    },
  })
  const surname = useField('surname')
  const name = useField('name')
  const userEmail = useField('userEmail')

  const submit = handleSubmit(values => {
    const teacher = {
      name: values.name,
      surname: values.surname,
      userEmail: values.userEmail,
    }
    console.log(teacher);
    emit("create-teacher", teacher)
  })
</script>

<script>
import { useStore } from 'vuex/dist/vuex.esm-bundler.js';
  export default {
    name: "AddTeacherForm",
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
        v-model="name.value.value"
        :error-messages="name.errorMessage.value"
        label="First Name"
      ></v-text-field>

      <v-text-field
        variant="outlined"
        v-model="surname.value.value"
        :error-messages="surname.errorMessage.value"
        label="Last Name"
      ></v-text-field>
  
      <v-text-field
        variant="outlined"
        v-model="userEmail.value.value"
        :error-messages="userEmail.errorMessage.value"
        label="Email"
      ></v-text-field>
      <div class="big-btn-group">
        <div class="btn-group">
            <v-btn color="#04c717" class="me-4" type="submit"> submit </v-btn>
            <v-btn color="#d11b0f" @click="handleReset"> clear </v-btn>
        </div>
        <Button buttoncolor="black" buttontext="CLOSE"  @btn-click="store.dispatch('toggleAddTeacherForm')" />
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