<template>
  <div class="my-base-test">
    <div class="inner-box">
        <span>{{qs_index+1}}、{{questions_resource[qs_index].qs_title}}</span>
        <div class="bottom-box">
            <el-radio-group v-model="radio">
                <el-radio :label="item.score" v-for="(item,index) in questions_resource[qs_index].qs_choice" :key="index">{{String.fromCharCode(index+65)}}&nbsp;&nbsp;{{item.detail}}</el-radio>
            </el-radio-group>
            <div class="btnGroup">
                <div class="left-btn" @click="lastQS" v-show="qs_index!== 0"><img src="../../../assets/images/左箭头.png" alt=""><span>上一题</span></div>
                <div class="right-btn" @click="nextQS" v-if="qs_index!== questions_resource.length-1"><span>下一题</span><img src="../../../assets/images/右箭头.png" alt=""></div>
                <div class="right-btn" @click="nextQS" v-else><span>提交</span><img src="../../../assets/images/右箭头.png" alt=""></div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
// import {getTestSourseAPI} from '@/api'
export default {
  name: 'my-base-test',
  created () {
    // 获取题目的资源
    // getTestSourseAPI()
  },
  data () {
    return {
      //
      radio: 3,
      // 书本的资源
      questions_resource: [
        {
          qs_title: '关于大学生跳楼的看法',
          qs_choice: [
            { detail: '如何评价', score: 1 },
            { detail: '扎不多得了', score: 2 },
            { detail: '神中神', score: 3 },
            { detail: '不如原神', score: 4 }
          ]
        },
        {
          qs_title: '关于大学生跳楼的看法2',
          qs_choice: [
            { detail: '如何评价2', score: 1 },
            { detail: '扎不多得了2', score: 2 },
            { detail: '神中神2', score: 3 },
            { detail: '不如原神2', score: 4 }
          ]
        },
        {
          qs_title: '关于大学生跳楼的看法3',
          qs_choice: [
            { detail: '如何评价3', score: 1 },
            { detail: '扎不多得了3', score: 2 },
            { detail: '神中神3', score: 3 },
            { detail: '不如原神3', score: 4 }
          ]
        }
      ],
      // 当前的书本资源的索引，刚进来是0
      qs_index: 0
    }
  },
  methods: {
    // 切换下一道
    nextQS () {
      this.qs_index++
    },
    // 切换上一道
    lastQS () {
      this.qs_index--
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
  .inner-box{
    width: 80%;
    height: 78%;

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
    }
    }

  }
}
.el-radio{
    margin-top: 36px;
    display: flex;
    align-items: center;
}
.el-radio__label{
    color: rgb(187, 187, 187);
    font-size: 22px;
    line-height: 22px;
}
.el-radio__label:hover{
    color: pink;
}
.el-radio-group{
    display: flex;
    flex-direction: column;
}
</style>
