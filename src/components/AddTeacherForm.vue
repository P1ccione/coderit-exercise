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
  <form @submit.prevent="submit" role="form" :aria-label="$t('form_aggiunta_professori')">
    <!-- Sezione dei campi -->
    <label for="name" class="sr-only">{{ $t('nome_professore') }}</label>
    <v-text-field
      variant="outlined"
      v-model="name.value.value"
      :error-messages="name.errorMessage.value"
      :label="$t('nome_professore')"
      :aria-label="$t('nome_professore')"
      role="textbox"
      aria-required="true"
      :aria-invalid="name.errorMessage.value ? 'true' : 'false'"
    ></v-text-field>

    <label for="surname" class="sr-only">{{ $t('cognome_professore') }}</label>
    <v-text-field
      variant="outlined"
      v-model="surname.value.value"
      :error-messages="surname.errorMessage.value"
      :label="$t('cognome_professore')"
      :aria-label="$t('cognome_professore')"
      role="textbox"
      aria-required="true"
      :aria-invalid="surname.errorMessage.value ? 'true' : 'false'"
    ></v-text-field>

    <label for="userEmail" class="sr-only">{{ $t('email_professore') }}</label>
    <v-text-field
      variant="outlined"
      v-model="userEmail.value.value"
      :error-messages="userEmail.errorMessage.value"
      :label="$t('email_professore')"
      :aria-label="$t('email_professore')"
      role="textbox"
      aria-required="true"
      :aria-invalid="userEmail.errorMessage.value ? 'true' : 'false'"
    ></v-text-field>

    <!-- Seconda sezione del form -->
    <div class="big-btn-group" role="group" :aria-label="$t('azioni_form')">
      <div class="btn-group">
        <v-btn color="#04c717" class="me-4" type="submit" role="button" :aria-label="$t('invio')">
          {{ $t('invio') }}
        </v-btn>
        <v-btn color="#fe2315" @click="handleReset" role="button" :aria-label="$t('cancella')">
          {{ $t('cancella') }}
        </v-btn>
      </div>
        <Button
          buttoncolor="black"
          :buttontext="$t('chiudi')"
          @btn-click="store.dispatch('toggleAddTeacherForm')"
          role="button"
          :aria-label="$t('chiudi')"
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

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
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