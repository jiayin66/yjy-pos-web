<template>
  <div v-show="userMachineVisible">
    <Index></Index>
    <h1>{{machineTitle}}</h1>
    <button @click="add">新增</button>
    <button @click="ChoiseMachine">修改机器</button>
    <AddMachine :PosModel="PosModel" :MachineAlertType="MachineAlertType"  @MachineAlertNotice="MachineAlertNotice" ></AddMachine>
    <table>
      <thead>
        <th width="50px">序号</th>
        <th width="150px">机器类型</th>
        <th width="200px">机器编号</th>
        <th width="200px">用户姓名（空表示库存）</th>
        <th width="200px">激活时间(空未激活)</th>
        <th width="300px">备注</th>
        <th width="120px">操作</th>
      </thead>
      <tbody>
      <tr v-for="(item,index) of PosModelList">
        <td>{{index|IndexAddOne}}</td>
        <td>{{item.type|itemTypeToName}}</td>
        <td>{{item.machineId}}</td>
        <td>{{item.userEntityList|ObjectToName}}</td>
        <td>{{item.useTime|DateFilter}}</td>
        <td>{{item.remark}}</td>
        <td>
          <button @click="update(item)">修改</button>
          <button>删除</button>
        </td>
      </tr>
      </tbody>
    </table>
    <UserMachine :UserMachineChoseType="UserMachineChoseType" :singleUser="singleUser" :PosModelList="PosModelList" @ChoiseMachineAlert="ChoiseMachineAlert"></UserMachine>

  </div>
</template>

<script>
  import AddMachine from '@/components/pos/AddMachine';
  import UserMachine from '@/components/pos/UserMachine';
  import Index from '@/components/pos/Index';
  import axios from 'axios'
export default {
  data () {
    return {
      machineTitle:"机器管理",
        PosModelList:[], //从服务器获取的数据
        PosModel:{}, //添加修改的临时数据
        MachineAlertType:"0", //弹窗类型： 0：表示隐藏框框  1：表示新增  2：表示修改
       UserMachineChoseType:"0" // 用户选择机器弹窗0表示隐藏，1表示显示
  }
  },
  props:{
    userMachineVisible:{
      default:true  //默认自己用，传参时用来配合用户中展示机器列表
    },
    singleUser:{
      default:0
    }
  },

  methods:{
    posListInit(){   //通用的初始化方法
      this.$axios.get(this.baseUrl+'/pos/findByUserIdHasUser?userId='+this.singleUser).then(req=>{
      this.PosModelList=req.data;
    })},
    ChoiseMachineAlert(){
      this.UserMachineChoseType=0;
      this.posListInit();//因为机器改动，所以需要初始化
    },
    ChoiseMachine(){
      if(this.singleUser=='all'){
        alert('当选择具体用户下面的机器才能执行修改用户机器操作');
      }else{
        this.UserMachineChoseType=1;
      }

    },
    MachineAlertNotice(e){
      console.log("收到子组件传递过来的事件",e)
      this.PosModel={};//清空数据,包括取消和新增保存或者修改
      if(e=='alter'){    //保存的时候刷新数据（分新增保存和修改保存）
        this.posListInit();
      }
      this.MachineAlertType=0;
    },
    add(){
      this.MachineAlertType=1;
    },
    update(e){
      this.MachineAlertType=2;
      //对象复制，避免影响原来对象
      this.PosModel.id=e.id
      this.PosModel.type=e.type
      this.PosModel.machineId=e.machineId
      this.PosModel.userId=e.userId
      this.PosModel.useTime=e.useTime
      this.PosModel.remark=e.remark
    },
    cancel(){
      this.MachineAlertType=0;
    }
  },
  components:{AddMachine,Index,UserMachine},
  filters:{
    ObjectToName(value){
      if(value==null){
        return '空';
      }
      return value.name
    }
  },
  mounted(){
    console.log(this.singleUser);
    console.log(this.machineTitle);
    this.machineTitle=this.singleUser+this.machineTitle
      this.posListInit();
  }

}
</script>

<style scoped>
  table{
    border: solid 2px;
    border-collapse:collapse;
    margin: auto;
  }
  td{
    border: solid 2px;
  }
  th{
    border: solid 2px;
  }

</style>
