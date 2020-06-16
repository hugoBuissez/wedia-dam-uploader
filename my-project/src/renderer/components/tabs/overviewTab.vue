<template>
  <div class="right">

    <header>
      <h3>Choisissez les fichiers à uploader sur votre DAM !</h3>
    </header>

    <div class="clear-btn-cont">
      <b-button @click='clearFiles' class="but-clear">Clear the {{ nbFiles }} file(s) ?</b-button>
    </div>
    
    <div class="dragDrop">

        <file-pond
        id="file_pond"
        name="test"
        ref="pond"
        label-idle="Importez vos fichiers ici !"
        v-bind:allow-multiple="true"
        v-bind:instantUpload="false"
        :server="{ process, load }"
        accepted-file-types="image/jpeg, image/png"
        v-bind:files="filesListNames"
        v-on:init="handleFilePondInit"
        v-on:addfileprogress="handleAddFileProgress"
        v-on:addfile="handleFileAdded"
        v-on:removefile="handleRemoveFile"
        v-on:processfile="handleProcessFile"
        v-on:processfileprogress="handleProcessFileProgress"/>
    </div>

    <div class="clear-btn-cont">
      <b-button @click='processFiles' class="but-clear">Upload {{ nbFiles }} file(s) ?</b-button>
    </div>
 


  </div>
</template>

<script>

import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

const FilePond = vueFilePond(FilePondPluginFileValidateType);

export default {


    components: {
        FilePond
    },

    data: function() {
        return { 
          myFiles: [],
          fileToUpload: [],
          nbFiles: 0,
          percent: 0,
          ended: 0
        };
    },

    watch: {
      percent(newVal) {
        this.percent = newVal
      }
    },

    methods: {  

      updatePercent: function(val) {
        
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


      handleFilePondInit: () => {
        console.log('FilePond has initialized');
      },


      handleFileAdded: function(err, file) {
        try {
          
          var newFile = { 
            id: file.id,
            name: file.filename,
            size: file.fileSize,
            progress: 0,
          }

          this.fileToUpload.push(newFile)
          this.nbFiles++;

          this.$emit('files-list',  this.fileToUpload)


        } catch (err) {
          console.error(err);
        }  
      },

      handleRemoveFile: function(err, file) {
        try {

          console.log("File removed");
          const index = this.myFiles.indexOf(file.path);
          this.nbFiles--;

          if(index > -1) {
            this.myFiles.splice(index, 1);
          }

        } catch (err) {
          console.error(err);
        }       
      },

      handleProcessFile(err, file) {
        try {
          this.ended++;
          this.$emit('upload-progress-total',  (this.ended / this.nbFiles) * 100)
        } catch (err) {
          console.error(err)
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
        this.$refs.pond.removeFiles();     
      },

      processFiles: function() {
        this.$refs.pond.processFiles();
      }

  },    
};

</script>

<style scoped>

  * {
    color: white;
  }

  header {
    padding-left: 30px;
    margin-bottom: 10%;
  }

  .clear-btn-cont {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .clear-btn {
    margin: 0 auto;
    width: 20%;
  }


  

</style>