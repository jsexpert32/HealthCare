<template>
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
    :left-class="{'bg-grey-2': true}"
  >
    <q-toolbar slot="header" inverted>

      <!-- <q-btn
        flat
        @click="$refs.layout.toggleLeft()"
      >
        <q-icon name="menu" />
      </q-btn> -->
      <q-toolbar-title>
<img src="~statics/OL_Logo.jpg" height="60" />
</q-toolbar-title>
      <!-- <q-toolbar-title>

        Onelife Fitness
        <div slot="subtitle">Join Online Now!</div>
      </q-toolbar-title> -->
      <q-btn flat class="gt-md">I NEED ASSISTANCE</q-btn>
      <q-btn flat class="gt-md">CLUB LOCATIONS</q-btn>
      <q-btn flat class="gt-md">ONELIFEFITNESS.COM</q-btn>
      <q-btn flat icon="menu" class="lt-lg"></q-btn>
    </q-toolbar>

    <!-- Navigation -->
    <!-- <q-tabs slot="navigation">

      <q-route-tab slot="title" icon="view_quilt" to="/test-layout/about" replace hide="icon" label="About" />
      <q-route-tab slot="title" icon="view_day" to="/test-layout/toolbar" replace hide="icon" label="Toolbar" />
      <q-route-tab slot="title" icon="view_day" to="/test-layout/tabs" replace label="Tabs" />
      <q-route-tab slot="title" icon="input" to="/test-layout/drawer" replace label="Drawer" />
    </q-tabs> -->


    <div class="  row justify-center">
      <div class="x-container row">
        <div class="col x-content">
            <router-view />
        </div>
        <div class="col div-img gt-md">

        </div>
      </div>
    </div>
  </q-layout>
</template>

<script>
import {
  QLayout,
  QToolbar,
  QToolbarTitle
} from 'quasar'

export default {
  name: 'index',
  mounted () {
    if (DEV) {
      this.$router.push('/steps/step3')
    }
    else {
      this.$router.push('/init')
    }
  },
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle
  }
}
</script>

<style lang="stylus" >
  .layout-header {
    border-bottom: 1px solid gainsboro;
    box-shadow: none;
    background-color: #fff;
  }
  header {
  	-webkit-box-pack: center;
  	-ms-flex-pack: center;
  	justify-content: center;
  }
  header .q-toolbar, .x-container {
    width: 100%;
    max-width: 1100px;
    margin: auto;
  }

  header .q-btn {
    color:grey;
    margin:0 40px !important
  }

  .div-img {
    background-image: url('~statics/bg_1.jpg');
   background-repeat: no-repeat;
   background-attachment: relative;
   background-position: left 0px top 0px;
   min-height: 500px;
   height: 91vh;
   background-size: auto 100%;
   max-width: 350px !important;
  }
</style>
