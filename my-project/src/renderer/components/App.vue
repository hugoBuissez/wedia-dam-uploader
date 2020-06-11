
<template>
<html>
<body>
  <div class="dragArea"></div>
  <div class="mainCont">
    <div class="left">
      <header>
        <img src="../../../static/favicon.png" alt />
        <h3>Hugo<span>BUISSEZ</span></h3>
      </header>

      <div class="navList">
        <ul>
          <a href="#" id="uploadTab" :class="{ curTab: uploadTab }" @click="fun($event)">
            <li>
              <b-icon icon="cloud-upload" class="menuIcons"></b-icon>
              <span>Transferts en cours</span>
              <b-badge pill variant="secondary" class="ml-2">11</b-badge>
            </li>
          </a>
          <a href="#" id="logsTab" :class="{ curTab: logsTab }" @click="fun($event)">
            <li>
              <b-icon icon="card-checklist" class="menuIcons"></b-icon>
              <span>Logs des transferts</span>
            </li>
          </a>
          <a href="#" id="histoTab" :class="{ curTab: histoTab }" @click="fun($event)">
            <li>
              <b-icon icon="clock-history" class="menuIcons"></b-icon>
              <span>Historique des transferts</span> 
            </li>
          </a>
          <a href="#" id="accountTab" :class="{ curTab: accountTab }" @click="fun($event)">
            <li>
              <b-icon icon="person-lines-fill" class="menuIcons"></b-icon>
              <span>Compte</span>  
            </li>
          </a>
          <a href="#" id="settingsTab" :class="{ curTab: settingsTab }" @click="fun($event)">
            <li>
              <b-icon icon="gear" class="menuIcons"></b-icon>
              <span>Paramètres</span>  
            </li>
          </a>
        </ul>
      </div>
      <div class="footerLeft">
        <a href="" @click="open('https://www.wedia-group.com/fr/contact-2/')"><b-icon icon="info-circle" class="dlIcons"></b-icon>Support</a>
        <a href=""><b-icon icon="chat-quote" class="dlIcons"></b-icon>Langues</a>
      </div>
    </div>

    <account-tab v-if="accountTab"></account-tab>
    <upload-tab v-if="uploadTab"></upload-tab>
    <histo-tab v-if="histoTab"></histo-tab>
    <settings-tab v-if="settingsTab"></settings-tab> 
    <logs-tab v-if="logsTab"></logs-tab> 

  </div>
</body>
</html>
</template>

<script>

import accountTab from "./tabs/accountTab";
import uploadTab from "./tabs/uploadTab";
import histoTab from "./tabs/histoTab";
import logsTab from "./tabs/logsTab";
import settingsTab from "./tabs/settingsTab";

export default {
  name: "app",
  components: { 
    accountTab, 
    uploadTab, 
    histoTab, 
    settingsTab, 
    logsTab 
  },
   
  data() {
    return {
      curTab: "uploadTab",
      uploadTab: true,
      accountTab: false,
      histoTab: false,
      logsTab: false,
      settingsTab: false
    };
  },
  methods: {
    fun: function(event) {
      let id = event.currentTarget.id;
      this.$set(this, this.curTab, false);
      this.$set(this, id, true);
      this.curTab = id;
    },
    open: function(url) {
      require("electron").shell.openExternal(url)
    } 
  }
};
</script>

<style >
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600&display=swap");


body::-webkit-scrollbar {
  display: none;
}

html {
  height: 100%;
}


body {
  min-height: 100%;
  width: 100%;
  font-family: "Montserrat", sans-serif;
}

.dragArea {
  width: 100%;
  height: 20px;
  background-color: #282828;
  z-index: -1;
  -webkit-app-region: drag;
  position: fixed;
}

html, body, h3 {
  margin: 0;
  padding: 0;
}

hr {
  width: 100%;
  border-top: 1.5px solid #50545f;
  margin: 0;
}

a,
a:hover {
  text-decoration: none;
  cursor: pointer;
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
  background-color: #3C3C3B;
  position: fixed;
  left: 0;
  top: 0;
}

header {
  padding: 30px 50px;
  display: flex;
  align-items: center;
}

header h3 {
  font-size: 25px;
  color: #f1f1f2;
  font-weight: 200;
  margin-left: 7px;
}

header h3 span {
  font-weight: 600;
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
  color: #656563;
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
  background-color: #1E1E1E;
}

.navList ul a:not(:last-child) {
  margin-bottom: 10px;
}

.navList ul li {
  display: flex;
  align-items: center;
}

.menuIcons {
  height: 30px;
  width: 30px;
  margin-right: 10px;
}

.curTab {
  background-color: #1E1E1E;
  color: #fff !important;
}

.footerLeft {
  position: fixed;
  bottom: 0;
  display: flex;
  width: 367.5px;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  font-weight: lighter;
  font-size: 15px;
}

.footerLeft a {
    color: #f1f1f2;
}

.footerLeft a:not(:first-child) {
    margin-left: 20px;
}

.dlIcons {
    margin-right: 5px;
}

    .right {
    margin-left: 30%;
    width: 100%;
    min-height: 100vh;
    height: fit-content;   
    background-color: #1E1E1E;
    scrollbar-width: none;
    font-family: "Montserrat", sans-serif;
    }

</style>
