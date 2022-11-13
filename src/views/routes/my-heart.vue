
<template>
  <div class="my-heart">
      <div class="commentArea" >

        <div   class="eachBox" v-bind:class="{ 'eachBox': msgdata[index].isLeft, 'eachBox2': !msgdata[index].isLeft }" v-for="(item,index) in msgdata" :key="index">
          <div :style="{'background-image':'url('+item.favicon+')'}" ></div>
          <div ><span>{{item.message}}</span></div>
        </div>
      </div>
      <div class="sendArea">
          <div class="icons" v-for="(item,index) in getIcons" :key="index" :style="{'background-image':'url('+item.img_url+')'}"></div>
          <div class="input">
              <textarea name="" id="" cols="30" rows="10" v-model="textWillSend"></textarea>
              <div class="input_btn" @click="sendToWs"><span>发送</span></div>
          </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'my-heart',
  data () {
    return {
      isLeft: true,
      /**
       * websocket部分
       */
      // textarea框的信息
      textWillSend: '',
      path: 'wss://b2de4f056142.akimitsu.top/ws/chat',
      socket: '',
      favicon: '',
      message: '12345',
      msgdata: [],

      input: '',
      // 获得的资源
      // getSource: [
      //   { img: require('@/assets/images/头像1.jpg'), info: '听说有人想不开' },
      //   { img: require('@/assets/images/头像2.jpg'), info: '差不多得了' },
      //   { img: require('@/assets/images/头像3.jpg'), info: '我前天刚刚跳来着，可惜没挂' },
      //   { img: require('@/assets/images/头像1.jpg'), info: '听说有人想不开' },
      //   { img: require('@/assets/images/头像2.jpg'), info: '差不多得了' },
      //   { img: require('@/assets/images/头像3.jpg'), info: '我前天刚刚跳来着，可惜没挂' },
      //   { img: require('@/assets/images/头像2.jpg'), info: '差不多得了' },
      //   { img: require('@/assets/images/头像3.jpg'), info: '我前天刚刚跳来着，可惜没挂' },

      //   { img: require('@/assets/images/头像2.jpg'), info: '差不多得了' },
      //   { img: require('@/assets/images/头像3.jpg'), info: '我前天刚刚跳来着，可惜没挂' }

      // ],
      getIcons: [
        { img_url: require('@/assets/images/视频图标(心灵树洞).png') },
        { img_url: require('@/assets/images/图片图标.png') },
        { img_url: require('@/assets/images/链接图标.png') },
        { img_url: require('@/assets/images/位置图标.png') },
        { img_url: require('@/assets/images/设置图标.png') }
      ]

    }
  },
  mounted () {
    this.favicon = this.$store.state.userInfo.image// window.btoa(
    // 初始化
    this.init()
  },
  // 关闭websocket（切记）
  destroyed () {
    // 销毁监听
    this.socket.onclose = this.close
    console.log('已销毁')
  },
  methods: {
    // 初始化websocket
    init: function () {
      if (typeof (WebSocket) === 'undefined') {
        alert('您的浏览器不支持socket')
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.path)
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.getMessage
      }
    },
    // 开启时的函数
    open: function () {
      console.log('socket连接成功')
    },
    // 出错时的函数
    error: function () {
      console.log('连接错误')
    },
    // 获取消息的函数
    getMessage: function (msg) {
      const data = JSON.parse(msg.data)
      if (data.favicon === this.favicon) this.isLeft = false
      else this.isLeft = true
      data.isLeft = this.isLeft
      // console.log(this.isLeft)
      // data.favicon = window.atob(msg.data.favicon)
      this.msgdata.push(data)

      // console.log(data)
    },
    // 发送消息的函数
    send: function () {
      this.socket.send(
        JSON.stringify(
          {
            favicon: this.favicon,
            message: this.textWillSend
          }
        )
      )
    },
    // 关闭时的函数
    close: function () {
      console.log('socket已经关闭')
    },
    // 点击发送，发送信息
    sendToWs () {
      this.send()
      // 发送完清空textarea
      this.textWillSend = ''
    }
  }

}
</script>

<style lang="less" scoped>
.my-heart{
    width: 90%;
    height: 95%;
    background-color: rgb(255, 255, 255);
    border-radius: 1rem;
    //水平垂直
    margin: 0 auto;
        max-height: 95%;
    .commentArea{
        margin: 0 auto;
        width: 95%;
        height: 70%;
        // background-color: red;
        overflow: auto;
        max-height: 70%;
        // display: flex;
        .eachBox{
          width: 100%;
          height: 70px;
          margin-top: 10px;
            // flex: 1;
  // flex-shrink: 0;
  // height: 0;
  // width: 100%;
  // display: flex;
          // background-color: rgb(235, 235, 235);
          display: flex;
          align-items: center;
          div:first-child{
            // display: inline-block;
            width: 50px;
            height: 50px;
            background-size: 100% 100%;
            border-radius: 25px;
          }
          div:last-child{
            // display: inline-block;
            // width: 50p;
            display: flex;
            align-items: center;
            height: 34px;
            background-color: rgb(98, 178, 231);
            position: relative;
            top: 6px;
            left: 3%;
            border-radius: 5px;
            span{
              color: rgb(236, 254, 234);
              padding: 0 24px;
            }
          }
        }
        .eachBox2{
          align-items: center ;
          flex-direction: row-reverse;
          div:last-child{
            top: 6px;
            // right: 40px;
            left: -3%;
          }
        }
    }
    .sendArea{
        border-top: 1px solid rgb(167, 167, 167);
        margin: 0 auto;
        width: 95%;
        height: 30%;
        background-color: white;

        .icons{
          width: 26px;
          height: 26px;
          // background-color: red;
          background-size: 100% 100%;
          display: inline-block;
          margin-right: 3%;
          margin-top: 1%;
        }
        .input{
          height: 74%;
          width: 100%;
          position: relative;
          >textarea{
            height: 49%;
            width: 99%;
            border: none;
            outline:none;
            color: rgb(135, 135, 135);
            font-size: 20px;
          }
          // >textarea:focus-visible{
          //   outline-offset: none !important;;
          // }
          .input_btn{
            width: 9%;
            height: 30%;
            background-color: #60afea;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 14px;
            position: absolute;
            bottom: 1px;
            right: 3%;
            >span{
              color: white;
              font-size: 19px;
            }
          }
          .input_btn:hover{
            cursor: pointer;
          }
        }
    }
}
</style>
