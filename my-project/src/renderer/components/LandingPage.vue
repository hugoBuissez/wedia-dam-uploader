/* eslint-disable */

<template>
  <div id="wrapper">
    <b-img id="logo" class="mb-5" src="https://diievents.dii.eu/chief-marketing-officer/wp-content/uploads/sites/8/2016/12/WEDIA-logo-final.jpg"></b-img>
    <menu-index></menu-index>
    <main>
      <div class="left-side">
        <b-breadcrumb :items="items"></b-breadcrumb>
        <span class="title">
          Welcome to your new project!
        </span>
        <system-information></system-information>        
        <div>
    
  </div>
      </div>

      <div class="right-side">
        <div class="doc">
          <div class="title">Getting Started</div>
          <p>
            electron-vue comes packed with detailed documentation that covers everything from
            internal configurations, using the project structure, building your application,
            and so much more.
          </p>
          <button @click="open('https://simulatedgreg.gitbooks.io/electron-vue/content/')">Read the Docs</button><br><br>
        </div>
        
      </div>
    </main>

    <div>
    </div>
  </div>
    
</template>

<script>
  import MenuIndex from './SideMenu'
  import SystemInformation from './LandingPage/SystemInformation'
  import DatePicker from './DatePicker'
  import DragDrop from './DragDrop'

  export default {
    name: 'landing-page',
    components: { SystemInformation, MenuIndex, DatePicker, DragDrop },
    data () {
      return {
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
      }
    }

  }
</script>

<style>
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

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
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
