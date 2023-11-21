<script>
  import Header from './components/Header.vue';
  import Alert from './components/Alert.vue';
  import { Icon } from '@iconify/vue';

  export default {
    name: "App",
    components: {
      Header,
      Alert,
      Icon,
    },
    data() {
      return {
        showAlertState: false,
        title: "",
        text: "",
      }
    },
    methods: {
      showAlert(alerttext, alerttitle, timeout) {
        this.text = alerttext
        this.title = alerttitle
        this.showAlertState = true
        const self = this;

        setTimeout(function() {
          self.showAlertState = false;
        }, timeout);
      }
    }
  }
</script>

<template>
  <Header />
  <div class="alert-container">
    <Alert v-show="showAlertState" :title="title" :text="text" />
  </div>
  <RouterView @show-alert="showAlert"/>
</template>

<style scoped>
  .alert-container{
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
