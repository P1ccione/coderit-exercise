<template>
  <h3>HOME PAGE</h3>
  <v-btn variant="outlined" @click="getAccessToken">ACCESS TOKEN</v-btn>
</template>
 
<script>
import { defineComponent } from 'vue';
import Button from '@/components/Button.vue';
import Cookies from "js-cookie";

export default defineComponent({
  name: 'HomeView',
  components: {
    Button,
  },
  methods: {
    getAccessToken() {
      try{
        const accessToken = Cookies.get("access_token");
        console.log(accessToken)
      } catch (error) {
        console.log(error)
      }
    }
  },
  data () {
    return{
    }
  }
});
</script>
