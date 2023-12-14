<template>
  Wellcome {{ this.store.state.global.userData.lastname }} {{ this.store.state.global.userData.firstname }}
</template>

<script>
import { useStore } from 'vuex';
export default {
  name: 'HelloWorld',
  data() {
    return {
      store: useStore()
    }
  }
}
</script>
