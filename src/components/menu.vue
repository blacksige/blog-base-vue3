<template>
  <el-dropdown
    class="btn_style"
    trigger="click"
  >
    <el-button type="primary">
      <el-icon><Menu /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(item, key) in options"
          :key="key"
          @click="selectItem(item)"
        >
          {{ item.content }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { reactive, defineEmits } from "vue";
const emit = defineEmits(["itemClick"]);
const options = reactive([
  {
    content: "返回首页",
    value: 1,
  },
  {
    content: "个人模式",
    value: 2,
  },
  {
    content: "操作三",
    value: 3,
  },
]);
const selectItem = (info: any) => {
  console.log(info);
  emit("itemClick", info);
};
</script>

<style lang="less">
.btn_style {
  position: absolute;
  right: 20px;
  bottom: 20px;
  z-index: 99;
  .el-dropdown--default {
    button {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>
