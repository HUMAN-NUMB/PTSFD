<template>
  <div>111</div>
</template>

<script>
export default {
  name: 'my-exit',
  created () {
    // 退出按钮点击

    // 添加确认
    this.$confirm('是否退出登录？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        // 清空token
        this.$store.commit('updataToken', '')
        // 清空用户信息
        this.$store.commit('updateUserInfo', {})
        // 跳转回登录页面
        this.$router.push('/login')
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
        this.$router.push('/')
      })
  }
}
</script>

<style lang="less" scoped>

</style>
