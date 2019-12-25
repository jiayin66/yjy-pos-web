<template>
  <div >
    <Index></Index>
    <h1 >用户管理</h1>

    <button @click="addUser" >新增用户</button>
    <AddUser :UserAlertType="UserAlertType" :UserModel="UserModel" @UserAlertNotice="UserAlertNotice"></AddUser>

    <table >
      <thead>
        <th width="50px">序号</th>
        <th width="80px">姓名</th>
        <th width="100px">描述</th>
        <th width="200px">机器型号</th>
        <th width="150px">手机号</th>
        <th width="250px">地址</th>
        <th width="100px">分组</th>
        <th width="100px">添加时间</th>
        <th width="50px">排序值</th>
        <th width="100px">操作</th>
      </thead>
      <tbody>
        <tr v-for="(item,index) of UserModelList">
          <td>{{index|IndexAddOne}}</td>
          <td>{{item.name}}</td>
          <td>{{item.discription}}</td>
          <td >
            <!--<router-link :to="'/PosMachinel/'+item.id"> 1{{item.machineList}}</router-link>-->
            <router-link :to="'/PosMachinel/'+item.id">{{item.machineList|ListToMachineName}}</router-link>
          </td>
          <td>{{item.phone}}</td>
          <td>{{item.address}}</td>
          <td>{{item.remark}}</td>
          <td>{{item.addTime|DateFilter}}</td>
          <td>{{item.sort}}</td>
          <td>
            <button @click=updateUser(item)>修改</button>
            <button @click=del(item)>删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import AddUser from '@/components/pos/AddUser';
  import Index from '@/components/pos/Index';
  import PosMachinel from '@/components/pos/PosMachinel';
  export default {
  data () {
    return {
      UserModelList:[],
      UserModel:{},
      UserAlertType:0//0隐藏 1新增 2修改
    }
  },
  methods:{
    UserInit(){
      this.$axios.get(this.baseUrl+'/user/findUser').then(req=>{
      //  console.log("req",req);
      this.UserModelList=req.data;
    })},
     addUser(){
        this.UserModel={};
        this.UserAlertType=1;
    },
      updateUser(e){
        this.UserModel={};
        this.UserAlertType=2;
        this.UserModel.id=e.id;
        this.UserModel.name=e.name;
        this.UserModel.remark=e.remark;
        this.UserModel.discription=e.discription
        this.UserModel.machineList=e.machineList;
        this.UserModel.phone=e.phone;
        this.UserModel.address=e.address;
        this.UserModel.sort=e.sort;
    },
    UserAlertNotice(e){
      console.log("收到子组件通知",e)
      this.UserAlertType=0 //复原
      if(e=='sub'){
        this. UserInit();  //对列表有影响就刷新页面
      }
    },
    del(e){
      this.UserModel=e;
      console.log(this.UserModel);
      confirm("确定删除吗？")
    }

  },
  mounted(){
    this.UserInit();
   },
    filters:{
      ListToMachineName(value){
      //  console.log("机器型号过滤器：",value)
      //  console.log("value.length：",value.length)

        if(value.length<1){
          return '空';
        }
        var str='';
        for(var item of value){
          switch (item.type){
            case 1:
              str+=' 银钱包 '
                  break;
            case 2:
              str+=' 新中付 '
                  break;
            case 3:
              str+=' 瑞通宝 '
                  break;
            default:
              str+=' 未知 '
                  break;
          }
        }

        return str;
      }
    },
  components:{AddUser,Index}


}
</script>

<style scoped>
#userMachine{
  border: solid 1px;
}

</style>
