<template>
  <v-app>
    <Header :userIsAuthorized="userIsAuthorized"/>
    <div class="alert-container" v-show="this.$store.state.showAlertState">
      <Alert :title="$store.state.alertTitle" :text="$store.state.alertText" />
    </div>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
import Alert from './components/Alert.vue';
export default {
  name: 'App',
  components: {
    Header,
    Alert,
  },
  data() {
    return {
    }
  },
  beforeCreate() {

  },
  methods: {
  },
  mounted() {
    console.log(this.$store.state.showAlertState, "app.js state alert")
  }
}
</script>

<style scoped> 
.alert-container{
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999999;
} 
</style>