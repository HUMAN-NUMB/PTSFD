<template>
  <div class="my-main">
      <div class="left_img"><span>{{left_span}}</span></div>
      <div class="right_img">
        <div class="top_box"><div class="top_echart" id="photoFirst" style="width: 90%;height:100%;"></div></div>
        <div class="bottom_box"><div class="bottom_echart" id="photoSeconed" style="width: 90%;height:100%;"></div></div>
      </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { getTestFromYiYan, getScoreAndCount } from '@/api'
export default {
  name: 'my-main',
  data () {
    return {
      left_span: '',
      // 表格数据
      sectorSc: [
        { value: 0, name: '<60' },
        { value: 0, name: '60~70' },
        { value: 0, name: '70~80' },
        { value: 0, name: '80~90' },
        { value: 0, name: '90~100' }
      ],
      score_arr: [],
      times_arr: []
    }
  },
  methods: {
    // 判断数据所处范围进行填充
    sectorDataFill (score) {
      switch (true) {
        case score < 60:this.sectorSc[0].value++; break
        case score >= 60 && score <= 70:this.sectorSc[1].value++; break
        case score > 70 && score <= 80:this.sectorSc[2].value++; break
        case score > 80 && score <= 90:this.sectorSc[3].value++; break
        case score > 90 && score <= 100:this.sectorSc[4].value++; break
      }
      // console.log(this.sectorSc)
    }

  },
  async mounted () {
    // 获取一言
    const res = await getTestFromYiYan()
    // console.log(res.data)
    this.left_span = res.data
    // 获取次数和分数
    const { data: res1 } = await getScoreAndCount()
    // 数据填入
    for (const item of res1) {
      this.score_arr.push(item.score)
      this.times_arr.push(item.times)
      this.sectorDataFill(item.score)
    }
    // console.log(this.score_arr, this.times_arr)
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('photoFirst'))
    // 绘制图表

    myChart.setOption({
      title: {
        text: '预测报告树状图分析结果'
      },
      tooltip: {},
      xAxis: {
        data: this.times_arr,
        name: '次数'
      },
      yAxis: {
        name: '分数'
      },
      series: [
        {
          name: '销量',
          type: 'bar',
          data: this.score_arr
        }
      ]
    })
    const myNextChart = echarts.init(document.getElementById('photoSeconed'))
    myNextChart.setOption({
      title: {
        text: '预测报告扇形图分析结果',
        subtext: '分数范围',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: this.sectorSc,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
    window.onresize = function () {
      myChart.resize()
      myNextChart.resize()
    }
  }

}
</script>

<style lang="less" scoped>
  .my-main{
    width: 100%;
    height: 100%;
    background-color: rgb(235, 235, 235);
    border-radius: 1rem;
    display: flex;
    // align-items: center;
    // justify-content: center;
    margin: 0 auto;
    padding: 0 !important;
    .left_img{
      width: 48%;
      height: 90%;
      // margin-bottom: 10%;
      background: url('../../assets/images/夹子便签.png') no-repeat center;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      >span{

        }

    }
    .right_img{
      width: 48%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      // background-color: red;
      .top_box{
        width: 90%;
        height: 46%;
        border-radius: 28px;
        background-color: white;
        display: flex;
        align-items: center;
      .top_echart{
        // width: 90%;
        // height: 90%;
        margin: 0 auto;
        // border-radius: 1px;
        // >div{
        //   position: relative;
        //   width: 100% !important;
        //   height: 100% !important;
        //   >canvas{
        //     width: 100% !important;
        //     height: 100% !important;
        //   }
        // }
      }
      }
      .bottom_box{
        width: 90%;
        height: 46%;
        border-radius: 28px;
        background-color: white;
        display: flex;
        align-items: center;
        .bottom_echart{
          // width: 90%;
          // height: 90%;
          margin: 0 auto;
        }
      }

    }
  }
</style>
