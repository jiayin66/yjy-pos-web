<template>
  <div >
    <Index></Index>
    <h1>信用卡可用额度展示</h1>
    <EditCreditCard :creditType="creditType" :creditcardModel="creditcardModel" @EditAlertNotice="EditAlertNotice"></EditCreditCard>
    <table>
      <thead>
      <th width="100px">卡名称</th>
        <th width="50px"> 天数</th>
        <th width="70px">可用额度</th>
        <th width="120px">周期结束日</th>
        <th width="100px">最后还款日</th>
        <th width="70px">免息期</th>
        <th width="200px">备注</th>
        <th width="70px">固定额度</th>
        <th width="70px">临时额度</th>

        <th width="300px">【修改/套现/还款/分期/消费】</th>
      </thead>
      <tbody>
        <tr v-for="item of creditcardList" v-if="item.creditLimit">
          <td>{{item.cardName}}</td>
          <td>{{item.countDownCount}}</td>
          <td>{{item.creditLimit.availableCredit}}</td>
          <td>{{item.billDateString}}</td>
          <td>{{item.lastDate}}</td>
          <td>{{item.spaceDate}}</td>
          <td>{{item.remark}}</td>
          <td>{{item.creditLimit.limitCredit}}</td>
          <td>{{item.creditLimit.temporaryCredit}}</td>

          <td>
            <button @click="alter(item)">修改</button>&nbsp;
            <button @click="consumeForCash(item)">套现</button>&nbsp;
            <button @click="repayment(item)">还款</button>
            <button>分期</button>&nbsp;
            <button>消费</button>&nbsp;
          </td>
        </tr>
      </tbody>
    </table>
    <p>总可用:{{footModel.allAvailable}}/总额度:{{footModel.allLimit}}</p>
    <p>总使用:{{footModel.alluseLimit}}/比率:{{footModel.alluseLimit/footModel.allLimit}}</p>

  </div>
</template>

<script>
  import Index from '@/components/pos/Index';
  import EditCreditCard from '@/components/creditCard/EditCreditCard';
export default {
  data(){
    return {
      creditcardList:[],creditcardModel:{},creditType:0,footModel:{allLimit:0,allAvailable:0,alluseLimit:0}
    }
  },

  methods:{
    initCredit(){
      this.$axios.get(this.baseUrl+'/creditcard/find').then(req=>{
        this.creditcardList=req.data;
      //console.log(this.creditcardList)
      this.mathFoot();
    })},
    mathFoot(){
      let listDate=[];
      let listId=[];
      for(let item of this.creditcardList){
        if(listId.indexOf(item.creditLimitId)>-1){

        }else{
          listId.push(item.creditLimitId)
          listDate.push(item);
        }
      }
     // console.log(listDate)

      let allLimit=0;
      let allAvailable=0;
      for(let item of listDate){
       // console.log(item)
        allLimit+=item.creditLimit.limitCredit;
        allLimit+=item.creditLimit.temporaryCredit;
        allAvailable+=item.creditLimit.availableCredit;
      }
      this.footModel.allLimit=allLimit;
      this.footModel.allAvailable=allAvailable;
      this.footModel.alluseLimit=allLimit-allAvailable;
    },
    alter(item){
      this.creditType=11;//传递给子组件的指令类型
      item.type=11;//消费类型：套现
      this.creditcardModel=item;

    },
    consumeForCash(item){
      this.creditType=1;//让子组件显示，为套现
      item.type=1;//消费类型：套现
      this.creditcardModel=item;

    },
    repayment(item){
      this.creditType=2;//让子组件显示，为还款
      this.creditcardModel={};
      item.type=2;//套现
      this.creditcardModel=item;

    },
    EditAlertNotice(item){
      this.creditType=item;
      this.initCredit();

    }

  },
  mounted(){
    this.initCredit();
  },
  props: {
  }
    ,
  components:{Index,EditCreditCard},
  watch:{
  }

}
</script>

<style scoped>

</style>
