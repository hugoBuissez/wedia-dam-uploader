<template>
  <div class="right">

    <header>
      <h3>Choisissez les fichiers à uploader sur votre DAM !</h3>
    </header>

    <transition name="bounce">
     <b-alert
      variant="danger"
      dismissible
      :show="showAlert"
      @dismissed="showAlert=false"
      class="alert"
    >
      Vous devez charger au moins 1 fichier.
    </b-alert>
    </transition>


    <div class="cont">

    <!-- :server="{ process, load }" -->
    
    <div class="dragDrop">
        <file-pond
        id="file_pond"
        name="test"
        ref="pond"
        :label-idle="labelPond"
        server="http://localhost:8080/fileupload"
        v-bind:allow-multiple="true"
        v-bind:instantUpload="false"
        @addfile="handleFileAdded"
        @processfile="handleProcessFile"
        @processfileprogress="handleProcessFileProgress"
        @removefile="handleRemoveFile"
        @error="handleError"/>
    </div>

    <div class="panel">

     <!--   <p class="infosFiles"><span>{{ nbFiles }}</span> Fichier(s)</p> -->

    <div class="collections">
      <ul>
        <li :class="{ active: assets }" id="assets" @click="changeTab">Assets
        </li>
        <li :class="{ active: brandcenter }" id="brandcenter" @click="changeTab">Brandcenter</li>
        <li :class="{ active: communication }" id="communication" @click="changeTab">Communication</li>
      </ul>
    </div>

    <p>Choississez un fond pour uploader vos fichiers. <br>
    Ils seront chargés selon l'onglet dans lequel vous vous situez. Vous pouvez retrouver vos fichiers et leur fond associé dans l'onglet <strong>transferts en cours</strong>.</p>
    
    
    <p class="infosCol"> Vous êtes actuellement sur le fond <br>
    <b>{{ active.toUpperCase() }}</b> <br> <br>
    <span v-if="assets"> {{ assetsFiles }} fichier(s) sur ce fond</span>
    <span v-if="brandcenter">{{ brandcenterFiles }} fichier(s) sur ce fond</span>
    <span v-if="communication">{{ communicationFiles }} fichier(s) sur ce fond</span>
    </p>

     <div class="buttons">

      <div class="clear-btn-cont">
        <b-button @click='processFiles' class="but normal upl" :disabled="uploadDisabled">Upload</b-button>
      </div>

      <div class="clear-btn-cont">
        <b-button class="but normal clear" @click="openModal">effacer</b-button>
        <b-modal 
        class="clearForm" 
        id="clearFilesModal" 
        title="Avertissement" 
        centered 
        header-text-variant="dark" 
        hide-footer>
          <p class="my-4">Voulez-vous vraiment supprimer tous les fichiers du board ?</p>
          <p class="my-4">Si des chargements ont déjà commencé, ils seront perdus.</p>
          <b-button class="but small mt-3" @click="clearFiles">Oui</b-button>
          <b-button class="but small mt-3" @click="$bvModal.hide('clearFilesModal')">Retour</b-button>
        </b-modal>
      </div>

    </div>
    </div>
    </div>
  </div>
</template>

<script>

import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
// import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode'

const FilePond = vueFilePond(
  FilePondPluginFileValidateSize,
  );

  


