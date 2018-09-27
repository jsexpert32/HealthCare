<template>
  <div class="steps-wrapper">

    <div class="main-title">
      JOIN IN A FEW EASY STEPS!
    </div>

      <router-view />

    </div>
  </div>
</template>
<script>
  export default {
    name: 'steps',
    data () {
      return {
        image: '~statics/steps-step1.png'
      }
    }
  }
</script>

<style lang="stylus">
  .steps-wrapper {
    min-height: 665px;
    padding: 50px 20px 0 90px;
    margin: 0;
    height: auto;
    position: relative;
  }
  .stepper-img {
    position: absolute;
    left: 0;
    top: 0;
    width: 49px;
  }
  .main-title {
    font-family: "Oswald";
    color: #3A4042;
    font-weight: 500;
    font-size: 34px;
  }
  .current-step {
    font-family: "Oswald";
    margin-top: 70px;
    font-size: 18px;
    opacity: 0.4;
  }
  .action-title {
    margin: 0;
    padding: 20px 0 0 0;
    font-size:28px;
    line-height: 40px;
    opacity: 0.8;
  }
  .trunk {
    min-height: 270px;
    position: relative;
    margin: 0px 35px 35px 0;
  }
  .steps-wrapper .btn-next {
    padding: 8px 65px !important;
  }
  .steps-wrapper .btn-back {
    padding: 8px 35px !important;
    margin-right: 5px;
  }
  .footer {
    padding-bottom: 30px;
  }
</style>
