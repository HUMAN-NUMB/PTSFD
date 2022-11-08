<template>
  <div class="audio-area">
        <div class="audio-middle">
            <div class="background-middle">
                    <div v-for="(item,index) in img_icon" :key="index" :style="{'background-image':'url('+item.img_url+')'}" @click="fourBtnClick(item.clickThing)"></div>
            </div>
        </div>
        <!-- v-if 等资源到了，再渲染a-player标签，目的：防止自动播放失效 -->
        <a-player
            style="display:none"
            v-if="audio && renderAplayer"
          :music="audio[music_index]"
          :list="audio"
          autoplay
          ref="aplay"
          repeat="repeat-all"
        />

        <div class="laugh-area">
            <div class="laugh-middle">
                <div class="laugh-middle-leftImg" :style="{'background-image':'url('+book_source[book_index].book_url+')'}"></div>
                <div class="laugh-middle-briefInfo">
                    <span>书名：《{{book_source[book_index].book_name}}》</span>
                    <span>简介：{{book_source[book_index].book_brief}}</span>
                    <span>出版社：{{book_source[book_index].book_publisher}}</span>
                    <span>语言：{{book_source[book_index].book_language}}</span>
                    <div class="laugh-middle-briefInfo-btn">
                            <div class="clickToShoping"><span>开始阅读</span></div>
                            <div @click="changeBookIndex"><span>下一本</span><div ></div></div>
                    </div>
                </div>
            </div>
        </div>
  </div>

</template>

<script>
// import {getBookSourseAPI} from '@/api'

import APlayer from 'vue-aplayer'
export default {
  name: 'my-laugh',
  components: { APlayer },
  data () {
    return {
      // 上方的四个按钮
      img_icon: [
        { img_url: require('@/assets/images/轻松一刻图片1.png'), clickThing: 'lastSong' },
        { img_url: require('@/assets/images/轻松一刻图片2.png'), clickThing: 'lastSong' },
        { img_url: require('@/assets/images/轻松一刻图片3.png'), clickThing: 'nextSong' },
        { img_url: require('@/assets/images/轻松一刻图片4.png'), clickThing: 'stopOrPlaySong' }
      ],
      // 音频列表
      audio: [
        {
          url: 'http://music.163.com/song/media/outer/url?id=1947208581.mp3'
        },
        {
          url: 'http://music.163.com/song/media/outer/url?id=1371382065.mp3'
        },
        {
          url: 'http://music.163.com/song/media/outer/url?id=1379662220.mp3'
        }
      ],
      // 当前播放的音乐的索引--默认第一首
      music_index: 0,
      // 渲染的判断
      renderAplayer: true,

      // 当前展示书本资源索引--默认为0
      book_index: 0,
      // 书本资源
      book_source: [
        {
          book_url: require('@/assets/images/轻松一刻书.png'),
          book_name: '改变心理学的40项研究 第7版',
          book_brief: '1、Vue的核心库只关注视图层，并且非常容易学习，非常容易与其它库或已有项目整合。2、Vue的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件。3、Vue可以做从简单到复杂的前端单页应用，随处可见的Web前端都可以用Vue来开发。而且Vue上手速度快、功能强大，且提供了非常好用的脚手架vue-cli，很简单就可以构建并让自己的项目跑起来。',
          book_publisher: '人民邮电出版社',
          book_language: '中文'
        },
        {
          book_url: require('@/assets/images/语文.png'),
          book_name: '一年级上册语数人教版',
          book_brief: '一年级上册语文数学英语课本教材教科书人教部编版2021语数英课本 一年级上册语数人教版',
          book_publisher: '人民教育出版社',
          book_language: '中文'
        }
      ]
    }
  },
  methods: {
    // 添加不同的点击事件
    fourBtnClick (clickThing) {
      this[clickThing]()
    },
    // 播放上一首
    async lastSong () {
      // 先关闭aplayer标签
      this.renderAplayer = false
      // 更改数据源
      this.music_index = (this.music_index === 0) ? (this.audio.length - 1) : (this.music_index - 1)
      // 异步等待开启aplayer标签
      this.renderAplayer = await true
      // 触发播放事件
      //   this.stopOrPlaySong()

      // this.$refs.aplay.play()
      //   this.$refs.aplay.autoplay = true

    //   console.log(this.$refs.aplay)
    //   this.$refs.aplay.skipBack()
    },
    // 第四个键播放or暂停
    stopOrPlaySong () {
    //   if (this.music_state === 0) {
    //     this.$refs.aplay.pause()
    //     this.music_state = 1
    //   } else {
    //     this.$refs.aplay.play()
    //     this.music_state = 0
    //   }
      this.$refs.aplay.toggle()
    },
    // 播放下一首
    async nextSong () {
      // 先关闭aplayer标签
      this.renderAplayer = false
      // 更改数据源
      this.music_index = (this.music_index === this.audio.length - 1) ? 0 : (this.music_index + 1)
      // 异步等待开启aplayer标签
      this.renderAplayer = await true
      // 触发播放事件
    //   this.stopOrPlaySong()
    },
    // 切换书本资源
    changeBookIndex () {
      this.book_index = (this.book_index === this.book_source.length - 1) ? 0 : (this.book_index + 1)
    }

  },
  computed: {
    //   audio () { // 动态获取audio标签
    //     return window.document.querySelector('audio')
    //   }
    // current_music1 () {
    //   return this.current_music
    // }
  },
  async created () {
    // 请求书本资源
    // const { data: res } = await getBookSourseAPI()
    // this.current_music = this.music[0].id
  }
}
</script>

