<template>
  <div>
    <img src='~statics/steps-step2.png' alt='Step 2' class='stepper-img'/>
    <div class="current-step">
      STEP 2 OF 6
    </div>
    <div class='action-title'>
      Contact Information
    </div>
    <div class="trunk">
      <div class="row">
          <q-input class="col-sm-6 col-xs-12" v-model="form.FName" float-label="First Name"  @blur='$v.form.FName.$touch' :error='$v.form.FName.$error'></q-input>
          <q-input class="col-sm-6 col-xs-12" v-model="form.LName" float-label="Last Name" @blur='$v.form.LName.$touch' :error='$v.form.LName.$error'></q-input>
          <q-input class="col-sm-7 col-xs-12" v-model="form.Email" float-label="Email" @blur='$v.form.Email.$touch' :error='$v.form.Email.$error'></q-input>
          <q-input class="col-sm-5 col-xs-12" v-model="form.Phone" float-label="Phone" @blur='$v.form.Phone.$touch' :error='$v.form.Phone.$error'></q-input>
          <q-input class="col-sm-12" v-model="form.Street" float-label="Street" @blur='$v.form.Street.$touch' :error='$v.form.Street.$error'></q-input>
          <q-input class="col-sm-5 col-xs-12" v-model="form.City" float-label="City" @blur='$v.form.City.$touch' :error='$v.form.City.$error'></q-input>
          <q-input class="col-sm-3 col-xs-6" v-model="form.State" float-label="State" @blur='$v.form.State.$touch' :error='$v.form.State.$error'></q-input>
          <q-input class="col-sm-4 col-xs-6" v-model="form.Zipcode" float-label="Zip code" @blur='$v.form.Zipcode.$touch' :error='$v.form.Zipcode.$error'></q-input>
      </div>

    </div>

    <div class="footer">
      <q-btn color="grey-5" class="btn-back" @click="$router.push('step1')">Back</q-btn>
      <q-btn color="primary" class='btn-next' @click="next()">Next Step</q-btn>
    </div>
  </div>
</template>
<script>
  import { required, email, numeric } from 'vuelidate/lib/validators'
  import VMasker from 'vanilla-masker'
  import {mapState } from 'vuex'
  import store from '../store'

  export default {
    name: 'step2',
    store,
    computed: {
      ...mapState(['leadId']),
      form: {get () { return this.$store.state.form }, set (value) { this.$store.state.form = value }}
      // FName: {get () { return this.$store.state.form.FName }, set (value) { this.$store.state.form.FName = value }},
      // LName: {get () { return this.$store.state.form.LName }, set (value) { this.$store.state.form.LName = value }}
    },
    validations: {
      form: {
        FName: {required},
        LName: {required},
        Email: {required, email},
        Phone: {required},
        Street: {required},
        City: {required},
        State: {required},
        Zipcode: {required, numeric}
      }
    },
    watch: {
      'form.Phone' (newVal, oldVal) {
        this.form.Phone = VMasker.toPattern(newVal, '(999) 999-9999')
      }
    },
    methods: {
      next () {
        let vm = this
        this.$v.form.$touch()

        if (this.$v.form.$error) {
          this.$toast.create('Please review fields again')
        }
        else {
          if(!this.leadId) {
            var req = {};
            req.FName = this.form.FName;
            req.LName = this.form.LName;
            req.Email = this.form.Email;
            req.Phone = this.form.Phone;
            this.$http.post('leads',req)
            .then((response) => {
              var data = response.data;
              if(data && data.LeadID) {
                vm.$store.commit("setLeadId",data.LeadID);
              }
            })
          }
          this.$router.push('step3')
        }
      }
    }
  }
</script>
