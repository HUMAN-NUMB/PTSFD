<template>
  <div class="my-user">
    <!-- 头像编辑功能 -->
      <div class="photo-config">
        <img src="../../assets/images/用户头像.png" alt="" v-if="!avatar" class="the_img">
        <img :src="avatar" alt="" v-else class="the_img">
        <!--  -->

        <input type="file" style="display:none" ref="iptRef" @change="onFileChange" accept="image/*">
        <div class="avatar_btn" @click="chooseImg">
            <img src="../../assets/images/编辑图标.png" alt="" >
            <span>编辑头像</span>
        </div>
        <!-- 保存到后台头像信息 -->
        <!-- <div class="avatar_btn"  @click="uploadFnImg">
            <img src="../../assets/images/编辑图标.png" alt="" >
            <span>保存头像</span>
        </div> -->

      </div>
      <!-- 基本信息编辑功能 -->
      <div class="info-config">
          <!-- 标题 -->
          <div class="info-config-title"><span>基本信息</span></div>
          <!-- 表单 -->
          <div class="info-config-edit">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item  prop="nickname" label="姓名：" ><el-input v-model="ruleForm.nickname" :placeholder="nickname"></el-input></el-form-item>
                  <el-form-item  prop="sex" label="性别："><el-radio v-model="ruleForm.sex" label="男" >男</el-radio><el-radio v-model="ruleForm.sex" label="女">女</el-radio></el-form-item>
                  <el-form-item  prop="birthday"  label="出生日期："><el-date-picker type="date" :placeholder="birthday" v-model="ruleForm.birthday" style="width: 100%;"  value-format="yyyy-MM-dd"></el-date-picker></el-form-item>
                  <el-form-item  prop="introduction" label="简介："><el-input v-model="ruleForm.introduction" :placeholder="introduction"></el-input></el-form-item>
                  <el-form-item  prop="contact" label="联系方式："><el-input v-model="ruleForm.contact" :placeholder="contact"></el-input></el-form-item>
                  <el-form-item  prop="area"  label="地区："><el-input v-model="ruleForm.area" :placeholder="area"></el-input></el-form-item>
                  <el-form-item><el-button type="primary" @click="saveUserInfo">保存</el-button></el-form-item>
              </el-form>
          </div>
      </div>
  </div>
</template>

<script>
import { updateAvatarAPI } from '@/api'
import { mapGetters } from 'vuex'
// import { onMounted } from 'vue'
export default {
  name: 'my-user',
  computed: {
    ...mapGetters(['nickname', 'image', 'introduction', 'area', 'contact', 'sex', 'birthday'])
  },
  data () {
    return {
      // 保存照片的链接--base64字符串
      avatar: '',
      // 表单数据部分,目前无用
      ruleForm: {
        nickname: '',
        sex: '',
        birthday: '',
        introduction: '',
        contact: '',
        area: ''
      },
      rules: {
        nickname: [
          { required: true, message: '姓名', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        sex: [{ required: true, message: '性别', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        birthday: [
          { required: true, message: '生日', trigger: 'blur', type: 'string' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        introduction: [
          { required: true, message: '简介', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '联系方式', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '地区', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击选择头像
    chooseImg () {
      // 模拟点击事件
      this.$refs.iptRef.click()
    },
    // 选择完图片后要读取该文件，然后转化格式
    async onFileChange (e) {
      console.log(1)
      // 获取文件信息
      const files = e.target.files
      console.log(files)
      // 没获取到
      if (files[0].length === 0) {
        this.avatar = ''
      } else {
        // const fr = new FileReader()
        // fr.readAsDataURL(files[0])
        // fr.onload = e => {
        // 在展示区展示
        // this.avatar = e.target.result
        // console.log(123)
      }
      this.avatar = URL.createObjectURL(files[0])
      console.log(this.avatar)
      const form = new FormData()
      form.append('image', files[0])
      const { data: res } = await updateAvatarAPI(form)
      console.log(res)
      this.$message.success('保存成功')
      // 更新个人信息
      this.$store.dispatch('initUserInfo')
      console.log(this.ruleForm)
    },
    // 更新后台头像信息
    async uploadFnImg () {
      // const { data: res } = await updateAvatarAPI(this.avatar)

      // this.$message.success(res.message)
      // 更新个人信息
      // this.$store.dispatch('initUserInfo')

      // this.$message.error(res.message)
    },

    // 点击保存用户基本信息
    saveUserInfo () {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          console.log(11)
          // 发出请求，送出表单内容
          const { data: res } = await updateAvatarAPI(this.ruleForm)
          console.log(res)
          // 更新个人信息
          this.$store.dispatch('initUserInfo')
          this.$message.success('个人信息已更新')
        } else { console.log(2) }
      })
    }
  },

  // created(){
  // 进来时获取用户信息
  // }
  mounted () {
    console.log(this.birthday)
  }
}
</script>

<style lang="less" scoped>
.my-user{
  width: 90%;
  height: 95%;
  background-color: rgb(255, 255, 255);
  border-radius: 1rem;
  //水平垂直
  margin: 0 auto;
  //头像设置
  .photo-config{
    padding-top: 5%;
    height: 15%;
    padding-left: 12rem;
    >*{
      display: inline-block;
    }
    .the_img{
      border: 1px solid black;
      width: 88px;
      height: 89px;
    }
    .avatar_btn{
      border: 1px solid black;
      margin-left: 3rem;
      img{
      width: 15px;
      height: 15px;
      }
    }
    .avatar_btn:hover{
      cursor: pointer;
    }
  }
  .info-config{
    margin-left: 10%;
    margin-top: 7%;
    height: 73%;
    .info-config-title{
      border-left: 8px rgb(1, 142, 237) solid;
      span{
        margin-left: 13px;
      }
    }
    .info-config-edit{
      margin-top: 57px;
      .demo-ruleForm{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
    }
  }
}
.el-input{
  // height: 200px;
}
.el-input__inner{

  // height: 40% ;
}
.el-form-item{
  width: 40%;
}
</style>
