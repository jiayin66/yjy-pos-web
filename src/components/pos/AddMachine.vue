<template  >
  <div v-show="MachineAlertDisplay" alartWindow>
    <h1>{{MachineAlertTitle}}</h1>
    <ul>
    <ol class="item">
       <span>类型</span>
       <input type="text" v-model="PosModel.type">

    </ol>
    <ol class="item">
       <span>机器编号</span>
       <input type="text" v-model="PosModel.machineId">
      <br>
    </ol>
    <ol class="item">
       <span>用户id</span>
       <input type="text" v-model="PosModel.userId">

    </ol>
    <ol class="item">
       <span>激活时间</span>
       <input type="text" v-model="PosModel.useTime">
      <br>
    </ol>
    <ol class="item">
       <span>备注</span>
       <input type="text" v-model="PosModel.remark">
      <br>
    </ol>
    </ul>
    <button @click="add(PosModel)">提交</button>
    <button @click="cancel">取消</button>

  </div>
</template>

<script>
export default {
  data () {
    return {
      MachineAlertTitle:"",
      MachineAlertDisplay:false
    }
  },
  props:['PosModel','MachineAlertType'],
  watch:{
    MachineAlertType(){
      switch (this.MachineAlertType) {
        case 0: //没弹窗
          this.MachineAlertDisplay = false;

          break;
        case 1 ://有弹窗，是新增
          this.MachineAlertDisplay = true;
          this.MachineAlertTitle = "新增机器";

          break;
        case 2: //有弹窗，是修改
          this.MachineAlertDisplay = true;
          this.MachineAlertTitle = "修改";

          break;
      }
    }
  },
  methods: {
    cancel(){
      this.$emit("MachineAlertNotice", 'cancel');//自动清空、隐藏
    },
    add(e){
      console.log('传参的',e)
      if (e.id) {
        console.log("修改")
        this.$axios.post(this.baseUrl + "/pos/updatePos", e).then(res => {
          console.log('res=>', res);
        this.$emit("MachineAlertNotice", 'alter');//关闭清空+重载数据+避免回调慢必须写这里
      })
      }else {
        console.log("添加")
        this.$axios.post(this.baseUrl + "/pos/insertPos", e).then(res => {
          console.log('res=>', res);
          this.$emit("MachineAlertNotice", 'alter');//关闭清空+重载数据+避免回调慢必须写这里
      })
      }

    }

  }}
</script>

<style scoped>

</style>
