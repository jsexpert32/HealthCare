<template>
<div class="init-wrapper">

  <h1>LET'S GET STARTED!</h1>
  <h2>MEMBERSHIPS FROM $25.99</h2>
  <h5>
    Join now to enjoy your Onelife Fitness Membership benefits:
  </h5>
  <div class="row features ">
    <div class="col-sm-6 col-xs-12">
      <h5>Smart Start</h5>
        One-hour personalized workout with a certified trainer
    </div>
    <div class="col-sm-6 col-xs-12">
      <h5>Unlimited Group Fitness Classes</h5>
      Get motivated with classes like BodyPump, Cycling, etc.
    </div>

    <div class="col-sm-6 col-xs-12">
      <h5>Two Complimentary 3-Day Membership Cards</h5>
      Invite your friends to try the club with you
    </div>

    <div class="col-sm-6 col-xs-12">
      <h5>Free Trial of Zone4 Training</h5>
      Zone4 is higly succesfull small group training program
    </div>


    <div class="col-sm-6 col-xs-12">
      <h5>Unlimited Online Nutrition & Meal Planning</h5>
      One of kind meal planning program is available for all new members`
    </div>
    <div class="col-sm-6 col-xs-12">
      <h5>IHRSA Travel Benefits</h5>
      Guest privileges to over 1,700 IHRSA Passport Clubs with 50% off the guest fee
    </div>
  </div>

  <div class="div_start">
    <q-btn color="primary" @click="$router.push('steps/step1')">Start your Membership Now</q-btn>
  </div>

</div>
</template>

<script>
  export default {
    name: 'init'
  }
</script>
<style lang="stylus" scoped>
.features {
    margin: 45px 0 30px;
}

.init-wrapper > h5 {
  letter-spacing: -1px;
}

.features > div {
  padding: 0 40px 0 50px;
  background-image: url('~statics/icon_check.png');
  background-repeat: no-repeat;
  background-size: auto 36px;
  background-position: left top;
  min-height: 100px;
  font-size: 14px;
  color: #000;
}
.features > div > h5 {
  margin: 0 0 5px;
  padding: 0;
  color: #075798;
  font-size: 18px;
  font-family: "Oswald";

}
  .init-wrapper {
      padding:20px;
  }

  h1, h2 {
      font-family: "Oswald";
      color: #075798;
    	font-size: 52px;
      line-height: 57px;
      letter-spacing: 0px;
      margin: 5px 0;
  }
  h2 {
    	font-size: 42px;
      line-height: 42px;
      margin-bottom: 20px;
  }
  .div_start {
    text-align: center;
  }
</style>
