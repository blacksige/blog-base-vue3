<template>
  <div class="login-container">
    <el-dialog
      title="输入口令"
      v-model="dialogShow"
      @close="() => (dialogShow = false)"
      :width="400"
    >
      <div class="contetn">
        <el-input v-model="password" placeholder=""></el-input>
        <div class="btn">
          <el-button @click="submit" type="primary">确认</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, nextTick } from "vue";
import { useStore } from "vuex";
import { login } from "../api/login";
export default defineComponent({
  setup() {
    let password = ref();
    const store = useStore();

    let dialogShow = ref<boolean>(false);
    watch(dialogShow, (newVal) => {
      if (!newVal) {
        password.value = "";
      }
    });
    // onMounted(() => {});
    const submit = () => {
      login({ kl: password.value })
        .then(async (result: any) => {
          console.log(result);
          if (result.code === 200) {
            store.dispatch("setMode", "0");
            await nextTick;
            window.sessionStorage.setItem("uid", result.data.uid);
            store.dispatch("setMode", "1");
          }
          dialogShow.value = false;
        })
        .catch((err: unknown) => {
          console.log(err);
        });
    };

    return {
      password,
      dialogShow,
      submit,
    };
  },
});
</script>

<style lang="less" scoped>
.login-container {
  /deep/ .el-dialog {
    background-color: rgba(16, 93, 171, 0.9);

    .el-dialog__header {
      .el-dialog__title {
        color: #eee;
      }
    }
  }
}
.contetn {
  text-align: center;
  padding: 0 20px;
}
.btn {
  margin-top: 20px;
}
</style>