export default {

    components: {
        FilePond
    },

    data: function() {
        return { 
          fileToUpload: [],
          histoArray: [],
          nbFiles: 0,
          percent: 0,
          ended: 0,
          showAlert: false,
          uploadDisabled: false,

          active: "assets",
          assets: true,
          brandcenter: false,
          communication: false,

          assetsFiles: 0,
          brandcenterFiles: 0,
          communicationFiles: 0,
        };
    },

     mounted() {
      if (localStorage.histoArray) {
        this.histoArray = JSON.parse(localStorage.getItem("histoArray"));
      }
    },

    watch: {
      histoArray(newArray) {
        localStorage.setItem("histoArray", JSON.stringify(newArray));;
      }, 

    },

    computed: {
      labelPond() {
        return '<p style="font-family: Montserrat, sans-serif;"> Glissez et déposez vos fichiers ci-dessous OU <br> \
                <span style="text-decoration: underline; cursor: pointer;"> \
                Parcourez</span> votre ordinateur </p>';
      }
    },

    methods: {  

      changeTab: function(event) {
        let id = event.currentTarget.id;
        this.$set(this, this.active, false);
        this.$set(this, id, true);
        this.active = id;
      },

      process: (fieldName, file, metadata, load) => {
        // simulates uploading a file
        setTimeout(() => {
            load(Date.now())
        }, 400);
      },

      load: (source, load) => {
          console.log(source);
          console.log(load);
          // simulates loading a file from the server
          fetch(source)
          .then(res => { console.log(res); return res.blob();})
          .then((blob) =>{console.log(blob); return load(blob);});
      },

      // CALLBACKS HANDLERS
      
      handleError: function(err, [, file, status]) {
          console.log(file);
          console.log(err)
          file.abortProcessing()
      },

      handleFileAdded: function(err, file) {
        try {
          

          var unit = 'Ko'
          var size;
          
          if(file.fileSize > 1000000000) {
            unit = 'Go'
            size = file.fileSize / 1000000000;
          } else if(file.fileSize > 100000) {
            unit = 'Mo'
            size = file.fileSize / 1000000
          } else if(file.fileSize > 1000) {
            unit = 'Ko'
            size = file.fileSize / 1000
          }   

          switch (this.active) {
            case 'assets':
              this.assetsFiles++;
              break;
            case 'brandcenter':
              this.brandcenterFiles++;
              break;
            default:
              this.communicationFiles++;
              break;
          }
          
          var newFile = { 
            id: file.id,
            name: file.filename,
            size: Math.floor(size),
            unit: unit,
            progress: 0,
            collection: this.active,
            status: file.status
          }

          this.fileToUpload.unshift(newFile)

          this.nbFiles++;

          this.$emit('files-list',  this.fileToUpload, this.nbFiles)

        } catch (err) {
          console.error(err);
        }  
      },

      handleRemoveFile: function(err, file) {
        try {

          this.nbFiles--;
          this.$emit('files-list',  this.fileToUpload, this.nbFiles)

          var collection;
          let i = 0

          for (i; i < this.fileToUpload.length; i++) {
            if(this.fileToUpload[i].id == file.id) {
              collection = this.fileToUpload[i].collection
              break;
            }
          }

          switch (collection) {
            case 'assets':
              this.assetsFiles--;
              break;
            case 'brandcenter':
              this.brandcenterFiles--;
              break;
            default:
              this.communicationFiles--;
              break;
          }

          this.fileToUpload.splice(i, 1)

        } catch (err) {
          console.error(err);
        }       
      },

      handleProcessFile(err, file) {
        try {    
                   
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0');
          var yyyy = today.getFullYear();

          var date = mm + '-' + dd + '-' + yyyy;
          var time = today.getHours() + ":" + today.getMinutes();

          var unit = 'Ko'
          var size = file.fileSize
          var status = file.status
          var collection = '';
          
          if(file.fileSize > 1000000000) {
            unit = 'Go'
            size = file.fileSize / 1000000000;
          } else if(file.fileSize > 1000000) {
            unit = 'Mo'
            size = file.fileSize / 1000000
          } else if(file.fileSize > 1000) {
            unit = 'Ko'
            size = file.fileSize / 1000
          }        
          
          if(file.status == 5 || file.status == 2) {
            status = "Success"
          } else {
            status = "Error"
          }

          this.fileToUpload.forEach(f => {
            if(f.id == file.id) {
              collection = f.collection;
            }
          });

          var histoFile = { 
            id: file.id,
            name: file.filename,
            date: date,
            time: time,
            unit: unit,
            size: Math.round(size),
            status: status,
            code: file.status,
            path: file.file.path,
            collection: collection
          }


          this.histoArray.unshift(histoFile)
          
          this.ended++;

          if(file.status == 5 || file.status == 2)
            this.$emit('upload-progress-total',  (this.ended / this.nbFiles) * 100)

          else {
            this.$emit('update-file-upload', file.id)
          }
          
          this.$emit('update-histo-list', this.histoArray)

          if(this.ended == this.nbFiles) {           
            this.uploadDisabled = false;
            this.ended = 0;
          }
        } catch (err) {
        }
      },

      handleProcessFileProgress(file, progress) {
        try {
          this.$emit('upload-progress-file', file.id, progress)
        } catch (err) {
          console.error(err)
        }
      },

      /**
       *  METHODS
       */

      clearFiles: function() {
        if(this.nbFiles > 0) {
          this.$refs.pond.removeFiles();  
          this.uploadDisabled = false;
          this.ended = 0;
         
          this.$emit('upload-progress-total',  0, 'reset')
        }

        this.$bvModal.hide('clearFilesModal')
      },

      processFiles: function() {
        try {

          if(this.nbFiles <= 0) {
            this.showAlert = true;
          } else {
            this.uploadDisabled = true;
            this.$refs.pond.processFiles();
          }

          this.$emit('update-retry-files')
        } catch (err) {
            console.log(err)
          } 
        },

      openModal: function() {
        if(this.nbFiles > 0) {
          this.$bvModal.show('clearFilesModal')
        }
      }
  },    
};

</script>

<style scoped>


  header {
    padding-left: 30px;
    margin-bottom: 10%;
  }

  .cont {
    display: flex;
    flex-direction: row;
    height: 100%;
  }

  .panel {
   
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
    margin: 30px;
    position: relative;
  }

  .collections ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .collections ul li {
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.2s;
  }

  .collections ul li:hover:not(.active) {
    color: #00A5C8;
  }

  .collections ul li:not(:first-child) {
    margin-left: 25px;
  }

  .panel p {
    position: absolute;
    top: 15%;
    color: #fff;
    font-size: 17px;
    font-weight: 200;
  }

  .panel .infosCol {
    position: absolute;
    top: 50%;
    font-size: 18px;
  }

  .active {
    border-bottom: 2px solid #00A5C8;
  }

  .infosFiles {
    color: #FFFFFF;
    font-size: 20px;
    margin: 0;
  }

  p {
    font-size: 14px;
    color: #000;
  }

  b {
    color: #00A5C8;
    font-weight: bold;
  }

  .but {
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 18px;
    text-align: center;
    border-radius: 4px;
    background-color: #00A5C8;
    border-color: #00A5C8;
    text-transform: uppercase;
  }

  .buttons {
    position: absolute;
    bottom: 100%;
    display: flex;
    justify-content: flex-start;
    bottom: 0;
  }

  .clear {
    background: transparent;
    margin-left: 25px;
    border: none;
  }

  .small {
    height: 40px;
    width: 120px;
    padding: 3px 7px;
  }

  .normal {
    height: 50px;
    width: 140px;
    padding: 16px 8px;
  }


  .clear:hover {
    border: 1px solid #00A5C8;
    color: #fff;
  }
  

  .alert {
    margin: 0 30px;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    color: #a83329;
  }

  .dragDrop {
    width: 50%;  
  }

  @media (max-width: 1350px) {
    .cont {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: fit-content;
    }

    .dragDrop {
      padding: 0;
      width: 80%;
      height: 20%;

    }

    .panel {
      height: 500px;
      margin: 30px auto;
    }

}


  

</style>