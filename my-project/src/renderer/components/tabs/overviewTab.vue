<template>
  <div class="right">

    <header>
      <h3>Choisissez les fichiers à uploader sur votre DAM !</h3>
    </header>

    <div class="buttons">

    <div class="clear-btn-cont">
      <b-button @click='processFiles' class="but normal">Upload</b-button>
    </div>

    <div class="clear-btn-cont">
       <b-button class="but normal" @click="openModal">Tout effacer</b-button>
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

    <b-alert
      variant="danger"
      dismissible
      fade
      :show="showAlert"
      @dismissed="showAlert=false"
      class="alert"
    >
      Vous devez charger au moins 1 fichier.
    </b-alert>

    <!-- :server="{ process, load }" -->
    
    <div class="dragDrop">

        <file-pond
        id="file_pond"
        name="test"
        ref="pond"
        label-idle="Importez vos fichiers ici !"
        server="http://localhost:8080/fileupload"
        v-bind:allow-multiple="true"
        v-bind:instantUpload="false"
        accepted-file-types="image/jpeg, image/png"
        @addfile="handleFileAdded"
        @processfile="handleProcessFile"
        @processfileprogress="handleProcessFileProgress"
        @removefile="handleRemoveFile"/>
    </div>

    

  </div>
</template>

<script>

import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginFileValidateSize, );

export default {

    components: {
        FilePond
    },

    data: function() {
        return { 
          myFiles: [],
          fileToUpload: [],
          histoArray: [],
          nbFiles: 0,
          percent: 0,
          ended: 0,
          showAlert: false,
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
      }
    },

    methods: {  

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
          
          var newFile = { 
            id: file.id,
            name: file.filename,
            size: Math.floor(size),
            unit: unit,
            progress: 0,
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

          let index = this.myFiles.indexOf(file.path);
          this.nbFiles--;

          if(index > -1) {
            this.myFiles.splice(index, 1);
          }

          console.log("File removed");
          this.$emit('files-list',  this.fileToUpload, this.nbFiles)

          let i = 0
          for (i; i < this.fileToUpload.length; i++) {
            if(this.fileToUpload[i].id == file.id)
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

          var histoFile = { 
            id: file.id,
            name: file.filename,
            date: date,
            time: time,
            unit: unit,
            size: Math.round(size),
            status: "Success"
          }

          this.histoArray.unshift(histoFile)
          
          this.ended++;
          this.$emit('upload-progress-total',  (this.ended / this.nbFiles) * 100)
          this.$emit('update-histo-list', this.histoArray)

          if(this.ended == this.nbFiles) {
            this.$refs.pond.removeFiles()
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
          this.ended = 0;
          this.$emit('upload-progress-total',  0)
        }

        this.$bvModal.hide('clearFilesModal')
      },

      processFiles: function() {
        if(this.nbFiles <= 0) {
          this.showAlert = true;
        } else {
          this.$refs.pond.processFiles();
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

  
  .buttons {
   
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    margin-bottom: 30px;
  }

  p {
    font-size: 14px;
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

  .but:hover {
    background-color: #007F9A;
    border-color: #007F9A;
  }
  
  .alert {
    margin: 0 30px;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    color: #a83329;
  }


  

</style>