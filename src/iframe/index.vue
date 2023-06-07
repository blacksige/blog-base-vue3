<template>
  <div class="screen-adapter">
    <div
      class="content-wrap"
      :style="style"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "ScreenAdapter",
  props: {
    w: {
      // 设计图尺寸宽
      type: Number,
      default: 1920,
    },
    h: {
      // 设计图尺寸高
      type: Number,
      default: 925,
    },
  },
  setup(props) {
    const style = reactive({
      width: `${props.w}px`,
      height: `${props.h}px`,
      transform: "scale(1) translate3d(-50%, -50%, 0)", // 默认不缩放，垂直水平居中
    });
    const onresize = reactive({});
    return {
      style,
      onresize,
    };
  },
  mounted() {
    this.setScale();
    this.onresize = this.debounce(() => this.setScale(), 100);
    window.addEventListener("resize", () => {
      (this as any).onresize();
    });
  },
  methods: {
    // 防抖
    debounce(fn: any, t: number) {
      const delay = t || 500;
      let timer: any;
      return () => {
        const args = arguments;
        if (timer) {
          clearTimeout(timer);
        }
        const context: any = this as any;
        timer = setTimeout(() => {
          timer = null;
          fn.apply(context, args);
        }, delay);
      };
    },
    // 获取缩放比例
    getScale() {
      console.log(this.w, this.h, "---------");
      const w = parseFloat((document.body.clientWidth / this.w).toFixed(5));
      const h = parseFloat((document.body.clientHeight / this.h).toFixed(5));
      return w < h ? w : h;
    },
    // 设置缩放比例
    setScale() {
      this.style.transform = `scale(${this.getScale()}) translate3d(-50%, -50%, 0)`;
    },
  },
  beforeUnmount() {
    window.removeEventListener("resize", (this as any).onresize);
  },
});
</script>

<style lang="less" scoped>
.screen-adapter {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #0c0d28;
  // background-image: linear-gradient(to bottom, #0a084b, #010228);

  .content-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: 0 0;
    background-color: #0c0d28;
  }
}
</style>
