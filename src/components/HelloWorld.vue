<template>
  <!-- {{ $t('benvenuto') }} {{ this.store.state.global.userData.lastname }} {{ this.store.state.global.userData.firstname }} -->
  <div class="header-img-container">
    <h1 class="header-title">Verifica che gli studenti <br>stiano ascoltando</h1>
    <p class="header-text">"Here I Am" propone un sistema in grado di verificare che <br>uno studente che partecipa a una sessione di formazione online sia <br>effettivamente presente.</p>
    <Button v-if="!this.store.state.global.authorized" buttoncolor="white" buttontext="INIZIA ➠" style="margin-top: 10px;" @click="login" class="header-button"/>
  </div>

  <div class="marketing-row">
    <div class="marketing-col">
      <h2 class="marketing-col-title">Affidibilità</h2>
      <p class="marketing-col-text">L'affidabilità è il nostro valore cardine. Siamo impegnati a fornire un servizio costantemente affidabile e di alta qualità ai nostri clienti. Ci sforziamo di mantenere le nostre promesse e di superare le aspettative, garantendo che ogni interazione con noi sia affidabile e soddisfacente.</p>
    </div>
    <div class="marketing-col">
      <h2 class="marketing-col-title">Sicurezza</h2>
      <p class="marketing-col-text">La sicurezza è la nostra massima priorità. Mettiamo al primo posto la protezione dei vostri dati e la vostra privacy. Abbiamo implementato rigorose misure di sicurezza per garantire che le vostre informazioni siano al sicuro da accessi non autorizzati o utilizzi impropri.</p>
    </div>
    <div class="marketing-col" style="justify-content: flex-start;">
      <h2 class="marketing-col-title">Facilità</h2>
      <p class="marketing-col-text">La facilità è il nostro obiettivo principale. Siamo dedicati a fornire un'esperienza semplice e intuitiva ai nostri clienti. Abbiamo progettato i nostri servizi per essere accessibili e facili da utilizzare, eliminando ogni ostacolo o complicazione.</p>
    </div>
  </div>

  <v-divider class="border-opacity-100" color="grey" style="margin: 50px; width: 90%;"></v-divider>

  <h2 class="carousel-title">A chi è rivolto?</h2>

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
        <h2 style="color: white; font-size: 3rem;">Enti formativi</h2>
        <p style="color: white">che desiderano e/o necessitano di verificare che il corsista sia effettivamente presente al corso on-line e che possono utilizzare HIA a tale scopo, indipendentemente dalla piattaforma di <br>e-learning o teleconferenza utilizzata;</p>
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
        <h2 style="color: white; font-size: 3rem;">Corsisti</h2>
        <p style="color: white">che seguono un corso in FAD la cui presenza effettiva è verificata da HIA, che sottopone lo studente a delle challenge più o meno interattive ed esplicite allo scopo di verificarne la presenza e il grado di attenzione.o che seguono un corso in FAD la cui presenza effettiva è verificata da HIA, che sottopone lo studente a delle challenge più o meno interattive ed esplicite allo scopo di verificarne la presenza e il grado di attenzione.</p>
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
        <h2 style="color: white; font-size: 3rem;">Docenti</h2>
        <p style="color: white">che erogano corsi in FAD che possono utilizzare HIA per eseguire una verifica di presenza esplicita, appelli automatizzati e avere indici di attenzione alla lezione in tempo reale.</p>
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
        <h2 style="color: white; font-size: 3rem;">Piattaforme di e-learning</h2>
        <p style="color: white">che hanno la necessità di integrare le funzionalità offerte da HIA senza doverle implementare ex-novo.</p>
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
  }

  .header-text {
    font-size: 20px;
    color: white;
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