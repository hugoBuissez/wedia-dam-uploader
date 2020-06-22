<template>
   <div class="right">
    
    <header>
      <h3>Logs</h3>
    </header>
 
      <div class="searchBar">
        <b-form-input 
          id="input-1"
          type="search"
          required
          placeholder="Rechercher"
          class="inputForm"
        ></b-form-input>
      </div>

      <div class="curDl">

        <table>
          <tr>
          <th>Time & Date</th>
          <th>Informations</th>
          </tr>

          <tr v-for="log in logs" :key="log.info">
            
          </tr>

          

        </table>
      </div>
   </div>
      
</template>

<script>
export default {
  props: {
    logs: Array,
  }
}
</script>

<style scoped>

  header {
      padding-left: 30px;
      padding-bottom: 20px;
    }

    span {
      color: blanchedalmond;
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
    color: #454545;
    background-color: #3C3C3B;
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    font-weight: 200;
    letter-spacing: 0;
    line-height: 18px;
    border: none;
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