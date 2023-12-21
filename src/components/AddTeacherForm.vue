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
  import { useI18n } from 'vue-i18n'
  export default {
    name: "AddTeacherForm",
    components: {
        Button,
    },
    setup() {
      const { t } = useI18n() // use as global scope
      return {
          t
      }
    },
    data() {
      return {
          store: useStore()
      }
    },
  }
</script>

<template>
  <form @submit.prevent="submit" role="form" :aria-label="$t(form_aggiunta_professori)">
    <!-- Sezione dei campi -->
    <v-text-field
      variant="outlined"
      v-model="name.value.value"
      :error-messages="name.errorMessage.value"
      :label="$t('nome_professore')"
      aria-label="Nome del professore"
      required
      role="textbox"
    ></v-text-field>

    <v-text-field
      variant="outlined"
      v-model="surname.value.value"
      :error-messages="surname.errorMessage.value"
      :label="$t('cognome_professore')"
      aria-label="Cognome del professore"
      required
      role="textbox"
    ></v-text-field>

    <v-text-field
      variant="outlined"
      v-model="userEmail.value.value"
      :error-messages="userEmail.errorMessage.value"
      :label="$t('email_professore')"
      aria-label="Email del professore"
      required
      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
      role="textbox"
    ></v-text-field>

    <!-- Seconda sezione del form -->
    <div class="big-btn-group" role="group" aria-label="Azioni del form">
      <div class="btn-group">
        <v-btn color="#04c717" class="me-4" type="submit" role="button">
          {{ $t('invio') }}
        </v-btn>
        <v-btn color="#fe2315" @click="handleReset" role="button">
          {{ $t('cancella') }}
        </v-btn>
      </div>
        <Button
          buttoncolor="black"
          :buttontext="$t('chiudi')"
          @btn-click="store.dispatch('toggleAddTeacherForm')"
          role="button"
        />
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