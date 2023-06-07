<template>
  <IframeDiv
    :w="screenW"
    :h="screenH"
  >
    <div
      class="container"
      v-loading.fullscreen.lock="fullscreenLoading"
      element-loading-background="rgba(0, 0, 0, 0.7)"
    >
      <div class="container_left">
        <ContainerLeft
          ref="Left"
          @setCityInfo="setCityInfo"
        />
      </div>
      <div class="container_main">
        <ContainerMain
          ref="main"
          :mode="mode"
          :is-show-pie="true"
          :user-info="userInfo"
          @openFullScreen="openFullScreen"
        />
      </div>
      <Menu @itemClick="itemClick" />
      <Login ref="login" />
    </div>
  </IframeDiv>
</template>

<script lang="ts" setup>
import { ref, computed, watch, reactive } from "vue";
import { useStore } from "vuex";
import ContainerMain from "../../components/container.main";
import ContainerLeft from "../../components/container-left";
import IframeDiv from "../../iframe/index.vue";
import Menu from "../../components/menu.vue";
import Login from "../../components/login.vue";
import { getUserInfo } from "../../api/getUserInfo";
import { diyType } from "../../utils/type";
const screenW = ref(window.innerWidth);
const screenH = ref(window.innerHeight);

const main = ref();
const login = ref();

const itemClick = (info: any) => {
  console.log(info);
  if (info.value === 1) {
    main.value.backMap();
  } else if (info.value === 2) {
    login.value.dialogShow = true;
  }
};

const fullscreenLoading = ref(false);
const openFullScreen = (flag: boolean) => {
  console.log(flag);
  fullscreenLoading.value = flag;
};

const setCityInfo = (name: string) => {
  console.log(name);
  main.value.setectCity(name);
};

let userInfo = reactive<diyType>({});
// let testInfo = reactive<Array<any>>([]);
const getUserInfoHandle = () => {
  getUserInfo({
    uid: window.sessionStorage.getItem("uid"),
  })
    .then((result: any) => {
      // Object.keys(result.data).forEach((key) => {
      //   userInfo[key] = result.data[key];
      // });
      Object.assign(userInfo, result.data)
      setTimeout(() => {
        main.value.getProps();
      }, 1000);
    })
    .catch((err: unknown) => {
      console.log(err);
    });
};
const store = useStore();
const mode = computed(() => store.getters.getMode);
watch(mode, (state: string) => {
  if (state === "1") {
    getUserInfoHandle();
  }
});
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
