<script setup>
  import { useField, useForm } from 'vee-validate'
  import { watch, defineProps } from 'vue';
  import Button from './Button.vue';
    
  const emit = defineEmits(['edit-teacher'])
  const props = defineProps(
    {
      editingTeacher: Object,
    }
  )
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
            if (value?.length >= 9 && /^[0-9-]+$/.test(value)) return true
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
    const newTeacher = {
      id: props.editingTeacher.id,
      firstname: values.firstname,
      lastname: values.lastname,
      phonenumber: values.phonenumber,
      email: values.email,
    }
    console.log(newTeacher, "new teacher");
    emit("edit-teacher", newTeacher)
  })
  watch(() => props.editingTeacher, (newTeacher) => {
    // console.log(newTeacher, "old teacher");
    if (newTeacher) {
      firstname.value.value = newTeacher.firstname || '';
      lastname.value.value = newTeacher.lastname || '';
      phonenumber.value.value = newTeacher.phonenumber || '';
      email.value.value = newTeacher.email || '';
    }
  }, { immediate: true });
</script>

<script>
    export default {
        name: "EditTeacherForm",
        components: {
            Button,
        },
    }
</script>

<template>
    <form @submit.prevent="submit">
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
      <div class="big-btn-group">
        <div class="btn-group">
            <v-btn color="#04c717" class="me-4" type="submit"> submit </v-btn>
            <v-btn color="#d11b0f" @click="handleReset"> clear </v-btn>
        </div>
        <Button buttoncolor="black" buttontext="CLOSE"  @btn-click="this.$store.commit('toggleEditTeacherForm')" />
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