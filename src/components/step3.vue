<template>
  <div>
    <img src='~statics/steps-step3.png' alt='Step 3' class='stepper-img'/>
    <div class="current-step">
      STEP 3 OF 6
    </div>
    <div class='action-title'>
      Select Your Plan
    </div>
    <div class="trunk">
      {{this.memTypes.length}} simple payment options - it's your choice!
      <div class="row"  style="margin:30px 0 0 -10px">
        <div class="col-sm-6 col-xs-12" v-for="(m,ix) in memTypes" :key="m.ID">
          <div :class="{'x-mem-type': true, 'shadow-5': memID === m.ID}" @click="$store.state.memTypeSelected = m">
            <h6>
              {{m.Name}}
            </h6>
            <h2>
                ${{(m.DuesInfo.PromoPrice ? m.DuesInfo.PromoPrice : m.DuesInfo.ListPrice).toFixed(2)}} /month
            </h2>
              with a one-time fee of
              <div>
                <span class="list-price">${{m.FeeInfo.ListPrice}}</span>
                <span class="promo-price">${{m.FeeInfo.PromoPrice}}</span>
              </div>
              <div class="lmtd">
              Limited time offer!
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <q-btn color="grey-5" class="btn-back" @click="$router.push('step2')">Back</q-btn>
      <q-btn color="primary" class='btn-next' @click="next()" :disabled="!$store.state.memTypeSelected">Next Step</q-btn>
    </div>
  </div>
</template>
<script>
  import store from '../store'
  export default {
    name: 'step3',
    store,
    data () {
      return {
        // location: this.$store.state.locationSelected,
        memTypes: []
      }
    },
    computed: {
      memID () {
        if (this.$store.state.memTypeSelected) {
          return this.$store.state.memTypeSelected.ID
        }
      },
      location () {
        return this.$store.state.locationSelected
      }
    },
    beforeMount () {
      let vm = this

      if (DEV) {
        this.$store.state.locationSelected = {
          'ID': 242,
          'LocationName': 'Lakeforest Sport & Health',
          'Street': '700 Russell Avenue',
          'City': 'Gaithersburg',
          'State': 'MD',
          'Zip': '20877',
          'Website': 'www.usfitnessgroup.com',
          'Phone': '(301) 258-0661'
        }
      }
      vm.$http.get('locations/' + vm.location.ID)
        .then((response) => {
          vm.memTypes = response.data.MembershipTypes
        })
    },
    methods: {
      next () {
        this.$router.push('step4')
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .x-mem-type {
    margin: 10px;
    padding: 10px;
    font-size: 14px;
    border: 2px solid #EEEEEE;
    border-radius: 2px;
    background-color: #FAFAFC;
    text-align: center;
    color: #ACB0B1;
    min-height: 270px;
    cursor: pointer
  }
  .x-mem-type.shadow-5 {
    background-color: #d9eafc;
  }
  .x-mem-type h6 {
    color: #3A4042;
    font-size: 14px;
    font-weight: bold;
    padding: 20px 50px;
    text-transform: uppercase;
  }
  .x-mem-type h2 {
    color: #FF931A;
    font-size: 28px;
    font-weight: bold;
    line-height: 37px;
    margin: 0 0 20px;
    padding:0;
  }
  .x-mem-type .list-price {
    font-size: 17px;
    text-decoration:line-through;
    font-weight: bold;
  }
  .x-mem-type .promo-price {
    font-size: 17px;
    margin-left: 7px;
    color: #075798;
    font-weight: bold;
  }
  .x-mem-type .lmtd {
    margin-top: 25px;
  }
</style>
