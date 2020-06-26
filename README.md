# **wedia-dam-uploader**

wedia-dam-upload is a desktop application for Wedia client which allows mass assets download. It has been developped with Electron and Vuejs.

## Core features

- **Drag and Drop** tool for an easier browsing 
- **Async** uploading via [Filepond](https://github.com/pqina/vue-filepond) component
- General and individual progress of the upload
- **History** of the uploaded (successfully or not) files with related details
- Account informations

--- 

Installation: 

`git clone https://github.com/hugoBuissez/wedia-electron-uploader.git`

`cd wedia-electron-uploader`

`npm install`

Usage:

`npm run dev`

---

## Architecture

The application is rendering the **App.vue** file which renders all the others tabs like **Browse**. The App component is located in the **components** folder and renders the different tabs files. 

```
components
  ├──singin
    └──signInTab.vue <-- Entry point if not logged in
  ├──tabs
    ├──accountTab.vue
    ├──browseTab.vue
    ├──histoTab.vue
    ├──settingsTab.vue
    ├──troubleTab.vue
    └──uploadTab.vue
  └──App.vue <-- Parent component
```

The `src/main/` folder contains the file related to electron paths and windows stuff. 

The *webSecurity* proprety has been desactivated to enable wedia-vue api.















