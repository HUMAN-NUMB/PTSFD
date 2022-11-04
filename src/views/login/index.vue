
<template>
  <!-- 注册页面的整体盒子 -->
  <div class="login-container">
    <!-- 注册的盒子 -->
    <div class="login-box">
      <!-- 标题的盒子 -->
      <div class="title-box"><img src="../../assets/images/标题logo(半留白).png" alt=""></div>
      <div class="left_right-box">
          <div class="left-logo"><img src="../../assets/images/左插图.png" alt=""></div>
          <div class="right-form">
                      <!-- 注册的表单区域 -->
              <span>欢迎登录</span>
              <el-form status-icon  :model="form" :rules="rulesObj" ref = "form">
                <el-form-item  prop="username">
                  <div class="input_box"><el-input type="text" autocomplete="off" placeholder="请输入用户名" v-model="form.username" width="100px" class="two-box"> </el-input></div>
                </el-form-item>
                <el-form-item  prop="password">
                 <div class="input_box"> <el-input type="password" autocomplete="off" placeholder="请输入密码" v-model="form.password" class="two-box"> </el-input></div>
                </el-form-item>
                <el-form-item>
                  <div class="input_box"><el-button class="two-box" type="primary" @click="loginFn">登录</el-button></div>
                </el-form-item>
                <el-form-item>
                 <div class="input_box"> <el-button type="primary" @click="$router.push({name: '/reg'})" class="two-box">未注册？点击注册</el-button></div>
                </el-form-item>
              </el-form>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  name: 'my-login',
  data () {
    return {

      form: {
        username: '',
        password: ''

      },
      rulesObj: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-z0-9]{1,10}$/, message: '用户名必须是1-10的大小写字母数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15的非空字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 拓展运算符映射
    ...mapMutations(['updataToken']),
    // 登录->点击事件
    loginFn () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const { data: res } = await loginAPI(this.form)
          // console.log(res)
          // 异常处理:return结束并弹窗提示
          if (res.code === 1) { return this.$message.error(res.message) }
          // 注册成功弹窗提示
          this.$message({
            message: res.message,
            type: 'success'
          })
          // 将token存入vuex
          this.updataToken(res.token)
          // 路由跳转
          this.$router.push({ path: '/' })
        } else { return false }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  background: url("../../assets/images/背景板.jpg") center;
  background-size: cover;
  //找父级
  height: 100%;
  .login-box {
    border: 2.74px solid #559dce;
    width: 89%;
    height: 88%;
    background-color: #fff;
    border-radius: 14px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
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
            // background-color: pink;
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
              height: 4rem;
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
</style>
