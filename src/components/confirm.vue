<template>
  <div class="confirm-wrapper">
    <div class="thanks-title">THANK YOU FOR BEING WITH US</div>
    <div class="current-step">
      MEMBERSHIP DETAILS
    </div>
    <div class="step-div">
      <div class="row">
        <div class="column col-md-1 col-xs-2">
          <div class="bg-grey-1 text-grey-5 step-circle">
            1
          </div>
          <div class="bg-grey-1 col step-line"></div>
        </div>
        <div class="col"></div>
        <div class="column col-md-4 col-xs-9 step-title">
          Club
        </div>
        <div class="col"></div>
        <div class="column col-md-6 col-xs-9 detail-info">
          <div v-if="locationSelected">{{locationSelected.City}}</div>
          <div v-if="locationSelected">{{locationSelected.Street}}</div>
          <div v-if="locationSelected">{{locationSelected.LocationName}}</div>
          <div v-if="locationSelected">{{locationSelected.Phone}}</div>
        </div>
      </div>
    </div>

    <div class="step-div">
      <div class="row">
        <div class="column col-md-1 col-xs-2">
          <div class="bg-grey-1 text-grey-5 step-circle">
            2
          </div>
          <div class="bg-grey-2 col step-line"></div>
        </div>
        <div class="col"></div>
        <div class="column col-md-4 col-xs-9 step-title ">
          Contact Information
        </div>
        <div class="col"></div>
        <div class="column col-md-6 col-xs-9 detail-info">
          <div v-if="form">{{form.FName}} {{form.LName}}</div>
          <div v-if="form">{{form.Email}}</div>
          <div v-if="form">{{form.Phone}}</div>
          <div v-if="form.State">{{form.Street}} {{form.City}},{{form.State}} {{form.Zipcode}}</div>
        </div>
      </div>
    </div>

    <div class="step-div">
      <div class="row">
        <div class="column col-md-1 col-xs-2">
          <div class="bg-grey-1 text-grey-5 step-circle">
            3
          </div>
          <div class="bg-grey-2 col step-line"></div>
        </div>
        <div class="col"></div>
        <div class="column col-md-4 col-xs-9 step-title">
          Plan
        </div>
        <div class="col"></div>
        <div class="column col-md-6 col-xs-9 plan-text ">{{getPlan()}}</div>
      </div>
    </div>

    <div class="step-div">
      <div class="row">
        <div class="column col-md-1 col-xs-2">
          <div class="bg-grey-1 text-grey-5 step-circle">
            4
          </div>
          <div class="bg-grey-2 col step-line"></div>
        </div>
        <div class="col"></div>
        <div class="column col-md-4 col-xs-9 step-title">
          Services
        </div>
        <div class="col"></div>
        <div class="column col-md-6 col-xs-9 detail-info">
          <div v-for="freeServiceId in includedServices">{{freeServiceId.Name}}</div>
          <div v-for="optionalServiceId in optionalServiceGroup">{{getOptionServiceText(optionalServiceId)}}</div>
        </div>
      </div>
    </div>

    <div class="step-div">
      <div class="row">
        <div class="column col-md-1 col-xs-2">
          <div class="bg-grey-1 text-grey-5 step-circle">
            5
          </div>
          <div class="bg-grey-2 col step-line"></div>
        </div>
        <div class="col"></div>
        <div class="column col-md-4 col-xs-9 step-title">
          Member Information
        </div>
        <div class="col"></div>
        <div class="column col-md-6 col-xs-9 detail-info">
          <div>{{memberInfo.FName}} {{memberInfo.LName}}</div>
          <div>
            <span v-if="memberInfo.Gender=='M'">Male</span><span v-else>Female</span> born {{memberInfo.BirthDate}}
          </div>
          <div v-for="family in familyInfo" style="margin-top:8px;">
            <div>{{family.FName}} {{family.LName}}</div>
            <div>
              <span v-if="family.Gender=='M'">Male</span><span v-else>Female</span> born {{family.BirthDate}}
            </div>
            <div>{{family.Relation}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="step-div">
      <div class="row">
        <div class="column col-md-1 col-xs-2">
          <div class="bg-grey-1 text-grey-5 step-circle">
            6
          </div>
        </div>
        <div class="col"></div>
        <div class="column col-md-4 col-xs-9 step-title">
          Payment
        </div>
        <div class="col"></div>
        <div class="column col-md-6 col-xs-9 detail-info">
          <div>{{payment.NameOnCard}}</div>
          <div class="row">
            <input class="col hidden-number" v-for="(ct,$index) in getCardContext()" :type="getCardInputType($index)" :readonly="true" :value="ct"></input>
          </div>
          <div>{{getExpireDateString()}}</div>
        </div>
      </div>
    </div>

    <div class="step-div">
      <div class="row">
        <div class="column col-md-1 col-xs-2">
        </div>
        <div class="col"></div>
        <div class="column col-md-7 col-xs-9 due-info">
          <div class="due-title">Your Monthly Dues</div>
          <div class="due-content">{{memberInfo.FName}} {{memberInfo.LName}}</div>
          <div class="due-content" v-for="family in familyInfo">Membership Dues({{family.FName}} {{family.LName}})</div>
          <div class="due-title" >Due Now:</div>
          <div class="due-content">Dues for {{getCurrentMonthName()}} ({{memberInfo.FName}} {{memberInfo.LName}})</div>
          <div class="due-content" v-for="family in familyInfo">Dues for {{getCurrentMonthName()}} ({{family.FName}} {{family.LName}})</div>
          <div class="due-content" v-for="oneTimeFee in paymentPlan.OnetimeFees">{{oneTimeFee.Name}}</div>
          <div class="due-content" v-for="freeServiceId in includedServices">{{freeServiceId.Name}}</div>
          <div class="due-content" v-for="optionalServiceId in optionalServiceGroup">{{getOptionServiceText(optionalServiceId)}}</div>
        </div>
        <div class="col"></div>
        <div class="column col-md-3 col-xs-9">
          <div class="due-title">${{getSumofPrice()}}</div>
          <div class="due-content">${{memberInfo.Price}}</div>
          <div class="due-content" v-for="family in familyInfo"> ${{family.Price}}</div>
          <div class="due-title">${{getSumofDueNow()}}</div>
          <div class="due-content">${{memberInfo.DueNow}}</div>
          <div class="due-content" v-for="family in familyInfo">${{family.DueNow}}</div>
          <div class="due-content" v-for="oneTimeFee in paymentPlan.OnetimeFees">${{oneTimeFee.DueNow}}</div>
          <div class="due-content" v-for="freeServiceId in includedServices">$0</div>
          <div class="due-content" v-for="optionalServiceId in optionalServiceGroup">${{getOptionServiceDue(optionalServiceId)}}</div>
        </div>
      </div>
    </div>

    <div class="row terms-div" v-if="ConfirmationNo==-1">
      <div class="col"></div>
      <q-checkbox class="terms" v-model="terms1" />
      <div class="col-sm-10">{{termsLabel1}}</div>
    </div>
    <div class="row terms-div" v-if="ConfirmationNo==-1">
      <div class="col"></div>
      <q-checkbox class="terms" v-model="terms2" />
      <div class="col-sm-10">{{termsLabel2}} <span class="text-grey-6">Onelife Fitness Terms and Conditions.</span></div>
    </div>
    <div class="row" style="margin-top:30px;" v-if="ConfirmationNo==-1">
      <div class="column col-md-1"></div>
      <div class="col"></div>
      <div class="column col-md-4">
        <q-btn color="grey-5" class="btn-back" @click="$router.push('/steps/step6')">Back</q-btn>
      </div>
      <div class="column col-md-6">
        <q-btn class="btn-next btn-confirm" @click="submit()" :disable="confirmState">Submit</q-btn>
      </div>
      <div class="col"></div>
    </div>
    <div class="row print-area" style="margin-top:30px;"  v-if="ConfirmationNo!=-1">
      <div class="column col-md-1"></div>
      <div class="col"></div>
      <div class="column col-md-4">
        Confirmation No: {{this.ConfirmationNo}}
      </div>
      <div class="col"></div>
      <div class="column col-md-6">
        <q-btn color="primary" class="btn-print">Print</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState } from 'vuex'
