<template>
  <div>
    <img src='~statics/steps-step4.png' alt='Step 4' class='stepper-img' />
    <div class="current-step">
      STEP 4 OF 6
    </div>
    <div class='action-title'>
      Additional Services
    </div>
    <div class="trunk">
      <div class="service-group">
        <h6>Included in your membership:</h6>
        <div v-for="iservice in includedServices" class="col-sm-12 col-xs-12 text-light-blue-9">
          <div class="bg-light-blue-1 include-icon column inline vertical-middle">
            <q-icon name="done" color="light-blue-9" class="vertical-middle absolute-center"></q-icon>
          </div>
          {{iservice.Name}}
        </div>
      </div>
      <div class="service-group">
        <h6>Additional services:</h6>
        <div class="col-sm-12 col-xs-12">
          <q-option-group  ref="optionalGroup" class="optional-group" color="light-blue-9" type="checkbox" v-model="group" :options="optionalServices" />
        </div>
        
      </div>
    </div>

    <div class="footer">
      <q-btn color="grey-5" class="btn-back" @click="$router.push('step3')">Back</q-btn>
      <q-btn color="primary" class='btn-next' @click="next()">Next Step</q-btn>
    </div>
  </div>
</template>
<script>
  import {mapState } from 'vuex'
  export default {
    name: 'step4',
    computed: {
      ...mapState(['memTypeSelected', 'optionalServiceGroup','includedServices'])
    },
    data () {
      return {
        optionalServices:[],
        group:[]
      }
    },
    created() {    
    },
    beforeMount(){
      var vm = this;
      if(this.memTypeSelected && this.memTypeSelected.ID) {
        this.$http.get('memtypes/' + this.memTypeSelected.ID)
        .then((response) => {
          var res = response.data;
          if(res) {
            vm.$store.state.includedServices = res.IncludedServices;
            vm.$store.state.optionalServices = res.OptionalServices;
            vm.$store.state.paymentPlan = res;
            vm.optionalServices = vm.getIncludeOptions(res.OptionalServices);
            if(vm.optionalServices.length>0) {
              
              vm.$nextTick(function(){
                var childs = vm.$refs.optionalGroup.$el.childNodes;
                for(var i=0;i<childs.length;i++) {
                  var optDiv = childs[i].lastChild;
                  var lpDiv = document.createElement("span");
                  lpDiv.className = "l-price";
                  var ppDiv = document.createElement("span");
                  ppDiv.className = "p-price";
                  var promoPrice = res.OptionalServices[i].PromoPrice;
                  if(promoPrice) {
                    lpDiv.textContent = "$" + res.OptionalServices[i].ListPrice;
                    ppDiv.textContent = "$" + promoPrice;
                    optDiv.appendChild(lpDiv);
                    optDiv.appendChild(ppDiv);
                  }else {
                    ppDiv.textContent = "$" + res.OptionalServices[i].PriceEffective;
                    optDiv.appendChild(ppDiv);
                  }
                }
              });
            }
          }
        })
      }
    },
    mounted() {
      this.group = this.optionalServiceGroup;
    },
    watch: {
      "group": function() {
        this.$store.optionalServiceGroup = this.group;
      }
    },
    methods: {
      next () {
        this.$router.push('step5')
      },
      getIncludeOptions(services) {
        var objs =[];
        for(var i=0;i<services.length;i++) {
          var obj = {};
          obj.value = services[i].ID;
          obj.label = services[i].Name;
          objs.push(obj);
        }
        return objs;
      }
    }
  }
</script>
<style >
  .service-group {
    margin-top: 28px;
  }
  
  .service-group>div {
    margin-top: 10px;
    font-size: 15px;
    font-weight: 400;
  }
  
  .include-icon {
    position: relative;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .optional-group {
    font-size:15px!important;
    font-weight:400;
  }
  .l-price {
    margin-left:8px;
    text-decoration:line-through;
    font-weight: bold;
    color:grey;
  }
  .p-price {
    margin-left:6px;
    font-weight: bold;
    color:#ff931a;
  }
</style>