<template>
  <div class="about">
    <pdf msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Pdf from '@/components/pdf.vue' // @ is an alias to /src

@Options({
  components: {
    Pdf
  }
})
export default class About extends Vue {}
</script>

<style lang="less" scoped>
.about{
  width: 100%;
  height: 100%;
}
</style>
