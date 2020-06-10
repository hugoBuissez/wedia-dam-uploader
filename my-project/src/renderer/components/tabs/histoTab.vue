<template>
  <div class="right">

    <header>
        <h3>Mon historique</h3>
    </header>
    
    <div class="curDl">
        <table>
          <tr>
          <th>File name</th>
          <th>Upload date</th>
          <th>Collection</th>
          <th>Status</th>
          </tr>

          <tr>
            <td>
              <b-icon icon="file-earmark" class="dlIcons"></b-icon>Filename.jpg
            </td>
            <td>06/10/20 12:23</td>
            <td>Assets</td>
            <td class="succ">Success</td>
          </tr>

          <tr>
            <td>
              <b-icon icon="file-earmark" class="dlIcons"></b-icon>Old_logo.svg
            </td>
            <td>05/10/20 15:20</td>
            <td>Legacy</td>
            <td style="color: #f56d73;">Error</td>
         </tr>

         <tr>
            <td>
              <b-icon icon="folder-fill" class="dlIcons"></b-icon>logo_folder
            </td>
            <td>01/10/20 15:23</td>
            <td>Brandcenter</td>
            <td class="succ">Success</td>
          </tr>

          <tr>
            <td>
              <b-icon icon="file-earmark" class="dlIcons"></b-icon>Filename.jpg
            </td>
            <td>06/10/20 12:23</td>
            <td>Assets</td>
            <td class="succ">Success</td>
          </tr>
                  
        </table>
      </div>
  </div>
</template>

<style scoped>

    header {
        padding-left: 30px;
    }

    .right {
    margin-left: 30%;
    width: 100%;
    height: 765px;
    background-color: #1E1E1E;
    color: white;
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