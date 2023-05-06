<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const formData = reactive({
      number: "",
      password: "",
    });
    return {
      formData,
    };
  },
});
</script>

<style lang="less" scoped></style>
