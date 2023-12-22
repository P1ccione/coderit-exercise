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
    const id = props.editingCourse.id
    const course = {
      nome: values.coursename,
      registraEmail: true
    }
    console.log(course);
    emit("edit-course", [course, id])
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
  import { useI18n } from 'vue-i18n'
  export default {
    name: "EditCourseForm",
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
    <form @submit.prevent="submit" role="form" :aria-label="$t('form_modifica_corsi')">
      <label for="nome" class="sr-only">{{ $t('nome_corso') }}</label>
      <v-text-field
        variant="outlined"
        v-model="coursename.value.value"
        :error-messages="coursename.errorMessage.value"
        :label="$t('nome_corso')"
        :aria-label="$t('nome_corso')"
        role="textbox"
        :aria-invalid="coursename.errorMessage.value ? 'true' : 'false'"
      ></v-text-field>
      <div class="big-btn-group" role="group" :aria-label="$t('azioni_form')">
        <div class="btn-group">
          <v-btn color="#04c717" class="me-4" type="submit" role="button" :aria-label="$t('invio')">{{ $t('invio') }}</v-btn>
          <v-btn color="#fe2315" @click="handleReset" role="button" :aria-label="$t('cancella')">{{ $t('cancella') }}</v-btn>
        </div>
        <Button buttoncolor="black" :buttontext="$t('chiudi')" @btn-click="store.dispatch('toggleEditCourseForm')" role="button" :aria-label="$t('chiudi')" />
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