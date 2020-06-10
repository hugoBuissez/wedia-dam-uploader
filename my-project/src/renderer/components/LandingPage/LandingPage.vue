/* eslint-disable */

<template>
  <div id="wrapper">
    <b-row>
      <b-col>
        <menu-index></menu-index>
      </b-col>
      <b-col class="d-flex flex-row-reverse mb-3">
           <b-button class="ml-1"><b-icon-bell variant="success"></b-icon-bell></b-button>
           <b-button><b-icon-arrow-right-square></b-icon-arrow-right-square></b-button>

      </b-col>
    </b-row>

    <div>
      <b-jumbotron header="DAM Uploader" lead="Upload assets of your choices for your DAM">
        <p>For more information visit website</p>
        <b-progress :value="val" :max="max" show-progress animated></b-progress>
        <b-button class="mt-3" @click="progressBar">Click me</b-button>
      </b-jumbotron>
    </div>

   
  </div>
    
</template>

<script>
  import MenuIndex from './LandingPage/SideMenu'
  import SystemInformation from './LandingPage/SystemInformation'
  import DatePicker from './LandingPage/DatePicker'
  import DragDrop from './LandingPage/DragAndDrop'

  export default {
    name: 'landing-page',
    components: { SystemInformation, MenuIndex, DatePicker, DragDrop },
    data () {
      return {
        val: 0,
        max: 100,
        items: [
          {
            text: 'Index',
            href: '#'
          },
          {
            text: 'Doc',
            href: '#'
          }
        ],
        total: Object,
        dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          headers: { "My-Awesome-Header": "header value" }
        },
        path: 'file://',
        show: false
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      formatNames (files) {
        if (files.length === 1) {
          this.show = true
          return files[0].name
        } else {
          this.show = true
          return `${files.length} files selected`
        }
      },
      randomValue() {
        this.val = Math.random() * this.max;
      },
      progressBar() {
           this.val += 40;      
      }
    }

  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
    margin-right: 30px;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
  
  #drag-file {
    background-color: blue;
    color:white;
    text-align: center;
    width:300px;
    height:300px;
  }
</style>
