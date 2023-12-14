<template>
  Wellcome {{ this.store.state.userData.lastname }} {{ this.store.state.userData.firstname }}
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
