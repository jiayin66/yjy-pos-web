<template>
  <div >
      <p>yjy导航</p>
    <ul>

      <li>
        <router-link to="/PosUser" >用户列表</router-link>

      </li>
      <li>
        <router-link to="/PosMachinel/all">机器列表</router-link>


      </li>
      <li>
        <router-link to="/PosBusiness">交易记录</router-link>

      </li>
      <li>
        <router-link to="/CreditCard">信用卡管理</router-link>

      </li>
      <li>
        <router-link to="/Consume">信用卡管理</router-link>

      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return{}
  }
}
</script>

<style scoped>
  div{
    background-color: #D2E0E6;
    position: fixed;
    left:0%;
    top:0%;
    width: 300px;
  }
ul{
  list-style: none;
}
li{
   display: inline;
   float:left ;
  border: solid 1px;
  }

</style>
