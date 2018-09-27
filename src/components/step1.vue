<template>
  <div>
    <img src='~statics/steps-step1.png' alt='Step 1' class='stepper-img'/>
    <div class="current-step">
      STEP 1 OF 6
    </div>
    <div class='action-title'>
      Enter your ZIP code to find<br />
      a club near you
    </div>
    <div class="trunk">

      <div class="x-zip-input">
        <q-input v-model="zipcode" float-label="Your ZIP code"/>
      </div>

      <div class="row" style="margin:30px 0 0 -5px">

        <div v-show="showMore===true || ix<6 || l===locationSelected" class=" col-sm-6 col-xs-12" :key="l.location.LocationID" v-for="(l,ix) in locations">

          <div class="x-club" @click="locationSelected = l.location" :class="{'x-club': true, 'shadow-5': locationSelected===l.location}">
            <h6>{{l.location.LocationName}}</h6>
            <div class='x-ph'>
              {{l.distance.text}}les away
            </div>
            {{l.location.Street}}<br />
            {{l.location.City}}, {{l.location.State}} {{l.location.Zip}}
            <div class='x-ph'>
              {{l.location.Phone}}
            </div>
          </div>

        </div>

      </div>
      <div class="text-center" style="margin:5px 0 30px" v-if="locations.length>0">
        <q-btn flat color="blue" v-if="!showMore" @click="showMore=!showMore">Show more</q-btn>
        <q-btn flat color="blue" v-else @click="showMore=!showMore">show less</q-btn>
      </div>
    </div>

    <div class="footer">
      <q-btn color="grey-5" class="btn-back" @click="$router.push('/init')">Back</q-btn>
      <q-btn color="primary" class='btn-next' :disabled="!locationSelected" @click="next()">Next Step</q-btn>
    </div>
  </div>
</template>
<script>
  import store from '../store'

  export default {
    name: 'step1',
    store,
    data () {
      return {
        showMore: false,
        zipcode: this.$store.state.zipcode,
        locationSelected: this.$store.state.locationSelected,
        locations: this.$store.state.locations
      }
    },
    watch: {
      zipcode (_new, _old) {
        this.showMore = false
        this.locationSelected = null
        this.$store.state.zipcode = _new

        if (_new.length === 5) {
          this.loadClubList()
        }
        else {
          this.locations = []
        }
      }
    },
    mounted () {
      if (this.zipcode === '00000') {
        this.getMyZip()
      }
    },
    methods: {
      getMyZip () {
        let vm = this
        vm.$http.get('mylocation')
          .then((response) => {
            let myGeo = response.data
            vm.zipcode = myGeo.zip_code
            vm.$store.state.form.State = myGeo.region_code // (State 2 digit)
            vm.$store.state.form.City = myGeo.city
            vm.$store.state.form.Zipcode = vm.zipcode
            vm.loadClubList()
          })
      },
      loadClubList () {
        let vm = this
        vm.$http.get('locations/?FromZipCode=' + vm.zipcode)
          .then((response) => {
            vm.locations = response.data
            this.$store.state.locations = response.data
          })
      },
      next () {
        this.$store.state.locationSelected = this.locationSelected
        this.$router.push('step2')
      }
    }
  }
</script>
<style lang='stylus' scoped>
  .x-zip-input {
    max-width: 140px;

  }
  .x-zip-input input {
    font-size: 20px !important;
    background-color: yellow;
  }
  .x-club {
    border: 2px solid #EEEEEE;
    margin: 5px;
    padding: 10px;
    font-size: 14px;
    /* font-family: "Helvetica Neue"; */
    color: #3A4042;
    background-color: #FAFAFC;
    cursor: pointer
  }
  .x-club.shadow-5 {
    background-color: #d9eafc;
  }
  .x-club h6 {
    margin: 0 0 7px;;
    padding:0
    color: #075798;
    font-weight: 500;
  }
  .x-club .x-ph {
    opacity: 0.8;
    margin: 2px 0;
  }
</style>
