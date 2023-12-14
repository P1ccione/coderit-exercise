<template>
  <v-app>
    <Header/>
    <div class="alert-container" v-show="this.store.state.showAlertState">
      <Alert :title="this.store.state.global.alertTitle" :text="this.store.state.global.alertText" />
    </div>
    <v-main>
      <div class="container">
        <router-view/>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
import Alert from './components/Alert.vue';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    return {
      store
    }
  },
  name: 'App',
  components: {
    Header,
    Alert,
  },
  methods: {
  },
}
</script>