export default {
  data () {
    return {
      ConfirmationNo:-1,
      terms1: false,
      terms2: false,
      termsLabel1:"I agree that my monthly dues will be automatically payable though Electronic Funds Transfer from the credit card or bank savings or checking account I designated. There will be a one-time annual club enhancement fee in the amount of $XX during the calendar year. This fee will go towards new equipment, new programs , new services and other facility improvements only.",
      termsLabel2:"I agree to the "
    }
  },
  mounted() {

    
  },
  methods: {
    getSumofPrice() {
      var sum = this.memberInfo.Price;
      for(var i=0;i<this.familyInfo.length;i++) {
        sum = sum + this.familyInfo[i].Price;
      }
      if(!sum) {
        return 0;
      }
      return sum.toFixed(2);
    },
    getSumofDueNow() {
      var sum = this.memberInfo.DueNow;
      var fees = this.paymentPlan.OnetimeFees;
      for(var i=0;i<this.familyInfo.length;i++) {
        sum = sum + this.familyInfo[i].DueNow;
      }
      for(var j=0;j<fees.length;j++) {
        sum = sum + fees[j].DueNow;
      }
      for(var k=0;k<this.optionalServiceGroup.length;k++) {
        sum = sum +  this.getOptionServiceDue(this.optionalServiceGroup[k]);
      }
      return sum.toFixed(2);
    },
    getCardInputType(index) {
      var c = this.getCardContext();
      if(index==c.length-1) {
        return "text";
      }else {
        return "password";
      }
    },
    getCardContext() {
      return this.payment.CardNumber.split("-");
    },
    getCurrentMonthName() {
      var n = new Date().getMonth();
      var months = ["January","Feburary","March","April", "May", "June","July","August","September","October","November", "December"];
      return months[n];
    },
    getOptionServiceText(id) {
      var service = this.getOptionService(id);
      if(service) {
        return service.Name;
      }
      return "";
    },
    getOptionServiceDue(id) {
      var service = this.getOptionService(id);
      if(service) {
        return  service.DueNow;
      }
      return 0; 
    },
    getOptionService(id) {
      for(var i=0;i<this.optionalServices.length;i++) {
        var s = this.optionalServices[i];
        if(s["ID"] == id) {
          return s;
        }
      }
      return null;
    },
    getExpireDateString() {
      return this.payment.ExpMonth + "/" + this.payment.ExpYear;
    },
    getPlan() {
      if(this.memTypeSelected) {
        var plan = "";
        if(this.memTypeSelected.DuesInfo.PromoPrice) {
          plan = this.memTypeSelected.DuesInfo.PromoPrice;
        }else {
          plan = this.memTypeSelected.DuesInfo.ListPrice.toFixed(2);
        }
        return "$" + plan + "/month";
      }
      return ""; 
    },
    submit() {
      var me = this;
      var json = {};
      var FormName = 'New Join';
      var FormData = Object.assign({}, this.form);
      FormData["LocationID"] = this.locationSelected.ID;
      FormData["Location"] = {};
      FormData["Location"]["ID"] = this.locationSelected.ID;
      FormData["Location"]["Name"] = this.locationSelected.LocationName;
      FormData["Location"]["City"] = this.locationSelected.City;
      FormData["Location"]["Street"] = this.locationSelected.Street;
      FormData["Location"]["Phone"] = this.locationSelected.Phone;
      FormData["MemType"] = {};
      FormData["MemType"]["ID"] = this.memTypeSelected.ID;
      FormData["MemType"]["Name"] = this.memTypeSelected.Name;
      FormData["Plan"] = this.getPlan();
      FormData["BirthDate"] = this.memberInfo.BirthDate;
      FormData["Gender"] = this.memberInfo.Gender;
      FormData["FamilyMembers"] = [];
      for(var i=0;i<this.familyInfo.length;i++) {
        var fItem = {};
        fItem["FName"] = this.familyInfo[i].FName;
        fItem["LName"] = this.familyInfo[i].LName;
        fItem["DOB"] = this.familyInfo[i].BirthDate;
        fItem["Relationship"] = this.familyInfo[i].Relation;
        fItem["Price"] = this.familyInfo[i].Price;
        FormData["FamilyMembers"].push(fItem);
      }
      FormData["IncludedServices"] = this.$store.state.includedServices;
      FormData["OptionsSelected"] = [];
      for(var j=0;j<this.optionalServiceGroup.length;j++) {
        var oData = this.getOptionService(this.optionalServiceGroup[j]);
        var oItem = {};
        oItem["ItemID"] = oData.ItemID;
        oItem["Name"] = oData.Name;
        oItem["Price"] = oData.ListPrice;
        FormData["OptionsSelected"].push(oItem);
      }
      FormData["Payment"] = {};
      FormData["Payment"]["NameOnCard"] = this.payment["NameOnCard"];
      FormData["Payment"]["CardNumber"] = this.payment["CardNumber"];
      FormData["Payment"]["CVV"] = this.payment["CVV"];
      FormData["Payment"]["Exp"] = this.getExpireDateString();
      FormData["MonthlyDues"] = {};
      FormData["MonthlyDues"]["Sum"] = this.getSumofPrice();
      FormData["MonthlyDues"]["MainMemberPrice"] = this.memberInfo.Price;
      FormData["MonthlyDues"]["FamilyMemberPrice"] = [];
      for(var k=0;k<this.familyInfo.length;k++) {
        var kItem = {};
        kItem["Name"] = this.familyInfo[k].FName + " " + this.familyInfo[k].LName;
        kItem["Price"] = this.familyInfo[k].Price;
        FormData["MonthlyDues"]["FamilyMemberPrice"].push(kItem);
      }
      FormData["DueNow"] = {};
      FormData["DueNow"]["Sum"] = this.getSumofDueNow();
      FormData["DueNow"]["List"] = [];

      var mIP = {};
      mIP.Name = "Dues for " + this.getCurrentMonthName() + " (" + this.memberInfo.FName + " " + this.memberInfo.LName;
      mIP.Price = "$" + this.memberInfo.DueNow;
      FormData["DueNow"]["List"].push(mIP);

      this.familyInfo.forEach(function(e) {
        var item = {};
        item["Name"] = "Dues for " + me.getCurrentMonthName() + " (" + e.FName + " " + e.LName;
        item["Price"] = "$" + e.DueNow;
        FormData["DueNow"]["List"].push(item);
      });

      this.paymentPlan.OnetimeFees.forEach(function(e) {
        var item = {};
        item["Name"] = e.Name;
        item["Price"] = "$" + e.DueNow;
        FormData["DueNow"]["List"].push(item);
      });

      this.includedServices.forEach(function(e) {
        var item = {};
        item["Name"] = e.Name;
        item["Price"] = "$0";
        FormData["DueNow"]["List"].push(item);
      }); 

      this.optionalServiceGroup.forEach(function(id) {
        var item = {};
        item["Name"] = me.getOptionServiceText(id);
        item["Price"] = "$" + me.getOptionServiceDue(id);
        FormData["DueNow"]["List"].push(item);
      });

      json["FormName"] = FormName;
      json["FormData"] = JSON.stringify(FormData);
      
      var url = 'leads/' + this.leadId + "/forms"; 
      this.$http.post(url,json)
      .then((response) => {
        var data = response.data;
        if(data) {
          me.ConfirmationNo = data.ConfirmationNo;
        }
      })
    }
  },
  computed: {
      ...mapState(['form','familyInfo','payment','memberInfo','optionalServiceGroup','optionalServices','includedServices','memTypeSelected','locationSelected','leadId',"paymentPlan"]),
      confirmState() {
        if(this.terms1 && this.terms2) {
          return false;
        }
        return true;
      }
  }
}
</script>

