<template>
    <div class="right">
      <div class="searchBar">
        <b-form-input
          id="input-1"
          type="email"
          required
          placeholder="Rechercher"
          class="inputForm"
        ></b-form-input>
      </div>

      <div class="curDl">
        <table>
          <tr>
          <th>Name</th>
          <th>Size</th>
          <th>Status</th>
          </tr>

          <we-cursor-provider path="dam/asset" target-status="loaded">
              <template #default="{ dataEntities }">
                  <tr v-for="entity in dataEntities" :key="entity.id">
                    <td>
                      <b-icon icon="file-earmark" class="dlIcons"></b-icon>{{ entity.name }}
                    </td>
                    <td>6 GB</td>
                    <td>39%</td>
                  </tr>
              </template>
         </we-cursor-provider>

          <tr>
            <td>
              <b-icon icon="file-earmark" class="dlIcons"></b-icon>Filename.jpg
            </td>
            <td>6 GB</td>
            <td>39%</td>
          </tr>

          <tr>
            <td>
              <b-icon icon="folder" class="dlIcons"></b-icon>Photos voyage
            </td>
            <td>5 GB</td>
            <td>10%</td>
          </tr>

          <tr>
            <td>
              <b-icon icon="camera-video" class="dlIcons"></b-icon>vlog.mp4
            </td>
            <td>100 GB</td>
            <td>98%</td>
          </tr>

          <tr>
            <td>
              <b-icon icon="folder" class="dlIcons"></b-icon>Assets
            </td>
            <td>9 GB</td>
            <td>39%</td>
          </tr>

          <tr>
            <td>
              <b-icon icon="folder" class="dlIcons"></b-icon>Photos voyages
            </td>
            <td>10 GB</td>
            <td>Done</td>
          </tr>

          <tr>
            <td>
              <b-icon icon="file-earmark" class="dlIcons"></b-icon>Filename.jpg
            </td>
            <td>6 GB</td>
            <td>39%</td>
          </tr>

          <tr>
            <td>
              <b-icon icon="folder" class="dlIcons"></b-icon>Photos voyage
            </td>
            <td>5 GB</td>
            <td>10%</td>
          </tr>

          <tr>
            <td>
              <b-icon icon="camera-video" class="dlIcons"></b-icon>vlog.mp4
            </td>
            <td>100 GB</td>
            <td>98%</td>
          </tr>

          <tr>
            <td>
              <b-icon icon="file-earmark" class="dlIcons"></b-icon>Filename.jpg
            </td>
            <td>6 GB</td>
            <td>39%</td>
          </tr>

          <tr>
            <td>
              <b-icon icon="folder" class="dlIcons"></b-icon>Photos voyage
            </td>
            <td>5 GB</td>
            <td>10%</td>
          </tr>

          <tr>
            <td>
              <b-icon icon="file-earmark" class="dlIcons"></b-icon>Filename.jpg
            </td>
            <td>6 GB</td>
            <td>39%</td>
          </tr>

          <tr>
            <td>
              <b-icon icon="folder" class="dlIcons"></b-icon>Photos voyage
            </td>
            <td>5 GB</td>
            <td>10%</td>
          </tr>

          <tr>
            <td>
              <b-icon icon="camera-video" class="dlIcons"></b-icon>vlog.mp4
            </td>
            <td>100 GB</td>
            <td>98%</td>
          </tr>

          <tr>
            <td>
              <b-icon icon="file-earmark" class="dlIcons"></b-icon>Filename.jpg
            </td>
            <td>6 GB</td>
            <td>39%</td>
          </tr>

          <tr>
            <td>
              <b-icon icon="folder" class="dlIcons"></b-icon>Photos voyage
            </td>
            <td>5 GB</td>
            <td>10%</td>
          </tr>

          <tr>
            <td>
              <b-icon icon="file-earmark" class="dlIcons"></b-icon>Filename.jpg
            </td>
            <td>6 GB</td>
            <td>39%</td>
          </tr>

          <tr>
            <td>
              <b-icon icon="folder" class="dlIcons"></b-icon>Photos voyage
            </td>
            <td>5 GB</td>
            <td>10%</td>
          </tr>

          <tr>
            <td>
              <b-icon icon="camera-video" class="dlIcons"></b-icon>vlog.mp4
            </td>
            <td>100 GB</td>
            <td>98%</td>
          </tr>

          <tr>
            <td>
              <b-icon icon="file-earmark" class="dlIcons"></b-icon>Filename.jpg
            </td>
            <td>6 GB</td>
            <td>39%</td>
          </tr>

          <tr>
            <td>
              <b-icon icon="folder" class="dlIcons"></b-icon>Photos voyage
            </td>
            <td>5 GB</td>
            <td>10%</td>
          </tr>

          <tr>
            <td>
              <b-icon icon="camera-video" class="dlIcons"></b-icon>vlog.mp4
            </td>
            <td>100 GB</td>
            <td>98%</td>
          </tr>
        </table>
      </div>
      <div class="progressDl">
        <b-progress class="bg-dark" variant="info" height="50px" value="30" max="100" show-progress></b-progress>
      </div>
    </div>
</template>

<script>

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

    .searchBar {
    width: 100%;
    padding: 30px 30px 0 30px;
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
    margin-top: 50px;
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
    font-size: 15px;
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

    .right {
    margin-left: 30%;
    width: 100%;
    height: fit-content;
    background-color: #1E1E1E;
    scrollbar-width: none;

    }

    .progressDl {
    position: fixed;
    bottom: 0;
    padding: 15px;
    width: 70%;
    background-color: #1E1E1E;
    color: #007F9A!important;
    }
    
</style>