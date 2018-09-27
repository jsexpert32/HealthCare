<template>
  <div>
    <img src='~statics/steps-step5.png' alt='Step 5' class='stepper-img' />
    <div class="current-step">
      STEP 5 OF 6
    </div>
    <div class='action-title' style="margin-left:8px">
      Member Information
    </div>
    <div class="trunk">
      <q-card class="info-card card-margin">
        <h6>Main Member <span class="member-price-text pull-right">{{showMonthlyText(memberInfo.Price)}}</span></h6>
        <div class="row">
          <q-input class="col-sm-6 col-xs-12" v-model="memberInfo.FName" float-label="First Name" @blur='$v.memberInfo.FName.$touch'
            :error='$v.memberInfo.FName.$error'></q-input>
          <div class="col"></div>
          <q-input class="col-sm-5 col-xs-12" v-model="memberInfo.LName" float-label="Last Name" @blur='$v.memberInfo.LName.$touch'
            :error='$v.memberInfo.LName.$error'></q-input>
          <q-input class="col-sm-6 col-xs-12" v-model="memberInfo.BirthDate" placeholder="mm/dd/yyyy" maxLength="10" @keyup="memberInfo.BirthDate = fixDatePattern(memberInfo.BirthDate)"
            float-label="Birth Date" @blur='$v.memberInfo.BirthDate.$touch' :error='$v.memberInfo.BirthDate.$error'></q-input>
          <div class="col-sm-1 col-xs-12"></div>
          <q-select class="col-sm-3 col-xs-12" v-model="memberInfo.Gender" float-label="Gender" :options="genderOptions" @blur='$v.memberInfo.Gender.$touch'
            :error='$v.memberInfo.Gender.$error' />
        </div>
      </q-card>
      <q-card class="info-card card-margin" v-for="(family,$index) in familyInfoData">
        <div class="row" style="position:relative;">
          <h6 class="vertical-middle">{{getFamilyInfoText($index)}}</h6>
          <q-icon @click="deleteFamily($index)" name="delete" color="primary" class="vertical-middle delete-btn"
            flat small>
          </q-icon>
          <span class="member-price-text absolute-right">{{showMonthlyText(family.Price)}}</span>          
        </div>
        <div class="row">
          <q-input class="col-sm-5 col-xs-12" v-model="family.FName" float-label="First Name" @blur='$v.familyInfoData.$each[$index].FName.$touch'
            :error='$v.familyInfoData.$each[$index].FName.$error'></q-input>
          <div class="col"></div>
          <q-input class="col-sm-5 col-xs-12" v-model="family.LName" float-label="Last Name" @blur='$v.familyInfoData.$each[$index].LName.$touch'
            :error='$v.familyInfoData.$each[$index].LName.$error'></q-input>
          <q-select class="col-sm-3 col-xs-12" v-model="family.Relation" float-label="Relation" :options="familyRelations" @blur='$v.familyInfoData.$each[$index].Relation.$touch'
            :error='$v.familyInfoData.$each[$index].Relation.$error' />
          <div class="col"></div>
          <q-input class="col-sm-3 col-xs-12" v-model="family.BirthDate" placeholder="mm/dd/yyyy" maxLength="10" float-label="Birth Date"
            @keyup="familyBirthDateChanged($index+2,family)"></q-input>
          <div class="col"></div>
          <q-select class="col-sm-3 col-xs-12" v-model="family.Gender" float-label="Gender" :options="genderOptions" @blur='$v.familyInfoData.$each[$index].Gender.$touch'
            :error='$v.familyInfoData.$each[$index].Gender.$error' />
        </div>
      </q-card>
      <q-btn v-if="familyInfoData.length<maxSubs-1" color="primary" class="add-family-btn" icon="add" @click="addFamilyInfo()" outline>{{getAddButtonText()}}</q-btn>
    </div>

    <div class="footer" style="margin-left:8px">
      <q-btn color="grey-5" class="btn-back" @click="$router.push('step4')">Back</q-btn>
      <q-btn color="primary" class='btn-next' @click="next()">Next Step</q-btn>
    </div>
  </div>