<style scoped>
  .confirm-wrapper {
    min-height: 665px;
    padding: 50px 20px 30px 50px;
    margin: 0;
    height: auto;
    position: relative;
  }
  
  .thanks-title {
    font-family: "Oswald";
    color: #ff931a;
    font-weight: 500;
    font-size: 34px;
  }
  
  .step-title {
    color: #075798 !important;
    font-weight: 500;
    font-size: 16px;
  }
  
  .plan-text {
    color: #ff931a;
    font-size: 16px;
    font-weight: 500;
  }
  
  .hidden-number {
    outline: 0;
    border-style: none;
    max-width: 50px;
    font-size: 15px;
  }
  
  .btn-confirm {
    background-color: #ff931a;
    color: white;
    margin-left: 80px;
  }
  
  .detail-info>div {
    margin-bottom: 5px;
  }
  
  .step-circle {
    width: 30px!important;
    height: 30px!important;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    margin-top: -5px;
    margin-bottom: 5px;
  }
  
  .step-line {
    width: 2px;
    margin-left: 13px;
    margin-top: 3px;
  }
  
  .step-div {
    margin-top: 15px;
  }
  
  .step-div>div {
    min-height: 50px;
  }
  
  .terms {
    width: 22px;
    height: 22px;
    margin-right: 20px;
  }
  
  .terms-div {
    margin-top: 15px;
    margin-left: 10px;
    font-size: 14px!important;
  }
  .print-area {
    font-size:18px;
    font-weight:500;
    line-height:40px;
  }
  .due-title {
    margin-bottom:7px;
    margin-top:2px;
    min-height:25px;
    font-weight:bold;
    font-size:16px;
    color:#075798 !important;
  }
  .due-content {
    margin-bottom:5px;
    font-weight:400;
    min-height:20px;
  }
  .due-info>div.due-content {
    padding-left:10px;
  }
</style>