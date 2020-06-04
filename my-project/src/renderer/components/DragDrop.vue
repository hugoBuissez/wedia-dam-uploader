<template>
    <vue-dropzone :options="dropzoneOptions">
      
    </vue-dropzone>
</template>

<script>

import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'drag-drop',
  components: {
    vueDropzone: vue2Dropzone
  },
  data: function () {
    return {
      dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 50,
          headers: { "My-Awesome-Header": "header value" },
          addRemoveLinks: true,
          dictDefaultMessage: "<i class='fa fa-cloud-upload'></i> UPLOAD"
      }
    }
  }
}
</script>

<style>


</style>



