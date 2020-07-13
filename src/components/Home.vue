<!--
 * @Author: chenhaiwang
 * @Date: 2020-07-13 22:15:51
 * @LastEditors: chenhaiwang
 * @LastEditTime: 2020-07-13 23:11:02
 * @FilePath: \vue_management\src\components\home.vue
 * @Description: 头部注释
--> 
<template>
  <div class=''>
    <el-button
      type="info"
      @click="logout"
    >退出</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    }
  }
};
</script>
<style lang='less' scoped>
</style>