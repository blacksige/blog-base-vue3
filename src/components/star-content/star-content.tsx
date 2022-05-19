import { defineComponent } from "vue";
import './style.less'
export default defineComponent({
  props: {
    itemId: {
      type: Number,
      default: 0
    }
  },
  created() {
    console.log(this.itemId);
  },
  setup(props) {
    return () => {
      const dialogList = [
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
      ]
      const liList = [1, 2, 3, 4, 5, 6]
      return <div>
        <div class="dialog-info">
          <div class="img-style">
            <el-image
              style="width: 120px; height: 150px"
              src={dialogList[props.itemId].url}
              fit="fill"
            ></el-image>
          </div>
          <div class="tips-style">
            <ul>
              <li class="name">{dialogList[props.itemId].name}</li>
              <li class="tip">简介：{dialogList[props.itemId].tip}</li>
              <li></li>
            </ul>
          </div>
        </div>
        <div class="dialog-content">
          <ul>
            {liList.map(item => {
              return <li>
                <el-image
                  style="width: 100%; height: 120px"
                  src={dialogList[props.itemId].url}
                ></el-image>
              </li>
            })}
          </ul>
        </div >
      </div >
    }
  }
})