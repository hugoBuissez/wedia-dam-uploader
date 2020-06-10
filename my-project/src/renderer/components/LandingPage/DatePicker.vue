/* eslint-disable */

<template>
  <div>
    <label for="example-datepicker">Choose a date</label>
    <b-form-datepicker id="example-datepicker" v-model="value" class="mb-2"></b-form-datepicker>
    <p>Date choosen: {{ value }}</p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        value: ''
      }
    }
  }
</script>