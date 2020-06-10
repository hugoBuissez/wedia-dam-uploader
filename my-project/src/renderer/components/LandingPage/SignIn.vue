<template>
  <body>
      <div class="cont">
        <div class="left">
            <div class="leftCont">
                <img src="../../../../static/logo-light.svg" alt="">
                <div class="captionDiv">
                    <span>Bienvenue</span> <br> sur le médiacenter <br> de Club Wed !
                </div>

                 <b-form>
                        <b-form-group
                        id="input-group-1"
                        >

                        <b-form-input
                        id="input-1"
                        type="email"
                        required
                        placeholder="votre email"
                        class="inputForm"
                        >
                        </b-form-input>

                        <b-form-input
                        id="input-1"
                        type="email"
                        required
                        placeholder="votre mot de passe"
                        class="inputForm"
                        >
                        
                        </b-form-input>

                        <a class="oublie-mdp" href="#">
                            Mot de passe oubié ?
                        </a>
                        <b-form-checkbox
                            id="checkbox-1"
                            name="checkbox-1"
                            class="remember">
                            
                            Se souvenir de moi
                        </b-form-checkbox>
                        <button class="btnSub">Je me connecte</button>
                    </b-form-group>
                 </b-form>

                 
            </div>
        </div>
        <div class="right">
        </div>
      </div>
      
  </body>
</template>

<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>

<style>
    
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600&display=swap');

    a, a:hover {
        text-decoration: none;
    }

    body, #app {
        height: 880px;
        margin: 0;
        padding: 0;
    }

    .inputForm {
        width: 300px;
        height: 40px;
        margin: 0px 82px 5px 110px; 
        color: #454545;
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        font-weight: 200;
        letter-spacing: 0;
        line-height: 18px;
    }
    
    .oublie-mdp {
        height: 15px;
        width: 240px;
        color: #393939;
        font-family: 'Montserrat', sans-serif;
        font-size: 12px;
        font-weight: 200;
        letter-spacing: 0;
        line-height: 15px;
        margin-left: 111px;
    }

    .remember {
        height: 21px;
        width: 146px;
        color: #444444;
        font-family: 'Montserrat', sans-serif;
        font-size: 12px;
        font-weight: 200;
        letter-spacing: 0.5px;
        line-height: 21px;
        margin-left: 111px;
        margin-bottom: 7px;
    }

    .btnSub {
        height: 50px;
        width: 200px;
        border-radius: 4px;
        background-color: #FDD900;
        border: none;
        color: #3C3C3B;
        font-family: Montserrat;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0;
        line-height: 18px;
        text-align: center;
        margin-left: 111px;
        margin-top: 10px;
    }

    
    .cont {
        display: flex;
        height: 100%;
    }

    .left {
        width: 34.38%;
        height: 100%;
    }

    .left img {
        margin: 0 174px 0 112px;
        width: 209px;
        height: 78px;
    }

    .captionDiv {
        font-family: 'Montserrat', sans-serif;
        font-weight: 300;
        width: 301px;
        height: 90px;
        font-size: 20px;
        line-height: 26px;
        margin: 60px 82px 22px 112px;
    }

    .captionDiv span {
        font-weight: 600;
    }

    .leftCont {
        margin-top: 55px;
    }

    .right {
        height: 100%;
        width: 65.62%;
        background-image: url("https://club-wed.wedia-group.com:443/api/wedia/dam/variation?object=vueapphomevisual&id=6&variation=original");
        background-position: center;
    }

</style>