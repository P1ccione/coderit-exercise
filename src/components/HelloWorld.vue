<template>
  <!-- {{ $t('benvenuto') }} {{ this.store.state.global.userData.lastname }} {{ this.store.state.global.userData.firstname }} -->
  <div class="header-img-container">
    <h1 class="header-title">{{ $t('header_titolo') }}</h1>
    <p class="header-text">{{ $t('header_testo') }}</p>
    <Button v-if="!this.store.state.global.authorized" buttoncolor="white" :buttontext="$t('inizia') + ' ➠'" style="margin-top: 10px;" @click="login" class="header-button"/>
  </div>

  <div class="marketing-row">
    <div class="marketing-col">
      <h2 class="marketing-col-title">{{ $t('affidibilita_titolo') }}</h2>
      <p class="marketing-col-text">{{ $t('affidibilita_testo') }}</p>
    </div>
    <div class="marketing-col">
      <h2 class="marketing-col-title">{{ $t('sicurezza_titolo') }}</h2>
      <p class="marketing-col-text">{{ $t('sicurezza_testo') }}</p>
    </div>
    <div class="marketing-col" style="justify-content: flex-start;">
      <h2 class="marketing-col-title">{{ $t('facilita_titolo') }}</h2>
      <p class="marketing-col-text">{{ $t('facilita_testo') }}</p>
    </div>
  </div>

  <v-divider class="border-opacity-100" color="grey" style="margin: 50px; width: 90%;"></v-divider>

  <h2 class="carousel-title">{{ $t('carousel_titolo') }}</h2>

  <v-carousel style="width: 90%;">
    <v-carousel-item
      :src="EntiFormativiImage"
      cover
    >
      <div
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: left;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          row-gap: 15px;
        "
      >
        <h2 style="color: white; font-size: 3rem;">{{ $t('enti_formativi_titolo') }}</h2>
        <p style="color: white">{{ $t('enti_formativi_testo') }}</p>
      </div>
    </v-carousel-item>
    
    <v-carousel-item
      :src="CorsistiImage"
      cover
    >
      <div
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: left;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          row-gap: 15px;
        "
      >
        <h2 style="color: white; font-size: 3rem;">{{ $t('corsisti_titolo') }}</h2>
        <p style="color: white">{{ $t('corsisti_testo') }}</p>
      </div>
    </v-carousel-item>

    <v-carousel-item
      :src="DocentiImage"
      cover
    >
      <div
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: left;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          row-gap: 15px;
        "
      >
        <h2 style="color: white; font-size: 3rem;">{{ $t('docenti_titolo') }}</h2>
        <p style="color: white">{{ $t('docenti_testo') }}</p>
      </div>
    </v-carousel-item>

    <v-carousel-item
      :src="ElearingImage"
      cover
    >
      <div
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: left;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          row-gap: 15px;
        "
      >
        <h2 style="color: white; font-size: 3rem;">{{ $t('piattaforme_e_learning_titolo') }}</h2>
        <p style="color: white">{{ $t('piattaforme_e_learning_testo') }}</p>
      </div>
    </v-carousel-item>
  </v-carousel>
  
  <v-divider class="border-opacity-100" color="grey" style="margin: 50px; width: 90%;"></v-divider>

  <div class="row-featurette">
    <div class="featurette-col-text-container">
      <h2 class="featurette-col-title">Rilevamento della presenza tramite sfide</h2>
      <p class="featurette-col-text">HIA rileva la presenza dell’utente durante il corso mediante delle “sfide” che sono sottoposte all’utente tramite il canale utilizzato per la FAD o in maniera ad esso correlata. Tali sfide sono delle azioni che il corsista deve eseguire per poter dimostrare la sua presenza. Il punto chiave è che HIA è in grado di associare una sfida con un corso e con lo studente che dovrebbe essere presente a quel corso. Una sfida “superata” dimostra con un certo grado di confidenza che il corsista è presente al corso.</p>      
    </div>
    <div class="featurette-col-image">
      <img :src="QrCodeImage" alt="">
    </div>
  </div>
  
  <v-divider class="border-opacity-100" color="grey" style="margin: 50px; width: 90%;"></v-divider>

  <div class="row-featurette">
    <div class="featurette-col-image">
      <img :src="AnalisiImage" alt="">
    </div>
    <div class="featurette-col-text-container">
      <h2 class="featurette-col-title">Indagini</h2>
      <p class="featurette-col-text">HIA può analizzare i dati raccolti dalle sfide per eseguire delle “indagini” e identificare situazioni dubbie di presenza. A puro titolo di esempio, supponiamo che un utente A sia sempre riuscito a superare le sfide proposte da HIA, ma sempre e solo dopo che c’è riuscito l’utente B. Questo potrebbe indicare che il corsista B stia cercando di impersonare l’utente A. Tale fase di indagine deve portare a degli indicatori che permettano di pianificare meglio le sfide a cui sottoporre i corsisti. Ad esempio, nel caso sopra descritto, si potrebbe pensare che alla prossima lezione, al corsista A sia sottoposta una sfida magari più invasiva ma con una confidenza maggiore. Oppure che il corsista A sia sfidato prima del corsista B.</p>        
    </div>
  </div>
  
  <v-divider class="border-opacity-100" color="grey" style="margin: 50px; width: 90%;"></v-divider>

