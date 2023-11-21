<script setup>
  import { useField, useForm } from 'vee-validate'
  import { ref } from 'vue'
  import Button from './Button.vue';
  
  const items = ref(['Item 1', 'Item 2', 'Item 3', 'Item 4'])
  const seconditems = ref(['ciao', 'billi'])
    
  const emit = defineEmits(['create-course'])
  const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        select(value) {
        if (value) return true

        return 'Select an item.'
      },
      secondselect(value) {
        if (value) return true

        return 'Select an item.'
      },
    },
  })
  const select = useField('select')
  const secondselect = useField('secondselect')

//   const submit = handleSubmit(values => {
//     const course = {
//       coursename: values.coursename,
//       courseduration: values.courseduration,
//       coursepartecipants: values.coursepartecipants,
//     }
//     console.log(course);
//     emit("create-course", course)
//   })
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
        <Button style="margin-bottom:30px" buttoncolor="black" buttontext="CLOSE FORM"  @btn-click="$emit('toggle-add-course-form')" />
        <v-select
            v-model="select.value.value"
            :items="items"
            :error-messages="select.errorMessage.value"
            label="Select"
        ></v-select>
        <v-select
            v-model="secondselect.value.value"
            :items="seconditems"
            :error-messages="secondselect.errorMessage.value"
            label="Second Select"
        ></v-select>
    
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