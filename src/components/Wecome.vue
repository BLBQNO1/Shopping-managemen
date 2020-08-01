<!--
 * @Author: chenhaiwang
 * @Date: 2020-07-15 21:43:12
 * @LastEditors: chenhaiwang
 * @LastEditTime: 2020-07-16 23:55:09
 * @FilePath: \vue_management\src\components\Wecome.vue
 * @Description: 头部注释
--> 
<template>
  <div class="wecome">欢迎 靓仔！</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
<style lang='less' scoped>
.wecome {
  position: absolute;
  top: 50%;
  left: 50%;
  // transform: translate(-50%, -50%);
  font-size: 38px;
  background: -webkit-linear-gradient(
    left,
    #ff0000,
    #ffff00 25%,
    #ff0000 50%,
    #ffff00 75%,
    #ff0000
  );
  color: transparent;
  -webkit-background-clip: text;
  background-size: 200% 100%;
  animation: masked-animation 1s infinite linear;
}
@-webkit-keyframes masked-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>