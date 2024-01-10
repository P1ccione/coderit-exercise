<script setup>
  import { useField, useForm } from 'vee-validate'
  import Button from './Button.vue';
  import { Icon } from '@iconify/vue';
    
  const emit = defineEmits(['create-course'])
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
    emit("create-course", course)
  })
</script>

<script>
import { useStore } from 'vuex/dist/vuex.esm-bundler.js';
  import { useI18n } from 'vue-i18n'
  export default {
    name: "AddCourseForm",
    components: {
        Button,
        Icon,
    },
    setup() {
      const { t } = useI18n() // use as global scope
      return {
          t
      }
    },
    data() {
      return {
        store: useStore(),
        selected: [],
        items: [
          {
            id: 1,
            name: 'qr-code',
            stepsRequired: [],
          },
          {
            id: 2,
            name: 'login',
            stepsRequired: [
              {
                id: 1,
                name: 'qr-code',
                stepsRequired: [],
              },
            ],
          },
          {
            id: 3,
            name: 'captcha',
            stepsRequired: [
              {
                id: 2,
                name: 'login',
                stepsRequired: [
                  {
                    id: 1,
                    name: 'qr-code',
                  },
                ],
              },
            ],
          },
        ],
      }
    },
    watch: {
      selected: {
        handler(newValue, oldValue) {
          // Handle deselection of items with stepsRequired
          oldValue.forEach(oldItem => {
            if (!newValue.includes(oldItem)) {
              this.deselectDependentItems(oldItem)
            }
          })
        },
        deep: true,
      },
    },
    methods: {
      isSelectable(item) {
        // Check if all required steps are selected
        return item.stepsRequired.every(step =>
          this.selected.some(selectedItem => selectedItem.id === step.id)
        )
      },
      deselectDependentItems(item) {
        // Deselect items that have this item in their stepsRequired
        this.items.forEach(checkItem => {
          if (checkItem.stepsRequired.some(step => step.id === item.id)) {
            this.selected = this.selected.filter(
              selectedItem => selectedItem.id !== checkItem.id
            )
          }
        })
      },
    },
  }
</script>

<template>
    <form @submit.prevent="submit" role="form" :aria-label="$t('form_aggiunta_corsi')">
      <label for="coursename" class="sr-only">{{ $t('nome_corso') }}</label>
      <v-text-field
        variant="outlined"
        v-model="coursename.value.value"
        :error-messages="coursename.errorMessage.value"
        :label="$t('nome_corso')"
        :aria-label="$t('nome_corso')"
        role="textbox"
        aria-required="true"
        :aria-invalid="coursename.errorMessage.value ? 'true' : 'false'"
      ></v-text-field>

      <div class="checkBox-container-title">
        <p>Step di verifica presenza</p>
        <v-dialog width="760">
          <template v-slot:activator="{ props }">
            <v-btn :icon="true" variant="plain" :ripple="false" v-bind="props" text="Open Dialog">
              <Icon icon="ph:info-fill" width="30px" height="30px"/>
            </v-btn>
          </template>
        
          <template v-slot:default="{ isActive }">
            <v-card title="Guida alle Selezioni degli step di verifica">
              <v-card-text width="1000">
                Benvenuto nella nostra guida rapida alle selezioni dei checkbox. In questa sezione, ti spiegheremo come funziona la selezione dei checkbox e le interazioni tra di essi.
                <br>
                <br>
                Come Funziona:
                <br>
                <br>
                <ul style="margin-left: 30px">
                  <li>Ogni checkbox rappresenta un passo o un'opzione.</li>
                  <li>Alcuni passi richiedono l'esecuzione di altri passi prima di diventare selezionabili.</li>
                  <li>Ad esempio, se selezioni "qr-code", il passo successivo "login" diventerà selezionabile.</li>
                  <li>Se deselezioni "qr-code", il passo "login" verrà deselezionato automaticamente.</li>
                  <li>Questo è dovuto al fatto che "login" ha come requisito "qr-code".</li>
                </ul>
                <br>
                Esempio Pratico:
                <br>
                <br>
                <ul style="margin-left: 30px">
                  <li>Seleziona "qr-code" per attivare il passo successivo "login".</li>
                  <li>Seleziona "login" per attivare il passo successivo "captcha".</li>
                  <li>Se deselezioni "qr-code", sia "login" che "captcha" verranno automaticamente deselezionati.</li>
                </ul>
                <br>
                Questo approccio semplifica il processo, assicurandoti di seguire l'ordine corretto delle azioni. 
                <br>
                <br>
                Grazie per la tua attenzione e buona navigazione!
              </v-card-text>
        
              <v-card-actions>
                <v-spacer></v-spacer>
        
                <v-btn
                  text="CHIUDI INFO"
                  @click="isActive.value = false"
                  variant="outlined"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </div>
      <div v-for="item in items" class="checkBox-container">
        <input 
          type="checkbox" 
          v-model="selected"
          :value="item"
          :disabled="!isSelectable(item)"
        >
        <label for="checkbox">{{ (item.name).toUpperCase() }}</label>
      </div>
      
      <div class="big-btn-group" role="group" :aria-label="$t('azioni_form')">
        <div class="btn-group">
          <v-btn color="#04c717" class="me-4" type="submit" role="button" :aria-label="$t('invio')">{{ $t('invio') }}</v-btn>
          <v-btn color="#fe2315" @click="handleReset" role="button" :aria-label="$t('cancella')">{{ $t('cancella') }}</v-btn>
        </div>
        <Button buttoncolor="black" :buttontext="$t('chiudi')" @btn-click="store.dispatch('toggleAddCourseForm')" role="button" :aria-label="$t('chiudi')" />
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

  .checkBox-container {
    height: 30px;
    display: flex;
    align-items: center;
    column-gap: 15px;
  }
  .checkBox-container input{
    transform: scale(1.5);
    background-color: #ffffff;
  }

  .checkBox-container-title {
    display: flex; 
    align-items: center; 
  }

  .checkBox-container-title svg:hover {
    cursor: pointer;
  }

  .big-btn-group{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px
  }
</style>