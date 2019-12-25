<template>
  <div>
    <Index></Index>
    <h1>交易记录</h1>

    <table>
      <thead>
        <th width="50px">序号</th>
        <th width="100px">用户名</th>
        <th width="200px">机器编号</th>
        <th width="200px">交易金额</th>
        <th width="200px">收入金额</th>
        <th width="200px">交易时间</th>
        <th width="200px">操作</th>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>马俊</td>
          <td>123456789</td>
          <td>10000</td>
          <td>1</td>
          <td>2019</td>
          <td>
            <button >修改</button>
            <button>删除</button>
          </td>

        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
  import Index from '@/components/pos/Index';
export default {
  components:{Index}
}
</script>

<style scoped>


</style>
