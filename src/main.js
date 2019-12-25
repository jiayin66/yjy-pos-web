import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  created(){
    Vue.prototype.$axios= axios;
    Vue.prototype.baseUrl='http://localhost:8081';
    Vue.filter("IndexAddOne", function(value){
      //value会接住要处理的原始值
      return parseInt(value)+1;
    });
    Vue.filter("DateFilter", function(date){
     //console.log(date);
      date=date+"";
      date = date.replace(/T/g,' ');
      date = date.substring(0,19);

      return date;
    });
    Vue.filter("itemTypeToName", function(value){
        //  console.log("类型过滤器",value)
        switch (value){
          case 1:
            return '银钱包';
          case 2:
            return '新中付';
          case 3:
            return '瑞通宝';
          default:
            return '类型错误请添加';
        }
      })

  }
})

