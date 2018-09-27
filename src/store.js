import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    zipcode: '00000',
    leadId:'',
    locations: [],
    locationSelected: null,
    memTypeSelected: null,
    optionalServiceGroup: [],
    includedServices:[],
    optionalServices:[],
    paymentPlan:[],
    memberShipPrice:[],
    form: {
      FName: '',
      LName: '',
      Email: '',
      Phone: '',
      Street: '',
      City: '',
      State: '',
      Zipcode: ''
    },
    memberInfo: {
      FName:'',
      LName:'',
      BirthDate: '',
      Gender:'M',
      Price:'',
      DueNow: 0
    },
    familyInfo: [],
    payment: {
      NameOnCard: '',
      CardNumber: '',
      ExpMonth: '',
      ExpYear:2018,
      CVV: ''
    },
    count: 0
  },
  getters: {

  },
  mutations: {
    initPaymentNameOnCard: (state) => {
      if(state.form.FName || state.form.LName) {
        state.payment.NameOnCard = state.form.FName + " " + state.form.LName;
      }
    },
    setLeadId: (state,params) => {
      state.leadId = params;
    }
  },
  actions: {

  }
})

export default store
