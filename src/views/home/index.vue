<template>
  <IframeDiv :w="screenW" :h="screenH">
    <div class="container" >
        <div class="container_left">

        </div>
        <div class="container_main">
          <ContainerMain></ContainerMain>
        </div>
    </div>
  </IframeDiv>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ContainerMain from "../../components/container.main"
import IframeDiv from "../../iframe/index.vue"
const screenW = ref(window.innerWidth);
const screenH = ref(window.innerHeight);
</script>

<style lang="less" scoped>
@backgroundColor: #0C0D28;
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
      width: 300px;
      border: 1px #4969C7 solid;
      background-color: #2B3557;
      height: 100%;
      resize: horizontal;
      overflow-x: auto;
    }
}
</style>