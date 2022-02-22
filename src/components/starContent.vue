<template>
  <div class="dialog-info">
    <div class="img-style">
      <el-image
        style="width: 120px; height: 150px"
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
  <div class="dialog-content">
    <ul>
      <li v-for="item in 6" :key="item">
        <el-image
          style="width: 100%; height: 120px"
          :src="dialogList[itemId].url"
        ></el-image>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    itemId: Number
  },
  data () {
    return {
      dialogList: [
        { id: 1, url: require('../assets/logo.png'), name: '我吃西红柿', tip: '白金作家' },
        { id: 2, url: require('../assets/logo.png'), name: '我吃西红柿', tip: '白金作家' },
        { id: 3, url: require('../assets/logo.png'), name: '我吃西红柿', tip: '白金作家' },
        { id: 4, url: require('../assets/logo.png'), name: '我吃西红柿', tip: '白金作家' },
        { id: 5, url: require('../assets/logo.png'), name: '我吃西红柿', tip: '白金作家' },
        { id: 6, url: require('../assets/logo.png'), name: '我吃西红柿', tip: '白金作家' },
        { id: 7, url: require('../assets/logo.png'), name: '我吃西红柿', tip: '白金作家' },
        { id: 8, url: require('../assets/logo.png'), name: '我吃西红柿', tip: '白金作家' },
        { id: 9, url: require('../assets/logo.png'), name: '我吃西红柿', tip: '白金作家' },
        { id: 10, url: require('../assets/logo.png'), name: '我吃西红柿', tip: '白金作家' }
      ]
    }
  }
})
export default class StarContent extends Vue {
  itemId!: number
}
</script>

<style lang="less" scoped>
  .dialog-info {
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
  .dialog-content{
    ul{
      list-style: none;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      padding: 0;
      margin: 0;
      li{
        width: 25%;
        margin-bottom: 8px;
        border-radius: 3px;
        border: 1px solid #41B883;
      }
    }
  }
</style>
