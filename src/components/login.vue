<template>
  <el-dialog title="输入口令" v-model="dialogShow">
    <div class="login-container">
        <el-input v-model="password" placeholder=""></el-input>
        <div class="btn"><el-button @click="submit" type="primary">确认</el-button></div>
      </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { login } from "../api/login";
export default defineComponent({
  props: ["loginShow"],
  setup(props) {
    const password = ref();

    let dialogShow = ref(false);
    watch(props.loginShow, (newvalue) => {
      dialogShow.value = newvalue.value;
    });

    // onMounted(() => {});

    const submit = () => {
      login({ kl: password.value })
        .then((result: unknown) => {
          console.log(result);
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
  text-align: center;
  padding: 0 20px;
}
.btn {
  margin-top: 20px;
}
</style>
