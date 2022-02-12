<template>
  <div class="index">
    <ul class="circles">
      <li
        v-for="n in 10"
        :key="n"
        @click="onClickDialog(n)"
      >
        <div
          v-show="n === 6"
          class="six"
        >点我</div>
        <div
          v-show="n === 1"
          class="one"
        >HELP!</div>
      </li>
    </ul>
    <el-dialog
      v-model="centerDialogVisible"
      width="30%"
      center
      top='15vh'
      :show-close='false'
    >
      <div class="dialog-style">
        <div class="img-style">
          <el-image
            style="width: 100px; height: 150px"
            :src="dialogList[itemId].url"
            fit="fill"
          ></el-image>
        </div>
        <div class="tips-style">
          <ul>
            <li class="name">{{dialogList[itemId].name}}</li>
            <li class="tip">简介：{{dialogList[itemId].tip}}</li>
            <li></li>
          </ul>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            type="primary"
            @click="onClickDialog(n)"
          >确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      centerDialogVisible: false,
      dialogList: [
        { id: 1, url: require('../../assets/logo.png'), name: '我吃西红柿', tip: '白金作家' },
        { id: 2, url: require('../../assets/logo.png'), name: '我吃西红柿', tip: '白金作家' },
        { id: 3, url: require('../../assets/logo.png'), name: '我吃西红柿', tip: '白金作家' },
        { id: 4, url: require('../../assets/logo.png'), name: '我吃西红柿', tip: '白金作家' },
        { id: 5, url: require('../../assets/logo.png'), name: '我吃西红柿', tip: '白金作家' },
        { id: 6, url: require('../../assets/logo.png'), name: '我吃西红柿', tip: '白金作家' },
        { id: 7, url: require('../../assets/logo.png'), name: '我吃西红柿', tip: '白金作家' },
        { id: 8, url: require('../../assets/logo.png'), name: '我吃西红柿', tip: '白金作家' },
        { id: 9, url: require('../../assets/logo.png'), name: '我吃西红柿', tip: '白金作家' },
        { id: 10, url: require('../../assets/logo.png'), name: '我吃西红柿', tip: '白金作家' }
      ],
      itemId: null
    }
  },
  methods: {
    onClickDialog (n) {
      console.log(this.centerDialogVisible, n)
      if (this.centerDialogVisible) {
        this.centerDialogVisible = false
      } else {
        this.centerDialogVisible = true
        this.itemId = n - 1
        console.log(this.dialogList[this.itemId])
      }
    }
  }
})
</script>

<style lang="less" scoped>
.index {
  width: 100%;
  height: 100%;
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0px;
    padding: 0px;
    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      // background: rgb(88, 163, 248);
      background-image: url("../../../src/assets/star.png");
      background-size: cover;
      background-repeat: no-repeat;
      animation: animate 25s linear infinite;
      bottom: -200px;
      cursor: pointer;
      .six {
        position: relative;
        left: 85%;
        top: 30%;
        width: 40px;
        font-size: 12px;
        color: red;
        border-radius: 4px;
        padding: 5px;
        background-color: white;
      }
      .one {
        position: relative;
        left: 85%;
        top: 30%;
        width: 40px;
        font-size: 12px;
        color: red;
        border-radius: 3px;
        padding: 2px;
        background-color: white;
      }
      @keyframes animate {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
        }
      }
      &:nth-child(1) {
        left: 15%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }
      &:nth-child(2) {
        left: 5%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }
      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }
      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }
      &:nth-child(6) {
        left: 75%;
        width: 150px;
        height: 150px;
        animation-delay: 3s;
      }
      &:nth-child(7) {
        left: 35%;
        width: 200px;
        height: 200px;
        animation-delay: 7s;
      }
      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }
      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }
      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }
  .dialog-style {
    display: flex;
    flex-direction: row;
    .tips-style {
      flex: 1;
      ul {
        list-style: none;
        height: 100%;
        .name {
          font-weight: 600;
          font-size: 14px;
        }
        .tip {
          font-size: 12px;
        }
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
      }
    }
  }
}
::v-deep .el-dialog__header {
  display: none;
}
</style>
