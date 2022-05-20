import { defineComponent } from "vue";
import './style.less';

export default defineComponent({
  setup() {
    return () => {
      return <div class='pdf'>
        <iframe src="https://www.kwgg2020.com/" frameborder="0" style="width: 100%; height: 100%" ></iframe>
      </div>
    }
  }
})