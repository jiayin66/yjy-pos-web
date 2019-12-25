<template>
  <div v-show="UserChoseMachineDisplay">

    <h1>用户ID为【{{singleUser}}】的修改机器界面</h1>
    <button @click="UserMachineChoseSub">保存</button>
    <button @click="UserMachinecancel">取消</button>
    <table>
      <thead>
        <th width="100px" >
            请勾选
        </th>
        <th width="50px">
            序号
        </th>
        <th width="100px">机器类型</th>
        <th width="200px">机器编号</th>
        <th width="200px">用户姓名（空表示库存）</th>
        <th width="200px">激活时间(空未激活)</th>
        <th width="300px">备注</th>
      </thead>
      <tbody>
      <tr v-for="(item,index) of UserMachineList">
        <td >
          <input type="checkbox" v-model="item.UserMachineChose" >
        </td>
        <td>{{index|IndexAddOne}}</td>
        <td>{{item.type|itemTypeToName}}</td>
        <td>{{item.machineId}}</td>
        <td>暂时为空，这个引用用户</td>
        <td>{{item.useTime|DateFilter}}</td>
        <td>{{item.remark}}</td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
export default {
  data(){
    return {
      UserMachineList:[],
      changeTypeDisplay:false,
      UserChoseMachineDisplay:false
    }
  },
  methods:{
    UserMachineListInit(){   //【2】根据传入的用户id，查询没绑定机器加上已绑定的机器并勾上

    },
    UserMachinecancel(){
      this.$emit('ChoiseMachineAlert',null);
    },
    UserMachineChoseSub(){
      console.log(this.UserMachineList)
      var ids=[];
      for(let item of this.UserMachineList){
        if(item.UserMachineChose){
          ids.push(item.id)
        }
      }
      console.log("ids",ids);
      this.$axios.post(this.baseUrl+'/pos/bindingUser?userId='+this.singleUser,ids).then(req=>{
        console.log(req);
        alert("保存成功")
      this.$emit('ChoiseMachineAlert',null)
       })
    }
  },
  mounted(){
   this. UserMachineListInit();

  },
  props: {
    PosModelList:{},//父组件传递过来的已经绑定的集合
    singleUser:{},
    UserMachineChoseType:{
      default:0
    } //用户选择机器弹窗0表示隐藏，1表示显示
   // changeType:0   //0展示 1可以修改
  }
    ,
  watch:{
    UserMachineChoseType(){   //【1】控制显示或者隐藏的类型
      if(this.UserMachineChoseType==0){
        this.UserChoseMachineDisplay=false
      }else if(this.UserMachineChoseType==1){
        this.UserChoseMachineDisplay=true
        //显示的逻辑
        //1、拿到全部的未绑定机器+当前用户绑定的机器
        if(this.singleUser!='all'){
          this.$axios.get(this.baseUrl+'/pos/findByUserIdAndNull?userId='+this.singleUser).then(req=>{
            this.UserMachineList=req.data;
            console.log(req)
            //写加载数据之后的逻辑
            var posId=[];
            if(this.PosModelList!=null && this.PosModelList.length!=0){
              for(var pos of this.PosModelList){
                posId.push(pos.id);
              }
            }
            console.log("posId:",posId)
            for(var item of this.UserMachineList){
              if (posId.indexOf(item.id)>=0){
                item.UserMachineChose=true;
              }
            }
            console.log("this.UserMachineList:",this.UserMachineList)
            })
        }else{
          console.log("因为当前是all，不该出现编辑页面")
        }
      }
    }/*,
    changeType(){
      if(this.changeType==0){  //直接展示不能修改
        this.changeTypeDisplay=false
        ChoiseTitle:"请选择";
      }else if(this.changeType==1){   //可以修改状态说
        this.changeTypeDisplay=true;
        ChoiseTitle:"提交选择";
      }
    }*/
  }

}
</script>

<style scoped>

</style>
