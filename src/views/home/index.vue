<template>
  <IframeDiv :w="screenW" :h="screenH">
    <div
      class="container"
      v-loading.fullscreen.lock="fullscreenLoading"
      element-loading-background="rgba(0, 0, 0, 0.7)"
    >
      <div class="container_left"></div>
      <div class="container_main">
        <ContainerMain
          ref="Main"
          @openFullScreen="openFullScreen"
        ></ContainerMain>
      </div>
      <Menu @itemClick="itemClick"></Menu>
    </div>
  </IframeDiv>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ContainerMain from "../../components/container.main";
import IframeDiv from "../../iframe/index.vue";
import Menu from "../../components/menu.vue";
const screenW = ref(window.innerWidth);
const screenH = ref(window.innerHeight);

const Main = ref();
const itemClick = (info: unknown) => {
  console.log(info);
  Main.value.backMap();
};

const fullscreenLoading = ref(false);
const openFullScreen = (flag: boolean) => {
  console.log(flag);
  fullscreenLoading.value = flag;
};
</script>

<style lang="less" scoped>
@backgroundColor: #0c0d28;
.container {
  width: 100%;
  height: 100%;
  display: flex;
  &_main {
    flex: 1;
    height: 100%;
    overflow: hidden;
  }
  &_left {
    width: 200px;
    border: 1px #4969c7 solid;
    background-color: #2b3557;
    height: 100%;
    resize: horizontal;
    overflow-x: auto;
  }
}
</style>
