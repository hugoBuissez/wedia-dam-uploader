/* eslint-disable */

<template>
  <div>
      <b-icon v-b-toggle.sidebar-1 icon="justify" class="smIcon"></b-icon>
      <b-sidebar id="sidebar-1" title="Menu" class="p-3" right text-variant="dark" shadow>
      <div class="px-3 py-2">
        <ul class="listMenu">
          <li><a href="#">Help</a></li>
          <li><a href="#">Feedback</a></li>
          <li><a href="#">F.A.Q</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: "side-menu",
  data() {
    return {
      type: Object
    };
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    }
  }
};
</script>

<style scoped>

  .listMenu {
    width: 100%;
    padding: 0 15px;
    font-weight: bolder;
    font-size: 1.2rem;
  }

  .listMenu li {
    margin-bottom: 20px;
  }

  .listMenu li a:hover {
    text-decoration: none;
  }

  .listMenu li a {
    color: #50454a;
  }

  .smIcon {
      height: 30px;
      width: 30px;
  }
</style>
