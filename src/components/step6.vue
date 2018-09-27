<template>
  <div>
    <img src='~statics/steps-step6.png' alt='Step 6' class='stepper-img' />
    <div class="current-step">
      STEP 6 OF 6
    </div>
    <div class='action-title'>
      Payment
    </div>
    <div class="trunk">
      <div class="row">
        <q-input class="col-sm-12 col-xs-12" v-model="payment.NameOnCard" float-label="Name" @blur='$v.payment.NameOnCard.$touch'
          :error='$v.payment.NameOnCard.$error'></q-input>
        <q-input class="col-sm-12 col-xs-12" v-model="cardNum" float-label="Card Number" :max-length="getCardMaxLength()" @focus="cardInputFocused()" @blur='cardInputBlured()'
          :error='$v.cardNum.$error'></q-input>
        <div class="col-sm-12 col-xs-12 expire-text">Expire</div>
        <q-select class="col-sm-3 col-xs-12" v-model="payment.ExpMonth" :options="monthOptions" type="date" style="margin-right:20px;"
          @blur='$v.payment.ExpMonth.$touch' :error='$v.payment.ExpMonth.$error'></q-select>
        <q-select class="col-sm-3 col-xs-12" v-model="payment.ExpYear" :options="yearOptions" type="date" @blur='$v.payment.ExpYear.$touch'
          :error='$v.payment.ExpYear.$error'></q-select>
        <div class="col"></div>
        <q-input class="col-sm-3 col-xs-12" v-model="payment.CVV" float-label="CVV" max-length="3" @blur='$v.payment.CVV.$touch'
          :error='$v.payment.CVV.$error'></q-input>
      </div>
    </div>

    <div class="footer">
      <q-btn color="grey-5" class="btn-back" @click="$router.push('step5')">Back</q-btn>
      <q-btn color="primary" class='btn-next' @click="next()">Review</q-btn>
    </div>
  </div>
</template>
<script>
  import { required, numeric,minLength, maxLength } from 'vuelidate/lib/validators'
  import VMasker from 'vanilla-masker'
  import { getExpireYearList,getExpireMonthList } from '../utils.js'

  export default {
    name: 'step6',
    data () {
      return {
        yearOptions:[],
        monthOptions:[],
        cardNum:"",
        isFocused:false
      }
    },
    computed: {
      payment: {get () { return this.$store.state.payment }, set (value) { this.$store.state.payment = value }}
    },
    watch: {
      'payment.CardNumber' (newVal, oldVal) {
      },
      'cardNum'() {
        if(this.isFocused) {
          if(this.cardNum[0]=="3") {
            this.cardNum = VMasker.toPattern(this.cardNum, '9999-999999-99999');
          }else {
            this.cardNum = VMasker.toPattern(this.cardNum, '9999-9999-9999-9999');
          }
          this.payment.CardNumber = this.cardNum;
        }
      }
    },
    validations: {
      payment: {
        NameOnCard: {required},
        CVV: {required,numeric,minLength:minLength(3),maxLength:maxLength(3)},
        ExpMonth: {required},
        ExpYear: {required}
      },
      cardNum: {
        required,
        minLength:minLength(17),
        isValidate(value) {
          return this.getCardMaxLength()==value.length;
        }
      }
    },
    mounted() {
      String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
      };
      this.yearOptions = getExpireYearList();
      this.monthOptions = getExpireMonthList();
      this.cardNum = this.generatePassCharacter(this.payment.CardNumber);
      if(this.$store.state.payment.NameOnCard=='') {
        this.$store.commit("initPaymentNameOnCard");
      }
      if(!this.$store.state.payment.ExpMonth) {
        this.$store.state.payment.ExpMonth = new Date().getMonth()+1;
      }
    },
    methods: {
      next () {
        this.$v.payment.$touch()
        this.$v.cardNum.$touch()
        if (this.$v.payment.$error || this.$v.cardNum.$error) {
          this.$toast.create('Please review fields again')
        }
        else {
          this.$router.push('/confirm')
        }
      },
      getCardMaxLength() {
        if(this.payment.CardNumber[0]=="3") {
          return 17;
        }
        return 19;
      },
      cardInputBlured() {
        this.isFocused = false;
        this.cardNum = this.generatePassCharacter(this.payment.CardNumber);
        this.$v.cardNum.$touch()
      },
      cardInputFocused() {
        this.isFocused = true;
        this.cardNum = this.payment.CardNumber;
      },
      generatePassCharacter(text) {
        return text.replaceAll(new RegExp("[0-9]"), "*");
      }
    }
  }
</script>
<style scoped>
  .expire-text {
    margin-bottom: -12px;
    font-size: 12px;
    margin-top: 5px;
    opacity: 0.4;
  }
  
  .card-number-area {
    margin-right: 5px;
  }
</style>