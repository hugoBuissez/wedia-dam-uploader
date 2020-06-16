<template>
     
       <vue-circle
        ref="circle_bar"
        :size="180"
        :reverse="false"
        line-cap="round"
        :fill="fill"
        empty-fill="rgba(0, 0, 0, .1)"
        :animation-start-value="0.0"
        :start-angle="0"
        insert-mode="append"
        :thickness="5"
        :show-percent="true">
      </vue-circle>


    <!--
    <we-cursor-provider path="dam/asset" $status="loaded">
      <template #default="cursor">
        <div>
          <dam-list :cursor="cursor"/>
        </div>
      </template>
    </we-cursor-provider> 
    -->

</template>

<script>

import VueCircle from 'vue2-circle-progress'

export default {
  name: "account-tab",
  components: { VueCircle },
  data(){
      return{
        fill : { color: "#007F9A" },
      }
    },
   methods:{
      progress(event,progress,stepValue){
        //console.log(stepValue);
      },
      progress_end(event){
        //console.log("Circle progress end");
      },
      
    }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600&display=swap");
  

    .cont {
      width: 100%;
      height: 100%;
      margin-top: 30px;
      padding: 30px;
      
    }

   

  
</style>