</template>
<script>
  import {mapState } from 'vuex'
  import { required } from 'vuelidate/lib/validators'
  import VMasker from 'vanilla-masker'

  export default {
    name: 'step5',
    data () {
      return {
        genderOptions:[{label:'Male',value:'M'},{label:'Female',value:'F'}],
        familyRelations:[{label:'Spouse',value:'Spouse'},{label:'Children',value:'Children'}],
        familyInfoData:[],
        fIndexArray:["First","Second","Third"],
        maxSubs:1,
        hoverIndex:-1
      }
    },
    computed: {
      ...mapState(['form','familyInfo','paymentPlan']),
      memberInfo: {get () { return this.$store.state.memberInfo }, set (value) { this.$store.state.memberInfo = value }}
    },
    validations: {
      memberInfo: {
        FName: {required},
        LName: {required},
        BirthDate: {required},
        Gender: {required}
      },
      familyInfoData: {
        $each: {
          FName: {required},
          LName: {required},
          Relation: {required},
          BirthDate: {required},
          Gender: {required}
        }
      }
    },
    watch: {
      "memberInfo.BirthDate": function() {
        if(this.memberInfo.BirthDate.length==10) {
          var array = this.memberInfo.BirthDate.split("/");
          var year = parseInt(array[2]);
          var mData = this.getMemberPriceData(1,year);
          if(mData) {
            this.memberInfo.Price = mData.price;
            this.memberInfo.DueNow = mData.dueNow;
          }     
        }else {
          this.memberInfo.Price = "";
        }
      }
    },
    mounted() {
      this.maxSubs = this.paymentPlan.MaxSubs;
      this.familyInfoData = this.familyInfo;
      if(this.$store.state.memberInfo.FName=="") {
        this.$store.state.memberInfo.FName = this.form.FName;
      }
      if(this.$store.state.memberInfo.LName=="") {
        this.$store.state.memberInfo.LName = this.form.LName;
      }
    },
    methods: {
      next () {
        this.$v.memberInfo.$touch()
        this.$v.familyInfoData.$touch()
        if (this.$v.memberInfo.$error || this.$v.familyInfoData.$error) {
          this.$toast.create('Please review fields again')
        }else {
          this.$router.push('step6')
        }
      },
      showMonthlyText(price) {
        if(price) {
          return "$" + price + "/Month";
        }
        return "";
      },
      addFamilyInfo() {
        if(this.familyInfoData.length>=this.maxSubs-1) {
          return;
        }
        var family = {};
        family.Relation = "";
        family.FName = "";
        family.LName = "";
        family.BirthDate = "";
        family.Gender = "M";
        family.Price = "";
        family.DueNow = 0;
        this.familyInfoData.push(family);
      },
      deleteFamily(index) {
        this.familyInfoData.splice(index,1);
      },
      getFamilyInfoText(index) {
        if(index<=this.maxSubs-2) {
          return this.fIndexArray[index] + " Family Member";
        }
        return "";
      },
      getAddButtonText() {
        if(this.familyInfoData.length<this.maxSubs-1) {
          var pMonth = ""; 
          var pData = this.getPriceEffective(this.familyInfoData.length+2);
          if(pData.price) {
            pMonth = " - From $" + pData.price + "/m";
          }
          return "Add " + this.fIndexArray[this.familyInfoData.length] + " Family Member" + pMonth;
        }
        return "";
      },
      getMemberPriceData(index,year) {
        var curYear = new Date().getFullYear();
        var age = curYear - year;
        if(age<0) {
          return "";
        }
        return this.getPriceEffective(index,age);
      },
      getPriceEffective(index,age) {
        if(this.paymentPlan.hasOwnProperty("Dues")) {
          var dues = this.paymentPlan["Dues"];
          var cArray = [];
          for(var i=0;i<dues.length;i++) {
            var due = dues[i];
            if(due.Sequence==index) {
              if(!age) {
                cArray.push(due);
              }else {
                if((due.AgeFrom<=age) && (due.AgeTo>=age)) {
                   cArray.push(due);
                }
              }
              
            }
          }
          if(cArray.length>0) {
            var lData = this.getLowestPriceEffective(cArray);
            return lData;
          }
        }
        return "";
      },
      getLowestPriceEffective(array) {
        var result = {};
        var price = array[0].Item.PriceEffective;
        var dueNow = array[0].Item.DueNow;
        for(var i=0;i<array.length;i++) {
          var item = array[i].Item.PriceEffective;
          if(price>item) {
            price=item;
            dueNow = array[i].Item.DueNow;
          }
        }
        result.price = price;
        result.dueNow = dueNow;
        return result;
      },
      isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      },
      familyBirthDateChanged(index,family) {
        family.BirthDate = this.fixDatePattern(family.BirthDate);
        if(family.BirthDate.length==10) {
          var array = family.BirthDate.split("/");
          var year = parseInt(array[2]);
          var fData = this.getMemberPriceData(index,year);
          if(fData) {
            family.Price =  fData.price;
            family.DueNow = fData.dueNow;
          }     
        }else {
          family.Price = "";
        }
      },
      fixDatePattern(currDate) {
        var currentDate = currDate;
        var currentLength = currentDate.length;
        if (currentLength == 1 && currentDate[0] > 1) {
          currentDate = "0" + currentDate + "/";
          return currentDate;
        } else if (currentLength == 4 && currentDate[3] > 3) {
          currentDate = currentDate.substring(0, 3) + "0" + currentDate[3] + "/";
          return currentDate;
        }
        currentDate = VMasker.toPattern(currentDate, '99/99/9999')
        return currentDate;
      }
    }
  }
</script>
<style scoped>
  .add-family-btn {
    margin-left: 8px;
    margin-top: 20px;
    font-size: 13px;
  }
  
  .delete-btn {
    margin-left: 20px;
    cursor: pointer;
  }
  
  .info-card {
    padding: 12px;
    border: 1px solid #EEEEEE;
    background-color: #FAFAFC;
    color: #ACB0B1;
    cursor: pointer
  }
  
  .card-margin {
    margin-top: 20px!important;
  }
  .member-price-text {
    color: #ff931a;
  }
</style>