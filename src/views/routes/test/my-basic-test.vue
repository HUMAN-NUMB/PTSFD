<template>
  <div class="my-base-test">
    <div v-if="isShow " class="pop">
        <div class="img">
          <span>{{final_score}}</span>
          <div class="exitBtn" @click="exit"><span>返回</span><img src="../../../assets/images/返回图标.png" alt=""></div>
        </div>
    </div>
    <div class="inner-box" >
        <span >{{qs_index+1}}、{{accordingAPISC[qs_index].question}}</span>
        <div class="bottom-box">
            <el-radio-group v-model="score_arr[qs_index]">
                <el-radio :label="accordingAPISC[qs_index].order?questions_score[index]:questions_score_reserve[index]" v-for="(item,index) in questions_choice" :key="index">{{String.fromCharCode(index+65)}}&nbsp;&nbsp;{{item}}</el-radio>
            </el-radio-group>
            <div class="btnGroup">
                <div class="left-btn" @click="lastQS" v-show="qs_index!== 0"><img src="../../../assets/images/左箭头.png" alt=""><span>上一题</span></div>
                <div class="right-btn" @click="nextQS" v-if="qs_index!== accordingAPISC.length-1"><span>下一题</span><img src="../../../assets/images/右箭头.png" alt=""></div>
                <div class="right-btn" @click="submitScore" v-else><span>提交</span><img src="../../../assets/images/右箭头.png" alt=""></div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { getTestSourseAPI, sendScoreToBackEnd } from '@/api'
// import Pubsub from 'pubsub-js'
// import '@/assets/font/font-main.css'
export default {
  name: 'my-base-test',
  async created () {
    // 获取题目的资源
    const { data: res } = await getTestSourseAPI()
    this.accordingAPISC = res
    // 动态赋值资源长度的全0数组
    this.score_arr = new Array(this.accordingAPISC.length).fill(0)

    console.log(this.score_arr)
  },
  mounted () {
    // console.log(this.score_arr)
  },
  data () {
    return {
      // 是否显示答案
      isShow: false,
      // 存放答案分值的数组
      score_arr: new Array(20).fill(0),
      // 总分
      final_score: 0,
      // API返回的资源
      accordingAPISC: {},
      // 题目的分数
      questions_score: [1, 2, 3, 4],
      questions_score_reserve: [4, 3, 2, 1],
      // 题目的选项
      questions_choice: ['偶尔', '稍有', '常有', '持续'],
      // 当前的书本资源的索引，刚进来是0
      qs_index: 0
      // 题目的资源
      // questions_resource: [
      //   {
      //     qs_title: '关于大学生跳楼的看法',
      //     qs_choice: [
      //       { detail: '如何评价', score: 1 },
      //       { detail: '扎不多得了', score: 2 },
      //       { detail: '神中神', score: 3 },
      //       { detail: '不如原神', score: 4 }
      //     ]
      //   },
      //   {
      //     qs_title: '关于大学生跳楼的看法2',
      //     qs_choice: [
      //       { detail: '如何评价2', score: 1 },
      //       { detail: '扎不多得了2', score: 2 },
      //       { detail: '神中神2', score: 3 },
      //       { detail: '不如原神2', score: 4 }
      //     ]
      //   },
      //   {
      //     qs_title: '关于大学生跳楼的看法3',
      //     qs_choice: [
      //       { detail: '如何评价3', score: 1 },
      //       { detail: '扎不多得了323133131233', score: 2 },
      //       { detail: '神中神3', score: 3 },
      //       { detail: '不如原神3', score: 4 }
      //     ]
      //   }
      // ],

    }
  },
  methods: {
    // 退出事件
    async exit () {
      await this.$router.push({ name: 'main' })
      // Pubsub.publish('exitCancel', 0)
    },
    // 切换下一道
    nextQS () {
      this.qs_index++
      console.log(this.score_arr)
    },
    // 切换上一道
    lastQS () {
      this.qs_index--
    },
    // 判断是否全部作答完毕
    checkEntireQS () {
      // 过滤出没有答题的索引index
      const indexArr = this.score_arr.map((item, index) => index).filter((item, index) => { return this.score_arr[item] === 0 })
      console.log(indexArr)
      if (indexArr.length === 0) {
        console.log(111)
        return true
      } else {
        // 找到最近未答题的题--跳转
        this.qs_index = indexArr[0]
        this.$message.success('未答题完毕!请检查')
        return false
      }
    },
    // 提交分数并且将分数记录发给后台
    async submitScore () {
      if (!this.checkEntireQS()) return
      let score = 0
      for (const eachScore of this.score_arr) {
        score += eachScore
      }
      this.final_score = score
      // 展示分数
      this.isShow = true
      // 发送存储分数给后台
      await sendScoreToBackEnd(this.final_score)
    }

  }
}
</script>

<style lang="less" >
.my-base-test{
  width: 90%;
  height: 95%;
  background-color: rgb(255, 255, 255);
  border-radius: 1rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .pop{
    width: 68%;
    height: 61%;
    // background-color: black;
    z-index: 1;
    position: fixed;
    .img{
      margin: 0 auto;
      width: 60%;
      height: 100%;
      // background-color: red;
      background: url('../../../assets/images/新分数板.png') no-repeat ;
      background-size: 100% 100%;
      position: relative;
      // z-index: 2;
      >span{
        // font-family: 'scoreMain';
        position: absolute;
        top: 25%;
        left: 12%;
        font-size: 29vh;
        font-style: italic;
        color: red;
        }
      }
      .exitBtn{
        border-radius: 8px;
        width: 15%;
        height: 8%;
        background-color: #b0b0b0;
        position: absolute;
        bottom: 18%;
        right: 21%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        span{
          color: white;
        }
        img{
          width: 25%;
          height: 75%;
        }
      }
      .exitBtn:hover{
        cursor: pointer;
      }
    }
  }
  .inner-box{
    width: 80%;
    height: 78%;
    //

    // background-color: red;
    // border-radius: 27px;
    >span{
        font-size: 31px;
        font-weight: 550;
        color: rgb(176, 176, 176);
    }
    .bottom-box{
        padding: 2%;
        border-top: 1px solid black;
        margin-top: 4%;
        height: 70%;
        .el-radio-group{
            display: flex;
            flex-direction: column;
            .el-radio{
            margin-top: 36px;
            display: flex;
            align-items: center;
            .el-radio__label{
                  color: rgb(187, 187, 187);
                  font-size: 22px;
                  line-height: 22px;
                  }
            .el-radio__label:hover{
                  color: pink;
                  }
              }
        }
        .btnGroup{
            margin: 0 auto;
            width: 98%;
            height: 34%;
            /* background-color: red; */
            display: flex;
            align-items: center;
            justify-content: space-between;
            .left-btn{
                width: 91px;
                height: 40px;
                background-color: #b0b0b0;
                border-radius: 12px;
                display: flex;
                align-items: center;
                img{
                    width: 32%;
                    height: 75%;
                }
                span{
                    color: white;
                    font-size: 16px;
                }
            }
            .left-btn:hover{
              cursor: pointer;
            }
            .right-btn{
                width: 91px;
                height: 40px;
                background-color: #b0b0b0;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                img{
                    width: 35%;
                    height: 75%;
                }
                span{
                    color: white;
                    font-size: 16px;
                }
            }
            .right-btn:hover{
                cursor: pointer;
            }
    }
    }

  }

</style>
