<template>
  <div class="pdf">
    <iframe src="http://www.wudequan.top/YUYU.pdf" frameborder="0" style="width: 100%; height: 100%" type="application/pdf"></iframe>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    msg: String
  }
})
export default class Pdf extends Vue {
  msg!: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.pdf{
  width: 80%;
  height: 100%;
  margin: 0 auto;
}
</style>
