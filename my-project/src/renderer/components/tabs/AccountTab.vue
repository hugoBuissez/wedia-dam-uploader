<template>
  <div class="right">

    <we-cursor-provider path="dam/asset">
      <template #default="cursor">
        <div>
          <dam-list :cursor="cursor"/>
        </div>
      </template>
    </we-cursor-provider>
  </div>
</template>

<script>

import damList from "../dam/DamList"

export default {
  name: "account-tab",
  components: { damList },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600&display=swap");

    body {
    height: 740px;
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: "Montserrat", sans-serif;
}

  
    .searchBar {
    width: 100%;
    padding: 30px 30px 0 30px;
    }

    .inputForm {
    height: 40px;
    width: 100%;
    color: #454545;
    background-color: #22252f;
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    font-weight: 200;
    letter-spacing: 0;
    line-height: 18px;
    border: none;
    }
  
    .right {
    margin-left: 30%;
    width: 100%;
    height: 765px;
    background-color: #1E1E1E;
    color: white;
    }

  
</style>
