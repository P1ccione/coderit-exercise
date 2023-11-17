<template>
  <div class="container">
    <Header/>
    <div class="content-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Header from "./components/Header"
 
  export default {
    name: 'App',
    components: {
      Header,
    },
  }
</script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
    
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    /* outline: 1px orange solid */
  }

  body {
    font-family: 'Poppins', sans-serif;
  }

  .container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .content-container {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-container {
    position: absolute;
    width: 100%;
    height: 100vh;
    top:0;
    display: flex;
    flex-direction: column;
    row-gap: 50px;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.3);
    backdrop-filter: blur(2px);
  }

</style>
