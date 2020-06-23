
<template>
<html>
  <body>
    <div class="dragArea"></div>
    <div class="mainCont">
      <div class="left">
        <header>
          <img class="userLogo" src="../../../static/favicon.png" alt />
          <h3>
            Hugo
            <span>BUISSEZ</span>
          </h3>
        </header>

        <!-- TAB LIST -->
        <div class="navList">
          <ul>
            <a
              href="#"
              id="overviewTab"
              :class="{ curTab: overviewTab }"
              @click="changeTab($event)"
            >
              <li>
                <b-icon icon="search" class="menuIcons"></b-icon>
                <span>Overview</span>
                <b-badge v-if="nbFile > 0" pill variant="secondary" class="ml-2">{{ nbFile }}</b-badge>
              </li>
            </a>
            <a href="#" id="uploadTab" :class="{ curTab: uploadTab }" @click="changeTab($event)">
              <li>
                <b-icon icon="cloud-upload" class="menuIcons"></b-icon>
                <span>Transferts en cours</span>
                <b-badge v-if="nbFile > 0" pill variant="secondary" class="ml-2">{{ nbFile }}</b-badge>
              </li>
            </a>
            <a href="#" id="histoTab" :class="{ curTab: histoTab }" @click="changeTab($event)">
              <li>
                <b-icon icon="clock-history" class="menuIcons"></b-icon>
                <span>Historique des transferts</span>
              </li>
            </a>
            <a href="#" id="accountTab" :class="{ curTab: accountTab }" @click="changeTab($event)">
              <li>
                <b-icon icon="person-lines-fill" class="menuIcons"></b-icon>
                <span>Compte</span>
              </li>
            </a>
            <a
              href="#"
              id="settingsTab"
              :class="{ curTab: settingsTab }"
              @click="changeTab($event)"
            >
              <li>
                <b-icon icon="gear" class="menuIcons"></b-icon>
                <span>Paramètres</span>
              </li>
            </a>
          </ul>
        </div>

        <!-- CIRCLE PROGRESS BAR -->

        <div class="totalCircleBar" v-if="show">
          <vue-circle
            ref="circle_id"
            :progress="0"
            :size="200"
            :reverse="false"
            :fill="fill"
            empty-fill="#3C3C3B"
            :start-angle="0"
            insert-mode="append"
            :thickness="5"
            :show-percent="true"
            :animation="animation"
            @vue-circle-progress="progress"
            @vue-circle-end="progress_end"
          >
            <b-button class="but" v-if="completed" @click="goHistoTab">Voir</b-button>
          </vue-circle>
        </div>
      </div>

      <!-- DIFFERENT TABS -->
      <!-- RIGHT PART -->
      <account-tab v-if="accountTab"></account-tab>
      <upload-tab v-if="uploadTab" :filesList="filesList" :percent="pgdata"></upload-tab>
      <histo-tab v-if="histoTab"></histo-tab>
      <settings-tab v-if="settingsTab"></settings-tab>
      <keep-alive>
        <overview-tab
          v-if="overviewTab"
          @upload-progress-file="uploadProgressFile"
          @upload-progress-total="uploadProgressTotal"
          @files-list="updateFilesList"
          @reset-progress-bar="resetProgressBar"
        ></overview-tab>
      </keep-alive>
    </div>
  </body>
</html>
</template>

<script>
import accountTab from "./tabs/accountTab";
import uploadTab from "./tabs/uploadTab";
import histoTab from "./tabs/histoTab";
import settingsTab from "./tabs/settingsTab";
import overviewTab from "./tabs/overviewTab";
import VueCircle from "vue2-circle-progress";

export default {
  name: "app",
  components: {
    accountTab,
    uploadTab,
    histoTab,
    settingsTab,
    overviewTab,
    VueCircle
  },

  data() {
    return {
      curTab: "overviewTab",
      uploadTab: false,
      accountTab: false,
      histoTab: false,
      settingsTab: false,
      overviewTab: true,

      show: false,
      completed: false,
      fill: { color: "#007F9A" },
      pgdata: 0,
      nbFile: 0,
      animation: { duration: 700, easing: "circleProgressEasing" },

      filesList: []
    };
  },

  methods: {
    progressBar: function() {
      return this.pgdata > 0;
    },

    changeTab: function(event) {
      let id = event.currentTarget.id;
      this.$set(this, this.curTab, false);
      this.$set(this, id, true);
      this.curTab = id;
    },

    goHistoTab: function() {
      this.overviewTab = false
      this.curTab = "histoTab";
      this.histoTab = true;

      this.completed = false;
      this.show = false;

      this.uploadProgressTotal(0);
    },

    open: function(url) {
      require("electron").shell.openExternal(url);
    },

    progress(event, progress, stepValue) {
      //console.log(stepValue);
    },

    progress_end(event) {
      //console.log("Circle progress end");
    },

    uploadProgressTotal(value) {
      this.pgdata = value;
      if (this.pgdata == 100) {
        this.$refs.circle_id.updateFill({ color: "green" });
        this.completed = true;
      }
      this.$refs.circle_id.updateProgress(this.pgdata);
    },

    uploadProgressFile(id, progress) {
      if(!this.show) {
        this.show = true
      }
      this.filesList.forEach(function(file) {
        if (file.id === id) {
          file.progress = Math.floor(progress * 100);
        }
      });
    },

    updateFilesList(newFilesList, nbFile) {
      this.filesList = newFilesList;
      this.nbFile = nbFile;
    },

    resetProgressBar() {
      this.$refs.circle_id.updateProgress(0);
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

.totalCircleBar {
  height: fit-content;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f1f1f2;
  margin: 10% auto;
}

.dragArea {
  width: 100%;
  height: 20px;
  background-color: #282828;
  z-index: -1;
  -webkit-app-region: drag;
  position: fixed;
}

.but {
  height: fit-content;
  width: fit-content;
  color: #C4C4C4;
  font-family: 'Montserrat', sans-serif;
  border: 1px solid #C4C4C4;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 18px;
  text-align: center;
  background-color: transparent;
}

.but:hover {
  border-color: #00A5C8;
  color: #00A5C8;
  background-color: transparent;
}

html,
body,
h3,
ul {
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

.userLogo {
  margin-right: 5px;
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
  background-color: #3c3c3b;
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
  background-color: #1e1e1e;
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
  background-color: #1e1e1e;
  color: #fff !important;
}

.dlIcons {
  margin-right: 5px;
}

.right {
  margin-left: 30%;
  width: 100%;
  min-height: 100vh;
  height: fit-content;
  background-color: #1e1e1e;
  scrollbar-width: none;
  font-family: "Montserrat", sans-serif;
}

.dragDrop {
  padding: 30px;
}

.filepond--root {
  height: 300px;
  max-height: 300px;
}

.filepond--drop-label {
  color: #f1f1f1;
}

.filepond--item {
  width: calc(50% - 0.5em);
}

.filepond--panel-root {
  background-color: #656563;
}

@media (max-width: 1096px) {
  .totalCircleBar,
  .footerLeft,
  ul a li span,
  header h3 {
    display: none;
  }
}

@media (max-height: 750px) {
  .totalCircleBar {
    display: none;
  }
}
</style>
