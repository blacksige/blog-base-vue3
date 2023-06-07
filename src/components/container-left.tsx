import { defineComponent } from "vue";
import "../components/style/left.less";
import { findCityInfo } from "../utils/tool";
import dist from "../utils/dist";

// console.log(findCityInfo('南宁市'));

export default defineComponent({
  setup(props: any, { emit }: any) {
    console.log(props);

    let citys: Array<string> = [];
    citys = Object.keys(dist);

    const onChange = (info: any) => {
      console.log(findCityInfo(info));

      emit("setCityInfo", info);
    };

    return {
      citys,
      onChange,
    };
  },
  render() {
    return (
      <div class="left-container">
        <p style={{ color: "#eee" }}>热门城市</p>
        <div class="city-container">
          {this.citys.map((item) => {
            return (
              <el-tag class="ml-2" onClick={() => this.onChange(item)}>
                {item}
              </el-tag>
            );
          })}
        </div>
      </div>
    );
  },
});