</template>

<script>
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n'
import Button from './Button.vue';
import AnalisiImage from '@/assets/analisi-e1e9e3e5.png';
import QrCodeImage from '@/assets/qrcode-21515a71.png';
import CorsistiImage from '@/assets/carousel-corsisti.png';
import DocentiImage from '@/assets/carousel-docenti.png';
import ElearingImage from '@/assets/carousel-e-learning.jpg';
import EntiFormativiImage from '@/assets/carousel-enti-formativi.png';
export default {
  name: 'HelloWorld',
  setup() {
    const { t } = useI18n()
    return {
      store: useStore(),
      t
    }
  },
  components: {
    Button
  },
  data() {
    return {
      AnalisiImage: AnalisiImage,
      QrCodeImage: QrCodeImage,
      CorsistiImage: CorsistiImage,
      DocentiImage: DocentiImage,
      EntiFormativiImage: EntiFormativiImage,
      ElearingImage: ElearingImage,
    }
  },
  methods: {
    login () {
      if (this.$keycloak) {
          this.$keycloak.login();
      } else {
          console.error('Keycloak not initialized yet.');
          // Handle the situation accordingly, e.g., redirect to a login page.
      }
    },
  },
}
</script>

<style scoped>
  .header-img-container {
    width: 100%;
    height: 647px;
    padding-right: 100px;
    padding-left: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    row-gap: 20px;
    background-image: url("@/assets/header-image.png");
    background-size: cover;
  }

  .header-title {
    font-size: 2.5rem;
    color: white;
    width: 500px;
  }

  .header-text {
    font-size: 20px;
    color: white;
    width: 520px;
  }

  .marketing-row {
    margin-top: 50px;
    width: 90%;
    display: flex;
    column-gap: 20px;
    align-items: center;
    justify-content: center;
}

  .marketing-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 33%;
    height: 100%;
  }

  .marketing-col-title {
    color: dodgerblue;
  }
  .marketing-col-text {
    text-align: center;
    margin-top:20px
  }

  .carousel-title {
    width: 90%;
    color: dodgerblue;
    font-size: 2rem;
    margin-bottom: 10px;
  }

  .header-button:hover {
    background-color: dodgerblue !important;
  }
  .header-button{
    font-size: 1.3rem !important;
  }

  .row-featurette {
    width: 90%;
    display: flex;
    column-gap: 20px;
}

.featurette-col-image {
    width: 40%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
}

.featurette-col-image img {
    width: 100%;
    height: auto;
}

p.featurette-col-text {
    font-size: 1.2rem;
}

.featurette-col-text-container {
    width: 55%;
    display: flex;
    flex-direction: column;
    row-gap: 30px;
}

h2.featurette-col-title {
    font-size: 2.2rem;
    color: dodgerblue;
}
</style>