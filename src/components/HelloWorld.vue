<template>
  {{ $t('benvenuto') }} {{ this.store.state.global.userData.lastname }} {{ this.store.state.global.userData.firstname }}
</template>

<script>
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n'
export default {
  name: 'HelloWorld',
  setup() {
    const { t } = useI18n()
    return {
      store: useStore(),
      t
    }
  }
}
</script>
