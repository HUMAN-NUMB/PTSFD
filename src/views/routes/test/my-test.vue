<template>
    <div class="my-test">
        <div class="left-bagd"></div>
        <div class="right-two-button">
            <div class="top-button">
                <img src="../../../assets/images/报告右上图.png" alt="" width="100%" height="100%" @click="$router.push({name:'base-test'})">
            </div>
            <div class="bottom-button">
                <img src="../../../assets/images/报告右下图.png" alt="" width="100%" height="100%">
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'my-test'
}
</script>

<style lang="less" scoped>
.my-test{
  width: 90%;
  height: 95%;
  background-color: rgb(255, 255, 255);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  //水平垂直
  margin: 0 auto;
  .left-bagd{
    border-right: 1px solid rgb(220, 220, 220);
    width: 55%;
    height: 80%;
    background-color: red;
    background: url('../../../assets/images/报告左图.png') no-repeat center;
    background-size: contain;

  }
  .right-two-button{
    width: 41%;
    height: 80%;
    // background-color: blue;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    .top-button{
        width: 54%;
        height: 25%;
        // background-color: red;
        // background: url('../../assets/images/报告右上图.png') no-repeat center;
        // background-size: contain;
    }
    .top-button:hover{
      cursor: pointer;
    }
    .bottom-button{
        width: 49%;
        height: 22%;
        // background-color: pink;
        // background: url('../../assets/images/报告右下图.png') no-repeat center;
        // background-size: contain;
    }
  }
}
</style>
