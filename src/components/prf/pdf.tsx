import { defineComponent } from "vue";
import './style.less';

export default defineComponent({
  setup() {
    return () => {
      return <div class='pdf'>
        <iframe src="http://www.wudequan.top/YUYU.pdf" frameborder="0" style="width: 100%; height: 100%" ></iframe>
      </div>
    }
  }
})