<template>
  <v-app>
    <Header/>
    <div class="alert-container" v-show="this.store.state.global.showAlertState">
      <Alert :title="this.store.state.global.alertTitle" :text="this.store.state.global.alertText" />
    </div>
      <div class="container" role="main">
        <router-view/>
      </div>
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

<style scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 80px;
}

.alert-container {
    position: absolute;
    top: 30px;
    z-index: 9999;
    left: 50%;
    transform: translateX(-50%);
}
</style>
