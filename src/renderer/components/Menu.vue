  <template>
  <div class="mb-3"> 
    <b-button v-b-toggle.sidebar-1 >Toggle Menu</b-button>
    <b-sidebar id="sidebar-1" title="Menu" shadow>
      <hr class="w-75 mx-auto">
      <div class="px-3 py-2">
        <div>
            <b-col>
                <b-row class="mb-3"><b-button class="w-100">Upload</b-button></b-row>
                <b-row class="mb-3"><b-button class="w-100">Documentation</b-button></b-row>
                <b-row class="mb-3"><b-button class="w-100">About</b-button></b-row>

            </b-col>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
  export default {
    name: 'menu',
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