<style lang="less">
.audio-area{
    width: 100%;
    height: 100%;
    .audio-middle{
        // margin: 0 auto;
        width: 100%;
        height: 17%;
        .background-middle{

            margin: 0 auto;
            width: 50%;
            height: 100%;
            background: url('../../assets/images/每日一笑-上背景.png') no-repeat center;
            background-size: cover;
            border-radius: 19px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            div{
                // display: inline-block;

                width: 12%;
                height: 60%;
                background-repeat: no-repeat;
                background-position: center;

                background-size: cover;
            }
            div:hover{
                cursor: pointer;
            }
            }

        }
    }
    .laugh-area{
        margin-top: 3%;
        height: 80%;

        .laugh-middle{
                    // padding: 10%;
            width: 67%;
            height: 95%;
            margin: 0 auto;
            // background-color: blue;
            border-radius: 19px;
            background: url('../../assets/images/轻松一刻下背景.png') no-repeat center;
            background-size: cover;
            overflow: hidden;
            .laugh-middle-leftImg{
                display: inline-block;
                height: 81%;
                width: 30%;
                background-color: red;
                margin-left: 4%;
                margin-top: 4%;
                background-repeat: no-repeat;
                background-position: center;
                // background:  no-repeat center;
                background-size: cover;
            }
            .laugh-middle-briefInfo{

                display: inline-block;
                height: 81%;
                width: 58%;
                margin-left: 4%;
                margin-top: 4%;
                // background-color: black;
                overflow: hidden;
                position: relative;
                >span{
                    display: block;
                    margin-top: 6%;
                    font-size: 18px;
                    color: #676767;
                    // 设置超过三行就省略
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-overflow: -webkit-ellipsis-lastline;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    line-clamp: 3;
                    -webkit-box-orient: vertical;

                }
                .laugh-middle-briefInfo-btn{
                    width: 100%;
                    position:absolute;
                    bottom: 0;
                    // background-color: red;
                    position: absolute;
                    margin-top: 20%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    >div{
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                        border-radius: 16px;
                        height: 50px;
                        background-color: #8a9399;
                        width: 25%;

                        span{
                            color: white;
                            font-size: 22px;
                            line-height: 22px;
                        }
                        span:hover{
                             cursor: pointer;
                        }
                        div{
                                // display: inline-block;
                                width: 20%;
                                height: 70%;
                                background: url('../../assets/images/轻松一刻下图标.png') no-repeat center;
                                background-size: cover;
                        }
                        div:hover{
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }

</style>
