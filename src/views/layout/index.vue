<template>
  <el-container class="main-container">
    <el-header>
      <img src="../../assets/images/标题logo(半留白).png" alt="" />

      <!-- 搜索框 -->
      <div class="search_container">
        <form action="" class="">
            <input type="text" class="search" placeholder="搜索">
            <button class="btn"><img src="../../assets/images/搜索图标.png" alt=""></button>
            <div class="notice"><img src="../../assets/images/通知图标.png" alt=""></div>
        </form>
      </div>

    </el-header>
    <el-container>
      <el-aside width="200px">
        <div>
              <div class="aside_img_name">
                <!-- 利用null判断运算符 省去v-if -->
                <img
                  :src="image ?? require('../../assets/images/scene.jpg')"
                  alt=""
                />
                <!-- 用 || 判断，不用??，因为空字符串不生效 -->
                <div class="aside_textbox" >
                                  <span>欢迎{{ nickname  }}</span>
                                  <span>简介：{{introduction}}</span>
                </div>
              </div>
        </div>
        <div class="exit" v-for="(item,index) in aside_list" :key="index" @click="sub_view(index)">
              <img :src="item.first_img" alt="">
              <span>{{item.middle_text}}</span>
              <img :src="item.last_img" alt="">
        </div>
        <!-- default-active:当前激活菜单的 index
        -->

      </el-aside>
      <el-container>
        <el-main class="router_exchange"><router-view></router-view></el-main>
        <!-- <el-footer>© www.张伟是混蛋.com </el-footer> -->
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
// import { getUserInfoAPI } from '@/api'
import { mapGetters } from 'vuex'
export default {
  name: 'my-layout',
  data () {
    return {
      // 左下角的数据
      aside_list: [
        {
          first_img: require('@/assets/images/首页图标.png'),
          middle_text: '首页',
          last_img: require('@/assets/images/右箭头图标.png'),
          route_url: 'main'
        },
        {
          first_img: require('@/assets/images/预测报告图标.png'),
          middle_text: '预测报告',
          last_img: require('@/assets/images/右箭头图标.png'),
          route_url: 'test'
        },
        {
          first_img: require('@/assets/images/轻松一刻图标.png'),
          middle_text: '轻松一刻',
          last_img: require('@/assets/images/右箭头图标.png'),
          route_url: 'laugh'
        },
        {
          first_img: require('@/assets/images/心灵树洞图标.png'),
          middle_text: '心灵树洞',
          last_img: require('@/assets/images/右箭头图标.png'),
          route_url: 'heart'
        },
        {
          first_img: require('@/assets/images/用户中心图标.png'),
          middle_text: '用户中心',
          last_img: require('@/assets/images/右箭头图标.png'),
          route_url: 'user'
        },
        {
          first_img: require('@/assets/images/退出图标.png'),
          middle_text: '退出',
          last_img: require('@/assets/images/右箭头图标.png'),
          route_url: 'exit'
        }
      ]
    }
  },
  methods: {

    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    // 左下点击时触发的路由跳转
    sub_view (index) {
      this.$router.push({
        name: this.aside_list[index].route_url
      })
    }
  },
  // 映射
  computed: {
    ...mapGetters(['nickname', 'image', 'introduction'])
  }
  // 登录之后跳转到主页这里时，获取用户的信息
  // (不要在这写，如果在这写，刷新主页，每次都会发送请求获取已经获取过的内容，浪费资源)
  // 可以使用全局路由守卫
  // created () {
  //   this.$store.dispatch('initUserInfo')
  //   console.log(1)
  // }
}
</script>

<style  lang="less" scoped>
.main-container {
  height: 100%; //找父

  .el-aside{
    background-color: #ffffff;
  }
  .el-aside {
    >div:first-child {
      height: 27%;
      background-color: #77bdee;
      //解决父子margin-top塌陷问题
      overflow: hidden;
      background: url('../../assets/images/左侧上背景.jpg') no-repeat center;
      background-size: 100% 100%;
      // display: flex;
      // justify-content: center;
      // border-top: 1px solid #000;
      // border-bottom: 1px solid #000;
      .aside_img_name{
        margin-top: 2.3rem;
        // width: 100%;
        // height: 45%;
        display: flex;
        // background-color: red;
        img {
                margin-left: 1.5rem;
                align-items: center;
                // align-self: center;
                border-radius: 50%;
                background-color: white;
                width: 34%;
                height: 54px;
                // margin-right: 26px;
              }
        .aside_textbox{
          margin-left: .6rem;
          //  align-items: center;
          display: inline-block;
          span {
            margin-top: .2rem;
            display: block;
            // align-self: center;
            height: 20px;
            line-height: 20px;
            color: white;
            font-size: 12px;
            //设置超过1行就省略
            overflow: hidden;
            text-overflow: ellipsis;
            text-overflow: -webkit-ellipsis-lastline;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }

      }

      // .el-menu-vertical-demo{
      //   border-right: none !important;
      // }
      // .el-submenu,
      // .el-menu:hover{
      //   background-color: aqua !important;
      // }
    }
    .exit{
      margin-top: 2rem;
      height: 30px;
      border-radius: 1rem;
      background-color: #cae9ff;
      //使子元素垂直居中
      display: flex;
      position: relative;
      align-items: center;
      img{
        width: 20%;
        height: 100%;
      }
      img:last-child{
        position: absolute;
        right: .2rem;
        // float: right;
      }
      span{
        color: #676767;
        margin-left: 2rem;
        height: 100%;
        line-height: 30px;
            font-weight: 550;
      }
    }
    .exit:hover{
      cursor: pointer;
    }
  }
  .el-header {
    height: 78px !important;
    display: flex;
    justify-content: space-between;
    background-color: rgb(85, 156, 206);
    img{
      // margin-right: 2rem;
      width: 20%;
    }
    .search_container{
      // margin-left: 4rem;
      // display: inline-block;
      background-color: none;
      height: 100%;
      width: 200px;
      display: flex;
      justify-content: center;
      align-items:center;
      // flex-direction:column;
      ::-webkit-input-placeholder {
        color: #676767;
        padding-left: .8rem;
      }
      .search{
        align-self:center;
        background: none;
        outline: none;
        border: none;
        border: 2px solid #676767;
        border-radius: 1rem;
        height: 1.5rem;
        //失去聚焦时候的颜色
        color: pink;
        font-size: 1rem;
        position: relative;
      }
      .search:focus{
        //聚焦时候的颜色
        color: #676767;
      }
      .btn{

            position: absolute;
            top: 29px;
            /* left: -54px; */
            right: 2.1rem;
            // background-color: pink;
            // background: url("../../assets/images/搜索图标.png") no-repeat;
            width: 33px;
            height: 21px;
            border: none;
            background: none;
            img{
                width: 100%;
                height: 100%;
            }
      }
      .btn:hover{
        cursor: pointer;
      }
      .notice{
        position: absolute;
                    top: 25px;
            /* left: -54px; */
            right: 17rem;
            width: 36px;
            // background-color: red;
            height: 36px;
            display: flex;
            align-items:center;
            img{

              // margin: 0 auto;
              width: 100%;
              height: 100%;
            }
            img:hover{
              cursor: pointer;
            }
    }
    }

  }
  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}
.router_exchange{
  background-color: rgb(235, 235, 235);
  display: flex;
  align-items: center;
  max-height: 100%;
}
</style>
