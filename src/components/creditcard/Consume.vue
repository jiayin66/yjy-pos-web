<template>
  <div >

    <Index></Index>
    <h1>费用列表</h1>
    <p >
      开始时间:<input type="date" v-model="consumeReq.startTime">
      结束时间:<input type="date" v-model="consumeReq.endTime">
      信用卡：
      <select v-model="consumeReq.cardId">
        <option>招商</option>
        <option>浦发</option>
      </select>
     是否有积分:
      <select v-model="consumeReq.score">
        <option value="1">有积分</option>
        <option value="0">无积分</option>
      </select>
     类型:
      <select v-model="consumeReq.type">
        <option value="1">套现</option>
        <option value="2">消费</option>
        <option value="3">分期</option>
      </select>
      <button @click="clearParam">清空 </button>
      <button @click="findByParam">查询 </button>


    </p>
    <table>
      <thead>
      <tr>
        <th width="200px">日期(天)</th>
        <th width="150px">信用卡名称</th>
        <th width="100px">类型</th>
        <th width="100px">是否有积分</th>
        <th width="100px">金额</th>
        <th width="100px">手续费</th>
        <th width="200px">备注</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="intem of consumeList">
        <td>{{intem.createTime|DateFilter}}</td>
        <td>{{intem.creditcard.cardName}}</td>
        <td v-if="intem.type==1">套现</td>
        <td v-if="intem.type==2">消费</td>
        <td v-if="intem.score==1">有积分</td>
        <td v-if="intem.score==0">无积分</td>
        <td>{{intem.money}}</td>
        <td>{{intem.cost}}</td>
        <td>{{intem.remark}}</td>

      </tr>

      </tbody>
    </table>

  </div>
</template>

<script>
  import Index from '@/components/pos/Index';
export default {
  data(){
    return {
      consumeList:[],consumeReq:{}
    }
  },
  methods:{
    findByParam(){
      this.dataInit();
    },
    clearParam(){
      this.consumeReq={};
    },
    dataInit(){
      console.log(this.consumeReq)
      this.$axios.post(this.baseUrl+'/creditcard/consumefind',this.consumeReq).then(req=>{
        this.consumeList=req.data;
      //console.log(this.creditcardList)

    })}
  },
  mounted(){
    this.dataInit();
  },
  props: {
  }
    ,
  watch:{
  },
  components:{Index}

}
</script>

<style scoped>

</style>
