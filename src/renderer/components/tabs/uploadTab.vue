<template>

  <div class="right">

    <header>
      <h3>Mes transferts</h3>
    </header>
 
      <div class="searchBar">
        <b-form-input 
          v-model="searchAsset"
          type="search"
          required
          placeholder="Rechercher"
          class="inputForm"
        ></b-form-input>
      </div>

      <div class="curDl">
        <table>
          <tr>
          <th>Nom</th>
          <th>Fond</th>
          <th>Taille</th>
          <th>Status</th>
          </tr>

          <tr v-for="file in filteredList" :key="file.name">
            <td>
              <b-icon icon="file-earmark" class="dlIcons"></b-icon>{{ file.name }}
            </td>
            <td>{{ file.collection.toUpperCase() }}</td>
            <td>{{ file.size }} {{ file.unit }}</td>
            <td v-if="file.status == 0" class="error">Error</td>
            <td v-else :class="{done: file.progress == 100}">{{ file.progress }} %</td>
          </tr>

          

        </table>
      </div>
       <b-progress :max="max" class="progressDl">
          <b-progress-bar class="p-g" :value="percent" :label="`${((Math.floor(percent) / max) * 100).toFixed(2)} %`"></b-progress-bar>
        </b-progress>
    </div>
</template>

<script>

  export default {
    props: {
      filesList: Array,
      percent: Number,
    },

    data() {
      return {
        value: 0,
        max: 100,
        searchAsset: '',
      }
    },  


    computed: {
      // Search tool
      filteredList() {
        return this.filesList.filter(file => {
          return JSON.stringify(file).toLowerCase().includes(this.searchAsset.toLowerCase())
        })
      }

    },
  }

</script>

<style scoped>
    @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600&display=swap");

    header {
      padding-left: 30px;
      padding-bottom: 20px;
    }

    .done {
      color: #00A5C8;
    }

    .error {
      color: red;
    }

    
    .right {
    padding-bottom: 60px;
    }


    .searchBar {
      width: 100%;
      padding: 0 30px;
    }

    .inputForm {
      height: 40px;
      width: 100%;
      color: #ffffff;
      background-color: #3C3C3B;
      font-family: "Montserrat", sans-serif;
      font-size: 14px;
      font-weight: 200;
      letter-spacing: 0;
      line-height: 18px;
      border: none;
      outline-style: none;
      box-shadow: none;
      border-color: transparent;
    }

    .curDl {
    width: 100%;
    padding: 30px 30px;
    color: #fff;
    }

    .curDl table {
    border-collapse: collapse;
    width: 100%;
    }

    .curDl th,
    tr {
    border-bottom: 1px solid rgb(53, 53, 53);
    }

    .curDl th {
    height: 40px;
    text-align: left;
    color: #757d8b;
    font-weight: bolder;
    scrollbar-width: none;

    }

    .curDl tr td {
        padding: 17px 0;
    }

    .curDl tr td:first-child {
        padding-left: 20px;
    }

    .curDl td {
    font-weight: 500;
    font-size: 13px;

    }

    .dlIcons {
    width: 20px;
    height: 15px;
    margin-right: 5px;
    }

    .mainCont {
    width: 100%;
    height: 100%;
    display: flex;
    }
   
    .curTab {
    background-color: #1E1E1E;
    }

    .userIcon {
    height: 50px;
    width: 50px;
    color: #fff;
    }


    .progressDl {
    position: fixed;
    bottom: 0;
    width: 70%;
    background:transparent!important;
    opacity: 0.9;
    }

    .p-g {
    background-color: #007F9A!important;

    }
    
</style>