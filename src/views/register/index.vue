<template>
  <!-- 注册页面的整体盒子 -->
  <div class="reg-container">
    <!-- 注册的盒子 -->
    <div class="reg-box">
      <!-- 标题的盒子 -->
      <div class="title-box"><img src="../../assets/images/标题logo(半留白).png" alt=""></div>
      <div class="left_right-box">
          <div class="left-logo"><img src="../../assets/images/左插图.png" alt=""></div>
          <div class="right-form">
              <span>账号注册</span>
              <el-form status-icon  :model="form" :rules="rulesObj" ref = "form">
                <el-form-item  prop="username">
                  <div class="input_box"><el-input type="text" class="two-box" autocomplete="off" placeholder="请输入用户名" v-model="form.username"></el-input></div>
                </el-form-item>
                <el-form-item  prop="password">
                  <div class="input_box"><el-input type="password"  class="two-box" autocomplete="off" placeholder="请输入密码" v-model="form.password"> </el-input></div>
                </el-form-item>
                <el-form-item  prop="repassword">
                  <div class="input_box"><el-input placeholder="请再次确认密码" class="two-box" v-model="form.repassword" type="password"></el-input></div>
                </el-form-item>
                <el-form-item>
                  <div class="input_box"><el-button class="two-box" type="primary" @click="registerFn">立即注册</el-button></div>

                </el-form-item>
                <el-form-item>
                    <div class="input_box"><el-button type="primary" @click="$router.push({name: '/login'}) " class="two-box">返回登录</el-button></div>
                </el-form-item>
              </el-form>
          </div>
      </div>
      <!-- 注册的表单区域 -->

    </div>
  </div>

</template>

<script>
import { getListAPINew } from '@/api'
export default {
  name: 'my-register',
  data () {
    // 必须在data函数里定义此箭头函数，才能确保this.form使用
    const samePwd = (rule, value, callback) => {
      if (value !== this.form.password) { callback(new Error('两次输入答案不一致')) } else { callback() }
    }
    return {

      form: {
        username: '',
        password: '',
        repassword: ''
      },
      rulesObj: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-z0-9]{1,10}$/, message: '用户名必须是1-10的大小写字母数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{5,15}$/, message: '密码必须是5-15的非空字符', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          // { pattern: /^\S{6,15}$/, message: '密码必须是6-15的非空字符', trigger: 'blur' },
          { validator: samePwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 注册->点击事件
    registerFn () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const res = await getListAPINew(this.form)
          console.log(res)
          // 异常处理:return结束并弹窗提示
          // if (res.code === 1) { return this.$message({type:'error',}) }
          // 注册成功弹窗提示
          this.$message({
            message: '注册成功',
            type: 'success'
          })
          // 路由跳转
          this.$router.push({ name: '/login' })
        } else { return false }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.reg-container {
  background: url("../../assets/images/背景板.jpg") center;
  background-size: cover;
  //找父级
  height: 100%;
  .reg-box {
    border: 2.74px solid #559dce;
    width: 89%;
    height: 88%;
    background-color: #fff;
    border-radius: 14px;
    //设置定位，成功定位在中央
    position: absolute;
    left: 50%;
    top: 50%;
    //左右撑开一点
    transform: translate(-50%, -50%);
    //width包含内padding和border
    padding: 0 30px;
    box-sizing: border-box;
    .title-box {
          // background: url("../../assets/images/标题logo.png") center no-repeat;
          height: 22%;
          display:flex;
          flex-direction:column;
          // margin-bottom: 10rem;
          img{
            align-self:center;
            // margin: 0 auto;
              width: 44%;
              height: 100%;
          }
    }
    .left_right-box{
          width: 100%;
          height: 75%;
          // background-color: red;
          // display: flex;
          display: flex;
          flex-direction: row;
          .left-logo{
                width: 45%;
                // background-color: blue;
                img{
                  width: 100%;
                  height: 100%;
                }
          }
          .right-form{
                background: url("../../assets/images/中心背景.png") center no-repeat;
                width: 55%;
                display:flex;flex-direction:column;
                >span{
                      // border-bottom: ;
                      margin-bottom: 1rem;
                      font-size: 2rem;
                      align-self: center;
                      font-weight: 600;
                      //增加文字间的距离
                      letter-spacing: .5rem;
                }
                .input_box{
                      height: 3.8rem;
                      width: 75%;
                      // align-self: center;
                      margin: 0 auto;
                      display:flex;flex-direction:column;
                    //四个框
                    .two-box{
                          align-self: center;
                          // opacity: 1;
                          width: 75%;
                          border: none ;
                          border-radius: 2rem ;
                    }

            }
    }
  }

}
  }
/deep/ .el-input__inner{
      height: 3.3rem;
   border-radius: 2rem !important;
}
/deep/ .el-button--primary{
  font-size: 1.7rem;
  height: 3.3rem;
  background-color: rgb(85, 156, 206);
}
/deep/ .el-form-item {
      margin-bottom: 0.2rem;
}
</style>
