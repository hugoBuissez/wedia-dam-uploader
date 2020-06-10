
<template>
<body>
  <div class="mainCont">
    <div class="left">
      <header>
        <img src="../../../../static/favicon.png" alt="">
        <span>Hugo BUISSEZ</span>
      </header>

      <hr />

      <div class="navList">
        <ul>
          <a href="#" id="downloadTab" :class="{ curTab: downloadTab }" @click="fun($event)">
            <li>Transferts en cours   
            <b-badge pill variant="secondary" class="ml-2">11</b-badge> 
            </li>
          </a>
          <a href="#" id="logsTab" :class="{ curTab: logsTab }" @click="fun($event)">
            <li>Logs des transferts</li>
          </a>
          <a href="#" id="histoTab" :class="{ curTab: histoTab }" @click="fun($event)">
            <li>Historique des transferts</li>
          </a>
          <a href="#" id="accountTab" :class="{ curTab: accountTab }" @click="fun($event)">
            <li>Compte</li>
          </a>
          <a href="#" id="settingsTab" :class="{ curTab: settingsTab }" @click="fun($event)">
            <li>Paramètres</li>
          </a>
        </ul>
      </div>
    </div>

    <account-tab v-if="accountTab"></account-tab>   
    <download-tab v-if="downloadTab"></download-tab>

  </div>
</body>
</template>

<script>

import accountTab from '../tabs/AccountTab'
import downloadTab from '../tabs/DownloadTab'

export default {
  name: "main-view",
  components: { accountTab, downloadTab },
  data() {
    return {
        curTab: "downloadTab",
        downloadTab: true,
        accountTab: false,
        histoTab: false,
        logsTab: false,
        settingsTab: false
    };
  },
  methods: {
      fun: function (event) {
          let id = event.currentTarget.id;
          this.$set(this, this.curTab, false);
          this.$set(this, id, true);
          this.curTab = id;
      }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600&display=swap");
    
    

    html, body {
    height: 740px;
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: "Montserrat", sans-serif;
    }

    hr {
    width: 100%;
    border-top: 1.5px solid #50545f;
    margin: 0;
    }

    a,
    a:hover {
    text-decoration: none;
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

    .mainCont {
    width: 100%;
    height: 100%;
    display: flex;
    }

    .left {
    width: 30%;
    height: 100%;
    background-color: #353940;
    position: fixed;
    left: 0;
    top: 0;
    }

    header {
    padding: 30px 50px;
    display: flex;
    align-items: center;
    }

    header span {
    font-size: 25px;
    color: #f1f1f2;
    font-weight: 600;
    margin-left: 7px;
    }

    .navList {
    margin-top: 50px;
    }

    .navList ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    padding: 0;
    width: 100%;
    padding-left: 30px;
    }

    .navList ul a {
    color: #6d6f74;
    font-size: 16px;
    font-weight: 600;
    height: 50px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 20px;
    border-radius: 6px 0 0 6px;
    transition: 0.3s all;
    }

    .navList ul a:hover {
    background-color: #15161b;
    }

    .navList ul a:not(:last-child) {
    margin-bottom: 10px;
    }

    .curTab {
    background-color: #15161b;
    color: rgb(255, 255, 255)!important;
    }
</style>
