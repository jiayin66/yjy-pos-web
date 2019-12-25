<template>
  <div>
    <h1>饭卡管理系统</h1>
    用户列表：<input type="file" @change="uploadUser" >
  <!--  聊天记录：<input type="file" @change="uploadRecord" >-->
    <button >提交</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user:"",
      data:""
    }
  },
  methods:{
    getInitVal(){
    console.log(1);
      var objFile=document.getElementsByTagName('input')[0];
      var WshShell=new ActiveXObject("WScript.Shell");
      objFile.focus();
      WshShell.SendKeys("D:/java/workspace/web12/yjy1/index.html");
    },
    uploadUser(e){
      var that = this;
      console.log( e.target);
     this.user= e.target.files[0];
      console.log(this.user);
    }
  /*  ,uploadRecord(){
      var that = this;
      var inputDOM = that.$refs.inputer;
      var file = inputDOM.files;
      this.data=file[0];
      console.log(data);
    }*/
  }

}
</script>

<style scoped>
</style>
