<!--
 * @Author: chenhaiwang
 * @Date: 2020-07-13 22:15:51
 * @LastEditors: chenhaiwang
 * @LastEditTime: 2020-07-16 23:09:36
 * @FilePath: \vue_management\src\components\home.vue
 * @Description: 头部注释
--> 
<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <span>电商后台管理系统</span>
      <div>
        <img src="../assets/logo.png">
        <el-button @click="logout">朕退了</el-button>
      </div>

    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px':'200px'">
        <div
          class="toggle-button"
          @click="toggleCollapse"
        >|||</div>
        <!-- 侧边栏菜单 -->
        <el-menu
          background-color="#666"
          text-color="#fff"
          active-text-color="#ff7a19"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item of menulist"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subitem.path"
              v-for="subitem of item.children"
              @click="saveNavState('/' + subitem.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subitem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 页面内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 是否折叠
      isCollapse: false,
      // 菜单列表
      menulist: [],
      // 被激活的路径
      activePath: "",
      iconObj: {
        "125": "el-icon-menu",
        "103": "el-icon-key",
        "101": "el-icon-s-cooperation",
        "102": "el-icon-s-order",
        "145": "el-icon-data-line"
      }
    };
  },
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },

    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      // console.log(res);
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.menulist = res.data;
      // console.log(this.menulist);
    },
    // 菜单展开与折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    }
  }
};
</script>
<style lang='less' scoped>
.home-container {
  height: 100vh;
}
.el-header {
  background-color: #000;
  display: flex;
  justify-content: space-between;
  color: #fff;
  span {
    line-height: 60px;
  }
  > div {
    display: flex;
    align-items: center;
    img {
      width: 50px;
      border-radius: 50%;
      margin-right: 20px;
    }
  }
}
.el-aside {
  background-color: #666;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eee;
}
.toggle-button {
  background-color: #ff7a19;
  color: #fff;
  text-align: center;
  line-height: 24px;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 5px;
  cursor: pointer;
}
</style>