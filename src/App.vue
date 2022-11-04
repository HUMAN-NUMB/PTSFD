<template>
<!-- 一级路由规则对象组件的挂载点 -->
  <div class="base"><router-view></router-view></div>
</template>
<script>

export default {
  async created () {

  }
}
</script>
<style lang="less" scoped>
.base{
  //找父级
  //   background: url("./assets/images/背景板.jpg") center;
  // background-size: cover;
    height: 100%;

}
</style>
