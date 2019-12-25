<template>
  <div v-show="editCreditCardDisplay" alartWindow>

    <h1>{{title}}</h1>

    <ul>
      <li>卡号 :<input type="text" v-model="consumeModel.cardNum"></li>
      <li>卡名称 :<input type="text" v-model="consumeModel.cardName"></li>
      <li>可用额度 :<input type="text" v-model="consumeModel.availableCredit"></li>
      <!--【1】套现类型-->
      <div v-if="creditType==1">
        <div shuju>
        <li>套现金额 :<input type="text" v-model="consumeModel.money"></li>
        <li> 手续费 :<input type="text" v-model="consumeModel.cost"><button v-show="consumeModel.cost" @click="MathCount(1)">计算到账</button></li>
        <li> 到账金额 :<input type="text" v-model="consumeModel.realMoney"><button v-show="consumeModel.realMoney" @click="MathCount(2)">计算手续费</button></li>
        <li> 【手续费1】提现费 :<input type="text" v-model="mathcost.addMoney"><button  @click="mathCost">计算费率</button></li>
        <li> 【手续费2】费率 :<input type="text" v-model="mathcost.rateMoney"></li>
        </div>
        <li>是否有积分：
          <select v-model="consumeModel.score">
            <option value="1">有积分</option>
            <option value="0">无积分</option>

          </select>

        <li>消费备注(商户):<input type="text" v-model="consumeModel.remark"></li>
      </div>

      <div v-if="creditType==2">
        <li>还款金额 :<input type="text" v-model="consumeModel.money"></li>
        <li>消费备注 :<input type="text" v-model="consumeModel.remark"></li>
      </div>
      <div v-if="creditType==11">
        <li>信用卡备注 :<input type="text" v-model="consumeModel.remark"></li>
      </div>



    </ul>
    <button @click="sub">提交</button>
    <button @click="cancel">取消</button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      title:"",
      editCreditCardDisplay:false,
      consumeModel:{}, //拷贝父组件传递来的对象
      mathcost:{
        addMoney:3,
        rateMoney:null
      } //计算手续费对象
    }
  },
  methods:{
    cancel(){
      this.$emit('EditAlertNotice',0);
    },
    mathCost(){
      this.$set(this.mathcost,'rateMoney',(this.consumeModel.cost-this.mathcost.addMoney)*100/this.consumeModel.money)
    },
    MathCount(value){
      //console.log(value)
      if(value==1){
        this.$set(this.consumeModel, 'realMoney', this.consumeModel.realMoney-this.consumeModel.cost)
        /*this.consumeModel.realMoney=this.consumeModel.money-this.consumeModel.cost;*/
        console.log(this.consumeModel)
      }else if(value==2){
        this.$set(this.consumeModel, 'cost', this.consumeModel.money-this.consumeModel.realMoney)
      /*  this.consumeModel.cost=this.consumeModel.money-this.consumeModel.realMoney;
        console.log(this.consumeModel)*/
      }else if(value==3){

      }
     // this.$forceUpdate();
    },
    sub(){
      switch (this.creditType){
        case 1:
          var consumeModel=this.consumeModel;
         /* if(consumeModel.score){
            consumeModel.score=1;
          }else {
            consumeModel.score=0;
          }*/

          console.log(consumeModel)

          this.$axios.post(this.baseUrl+'/creditcard/consume',this.consumeModel).then(req=>{
            this.$emit('EditAlertNotice',0);
           })
           break;
        case 11:
          var consumeModel=this.consumeModel;
          consumeModel.money=this.consumeModel.availableCredit
          this.$axios.post(this.baseUrl+'/creditcard/consume',this.consumeModel).then(req=>{
            this.$emit('EditAlertNotice',0);
           })
           break;
        case 2:
          //creditcard/repayment?id=100&money=1000
         var url=this.baseUrl+'/creditcard/repayment?id='+this.creditcardModel.id+'&money='+this.consumeModel.money;
      //console.log(url)
          this.$axios.get(url).then(req=>{
            //  console.log(req)
            this.$emit('EditAlertNotice',0);
          })
            break;


      }
      //提交时候处理数据


    }

  },
  mounted(){
  },
  props: {
    creditType:{
      default:0
    },
    creditcardModel:{}
  }
    ,
  watch:{
    creditType(){
      //把父组件传来的值给子组件
      this.consumeModel={};//第一步清空数据
      this.consumeModel.cardNum=this.creditcardModel.cardId;
      this.consumeModel.type=this.creditcardModel.type;
      this.consumeModel.cardName=this.creditcardModel.cardName;
      this.consumeModel.cardId=this.creditcardModel.id;
      this.consumeModel.availableCredit=this.creditcardModel.creditLimit.availableCredit;

      switch (this.creditType){
        case 0: //隐藏
          this.editCreditCardDisplay=false;
              break;
        case 11: //修改
          //修改时候编辑备注余额，其他的不动
          this.title="修改余额和备注"
          this.editCreditCardDisplay=true;
          this.consumeModel.remark=this.creditcardModel.remark;//信用卡备注，非消费备注
              break;
        case 1: //套现
          this.consumeModel.score=1;
          this.title="套现"
          this.editCreditCardDisplay=true;
              break;
        case 2: //还款
          this.title="还款"
          this.editCreditCardDisplay=true;
              break;
        case 3:  //分期
          this.title="分期"
          this.editCreditCardDisplay=true;
              break;
        case 4:  //消费
          this.title="消费"
          this.editCreditCardDisplay=true;
              break;
      }
    }
  }

}
</script>

<style scoped>
[shuju]{
  border: solid 2px;
}
</style>
