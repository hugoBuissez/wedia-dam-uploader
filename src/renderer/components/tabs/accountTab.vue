<template>

  
    
   <div class="right">
    <header>
      <h3>Mon compte</h3>
    </header>

    <div class="cont">
      <div class="inputGroup">
        <label for="firstName">Prénom</label>
        <input name="firstName" type="text" disabled value="Hugo">
      </div>   
      <div class="inputGroup">
        <label for="lastName">Nom</label>
        <input name="lastName" type="text" disabled value="Buissez">
      </div>   
      <div class="inputGroup">
        <label for="country">Pays</label>
        <input name="country" type="text" disabled value="France">
      </div>   
      <div class="inputGroup">
        <label for="company">Société</label>
        <input name="country" type="text" disabled value="Wedia">
      </div> 
      <div class="inputGroup">
        <label for="mail">Mail</label>
        <input name="mail" type="text" disabled value="hugo.buissez@wedia.fr">
      </div>  

      <div class="infos"></div>
      <p>Cet interface ne vous permet pas de modifier vos informations.</p>
      <p>Besoin de changer vos indentifiants ? Rendez vous sur votre <a href="#">DAM.</a></p>     
    </div>

    
    <!-- <we-cursor-provider path="dam/asset" $status="loaded">
      <template #default="cursor">
        <div>
          <dam-list :cursor="cursor"/>
        </div>
      </template>
    </we-cursor-provider> -->
    

  </div>
</template>

<script>

import damList from "../dam/DamList"

export default {
  name: "account-tab",
  components: { damList },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600&display=swap");

    

    header {
      padding-left: 30px;
    }

    .cont {
      width: 100%;
      height: 100%;
      margin-top: 30px;
      padding: 30px 30px 30px 60px; 
      display: flex;
      flex-direction: column;
    }

    .inputGroup {
      display: flex;
      flex-direction: row;
      align-items: baseline;
      width: fit-content;
    }

    .inputGroup:not(:last-child) {
      margin-bottom: 5%;
    }



    input {
      height: 50px;
      width: 380px;
      padding: 15px 111px 17px 13px;
      font-family: Montserrat;
      font-size: 14px;
      font-weight: 300;
      letter-spacing: 0;
      line-height: 18px;
      border-radius: 2px;
      background-color: #1E1E1E;
      border: none;
      border-bottom: 1px solid #656563;
      color: #ffffff;
    }

    label {
      color: #c4c4c4;
      margin-right: 10px;
      width: 90px;
    }

    .infos {
      margin-top: 50px;
    }

    p {
      font-size: 14px;
      color: #c4c4c4;
      margin: 0px;
    }

    a {
      color: #c4c4c4;
      text-decoration: underline;
    }

    a:hover {
      color: #00A5C8;
      transition: 0.2s ease-in;
      text-decoration: underline;
    }

    
   

  
</style>
