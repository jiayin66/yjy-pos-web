<template>
  <div v-show="UserAlertDisplay" alartWindow>
    <h1>{{userAlertTitle}}</h1>
    <ul>
    <ol class="item">
       <span>姓名</span>
       <input type="text" v-model="UserModel.name">

    </ol>
    <ol class="item">
       <span>描述</span>
       <input type="text" v-model="UserModel.discription">
      <br>
    </ol>
    <ol class="item">
       <span>分组</span>
       <input type="text" v-model="UserModel.remark">
      <br>
    </ol>
    <ol class="item">
       <span>手机号</span>
       <input type="text" v-model="UserModel.phone">

    </ol>
   <!-- <ol class="item">
       <span>机器型号</span>
       <input type="text" v-model="UserModel.machineList">
      <br>
    </ol>-->
    <ol class="item">
       <span>地址</span>
       <input type="text" v-model="UserModel.address">
      <br>
    </ol>
    <ol class="item">
       <span>排序值</span>
       <input type="text" v-model="UserModel.sort">
      <br>
    </ol>
    </ul>
    <button @click="sub(UserModel)">提交</button>
    <button @click="cancel">取消</button>

  </div>
</template>

<script>
export default {
  data () {
    return {
      userAlertTitle: "",
      UserAlertDisplay:false
    }
  },
  methods:{
    cancel(){
      this.$emit('UserAlertNotice', 'cancel');
    },
    sub(e){
      if(e.id){
        console.log("修改",e)
        this.$axios.post(this.baseUrl + "/user/updateUser", e).then(res => {
          console.log('res=>', res);
        this.$emit("UserAlertNotice", 'sub');//关闭清空+重载数据+避免回调慢必须写这里
      })}else{
          console.log("添加",e)
          this.$axios.post(this.baseUrl + "/user/insertUser", e).then(res => {
            console.log('res=>', res);
          this.$emit("UserAlertNotice", 'sub');//关闭清空+重载数据+避免回调慢必须写这里
      })
    }
    }
  },
  watch:{
    UserAlertType(){
      switch (this.UserAlertType) {
        case 0: //没弹窗
          this.UserAlertDisplay = false;

          break;
        case 1 ://有弹窗，是新增
          this.UserAlertDisplay = true;
          this.userAlertTitle = "新增用户";

          break;
        case 2: //有弹窗，是修改
          this.UserAlertDisplay = true;
          this.userAlertTitle = "修改";

          break;
      }
    }
  },
  props:['UserAlertType','UserModel']
  //userAlertTitle配合父组件实现标题传递
  //dp配合实现显示隐藏
  //UserModel父组件传值
}
</script>

<style scoped>

</style>
