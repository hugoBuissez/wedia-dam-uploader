# **wedia-dam-uploader**

wedia-dam-upload is a desktop application for Wedia client which allows mass assets upload. It has been developed with Electron and Vuejs.

Fork [eletron-vue-quickstart](https://github.com/SimulatedGREG/electron-vue)

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
components/
  ├──singin/
    └──signInTab.vue <-- Entry point if not logged in
  ├──tabs/
    ├──accountTab.vue
    ├──browseTab.vue
    ├──histoTab.vue
    ├──settingsTab.vue
    ├──troubleTab.vue
    └──uploadTab.vue
  └──App.vue <-- Parent component
```

The `src/main/` folder contains the file related to electron paths and windows stuff. 

The *webSecurity* proprety has been desactivated to enable wedia-vue API.

## General operation

The app is updating an **array** of files everytime in all the components. The array is filled in the browser tab depending on what is loaded in the drop zone. This array is transmitted to the other components like the **upload** tab which displays the current uploading so it needs to have the array constantly updated. 

The process of transmission is basic. For example, the browser tab filled his array, emit the **event** that the array has been modified, the **App** component listen to this tab, update its array and tansmit the updated array to the **upload** tab by the props:

```javascript
/// browserTab.vue -- App.vue's child
this.$emit('array-updated', browserArray) // Called when a file is added, removed etc...
...
/// App.vue -- browserTab.vue and uploadTab.vue's parent
<browser-tab @array-updated="handleArrayUpdated"></browser-tab> // Listen to browserTab
...
handleArrayUpdated: function(newArray) {
  this.appArray = newArray;
...
<upload-tab :uploadArray="appArray"></upload-tab> // Passing the array as prop

/// uploadTab.vue -- App.vue's child
props: {
  uploadArray = Array;
}

// Array has been updated

```

That can sum-up the process of passing data from one child to another. Everything has to pass through the parent component (App). 

```
  |----<-----props<------|
  |                      |
CHILD -->emit event-->PARENT-->props-->OTHER CHILD-|
                        ^                          |
                        |                          |
                        |<--emit event<------------|
```

However, it's a bit different for the **history**. The hisory array is not received by props but stocked in localStorage and emiting no event because does not modify anything (except if a *clear history* feature is implemented).

## Server 

The repository provides a very basic server that can simulate file upload but files are lost at the end of the process. The server IP can be changed via filepond proprety. See [filepond server api](https://pqina.nl/filepond/docs/patterns/api/server/) for further informations about filepond server side.

## Distribution mode

To invoke distribution mode, within the repository execute the following command:

`electron-packager .` 

or 

`npm run build`

This will create a distribution repository including the executable. In the file `src/main/index.js`, the entry point can be modify:

```javascript
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html` <-- Path to the distribution mode entry point
```

@author: hugoBuissez




















