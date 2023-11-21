<script setup>
  import { useField, useForm } from 'vee-validate'
  import Button from './Button.vue';
    
  const emit = defineEmits(['create-teacher'])
  const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        firstname(value) {
            if (value?.length >= 2) return true
            return 'First Name needs to be at least 2 characters.'
        },
        lastname(value) {
            if (value?.length >= 2) return true
            return 'Last Name needs to be at least 2 characters.'
        },
        phonenumber(value) {
            if (value?.length > 9 && /^[0-9-]+$/.test(value)) return true
            return 'Phone Number needs to be at least 9 digits.'
        },
        email(value) {
            if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
            return 'Must be a valid e-mail.'
        },
    },
  })
  const lastname = useField('lastname')
  const firstname = useField('firstname')
  const phonenumber = useField('phonenumber')
  const email = useField('email')

  const submit = handleSubmit(values => {
    const teacher = {
      firstname: values.firstname,
      lastname: values.lastname,
      phonenumber: parseInt(values.phonenumber),
      email: values.email,
    }
    // console.log(teacher);
    emit("create-teacher", teacher)
  })
</script>

<script>
    export default {
        name: "AddTeacherForm",
        components: {
            Button,
        },
    }
</script>

<template>
    <form @submit.prevent="submit">
      <Button style="margin-bottom:30px" buttoncolor="black" buttontext="CLOSE FORM"  @btn-click="$emit('toggle-add-teacher-form')" />
      <v-text-field
        variant="outlined"
        v-model="firstname.value.value"
        :error-messages="firstname.errorMessage.value"
        label="First Name"
      ></v-text-field>

      <v-text-field
        variant="outlined"
        v-model="lastname.value.value"
        :error-messages="lastname.errorMessage.value"
        label="Last Name"
      ></v-text-field>

      <v-text-field
        variant="outlined"
        v-model="phonenumber.value.value"
        :error-messages="phonenumber.errorMessage.value"
        label="Phone Number"
      ></v-text-field>
  
      <v-text-field
        variant="outlined"
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
        label="Email"
      ></v-text-field>
        <div class="btn-group">
            <v-btn color="#04c717" class="me-4" type="submit"> submit </v-btn>
            <v-btn color="#d11b0f" @click="handleReset"> clear </v-btn>
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
</style>