<template>
  <div class="right">

    <header>
        <h3>Mon historique</h3>
    </header>

     <div class="searchBar">
        <b-form-input 
          id="input-1"
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
          <th>File name</th>
          <th>Upload date</th>
          <th>Size</th>
          <th>Status</th>
          </tr>

          <tr v-for="file in filteredList" :key="file.id">
            <td>
              <b-icon icon="file-earmark" class="dlIcons"></b-icon>{{ file.name }}
            </td>
            <td>{{ file.date }} {{file.time}}</td>
            <td>{{ file.size }} {{ file.unit }}</td>
            <td class="succ">{{ file.status }}</td>
          </tr>   
        </table>
      </div>
  </div>
</template>

<script>
export default {

  data() {
      return {
        value: 0,
        max: 100,
        searchAsset: '',
        files: []
      }
    },  

  mounted() {
    if (localStorage.histoArray) {
        this.files = JSON.parse(localStorage.getItem("histoArray"));
    }
  },

  computed: {
      // Search tool
      filteredList() {
        return this.files.filter(file => {
          return JSON.stringify(file).toLowerCase().includes(this.searchAsset.toLowerCase())
        })
      }
    },
}
</script>

<style scoped>

    header {
        padding-left: 30px;
        padding-bottom: 20px;
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

    .right {
    margin-left: 30%;
    width: 100%;
    min-height: 100vh;
    height: fit-content;    
    background-color: #1E1E1E;
    color: white;
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


    .succ {
        color: #00A5C8;
    }

    
</style>