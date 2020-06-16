<template>

  
    
   <div class="right">
    <header>
      <h3>Mon compte</h3>
    </header>

    <div class="cont">

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
      padding: 30px;
      
    }

   

  
</style>
