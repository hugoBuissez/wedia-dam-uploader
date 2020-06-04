/* eslint-disable */

<template>
  <div class="mb-3"> 
    <b-button v-b-toggle.sidebar-1 >    <b-icon-filter-left></b-icon-filter-left></b-button>
    <b-sidebar id="sidebar-1" title="Menu" shadow>
      <hr class="w-75 mx-auto">
      <div class="px-3 py-2">
        <div>
            <b-col>
                <b-row class="mb-3"><b-button class="w-100 mt-5" v-b-tooltip.hover="'Upload files to your DAM !'">Upload</b-button></b-row>
                <b-row class="mb-3"><b-button class="w-100" v-b-tooltip.hover="'Check Electron documentation'" @click="open('https://electron.atom.io/docs/')">Documentation</b-button></b-row>
                <b-row class="mb-3"><b-button class="w-100" v-b-tooltip.hover="'About the team'">About</b-button></b-row>
            </b-col>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
  export default {
    name: 'side-menu',
    data () {
      return {
        type: Object
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style scoped>
        
</style>
