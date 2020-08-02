<!--
 * @Author: chenhaiwang
 * @Date: 2020-07-15 22:46:27
 * @LastEditors: chenhaiwang
 * @LastEditTime: 2020-08-02 19:02:18
 * @FilePath: \vue_management\src\components\user\users.vue
 * @Description: 头部注释
--> 
<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col
          :span="3"
          :offset="12"
        >
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="dialogVisible = true"
          >添加用户</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="userList"
        style="width: 100%"
        border
        :header-cell-style="{background:'#eee',color:'#606266'}"
      >
        <el-table-column
          type="index"
          width="50"
          label="#"
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
        >
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
        >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
        >
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="角色"
        >
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change=userStateChange(scope.row)
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改用户信息 -->
            <el-button
              type="primary"
              plain
              icon="el-icon-edit"
              size="mini"
              @click="editUser(scope.row.id)"
            ></el-button>
            <!-- 删除用户 -->
            <el-button
              type="danger"
              plain
              icon="el-icon-delete"
              size="mini"
              @click="deleteUser(scope.row.id)"
            ></el-button>
            <!-- 分配角色 -->
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="bottom"
              :enterable="false"
            >
              <el-button
                type="warning"
                plain
                icon="el-icon-setting"
                size="mini"
                @click="setRoleDialog(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加用户框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="50%"
      center
      @close="addDialogClose"
    >
      <el-form
        :model="addForm"
        :rules="FormRules"
        ref="ruleFormRef"
        label-width="100px"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item
          label="手机"
          prop="mobile"
        >
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addUser"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑用户框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editUserVisible"
      width="50%"
      center
      @close="editDialogClose"
    >
      <el-form
        :model="editForm"
        :rules="FormRules"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item label="用户名">
          <el-input
            v-model="editForm.username"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="mobile"
        >
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editUserVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editUserInfo"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配角色框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="setRoleVisible"
      width="50%"
      center
      @close="setRoleClose"
    >
      <p>当前的用户：{{userInfo.username}}</p>
      <p>当前的角色：{{userInfo.role_name}}</p>
      <p>分配新角色：
        <el-select
          v-model="selectedRoleId"
          placeholder="请选择"
        >
          <el-option
            v-for="item in rolesList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </p>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="setRoleVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="setRoleOk"
        >确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    var checkMobile = (rule, value, callback) => {
      //校验手机号，号段主要有(不包括上网卡)：130~139、150~153，155~159，180~189、170~171、176~178。14号段为上网卡专属号段
      const resMobile = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
      if (resMobile.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的手机号码！"));
    };
    return {
      queryInfo: {
        query: "",
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 5,
      },
      userList: [],
      total: 0,
      // 添加用户弹框状态
      dialogVisible: false,
      // 编辑用户弹框状态
      editUserVisible: false,
      // 分配角色弹框状态
      setRoleVisible: false,
      // form表单绑定值
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      // 修改用户绑定值
      editForm: {},
      // 用户角色信息
      userInfo: {},
      // 用户角色列表
      rolesList: [],
      // 选中角色的ID
      selectedRoleId: "",
      // 用户表单验证
      FormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("users", {
        params: this.queryInfo,
      });
      if (!res.meta.status === 200) return this.$message.error("获取用户失败");
      this.userList = res.data.users;
      this.total = res.data.total;
      // console.log(res);
    },
    // 条数改变
    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize;
      this.getUserList();
    },
    // 监听页码值改变
    handleCurrentChange(newnum) {
      this.queryInfo.pagenum = newnum;
      this.getUserList();
    },
    // 改变用户状态
    async userStateChange(state) {
      // console.log(state);
      const { data: res } = await this.$http.put(
        `users/${state.id}/state/${state.mg_state}`
      );
      if (res.meta.status !== 200) {
        state.mg_state = !state.mg_state;
        return this.$message.error("更新用户状态失败！");
      }
      this.$message.success("更新用户状态成功！");
    },
    // 关闭表单，清空数据
    addDialogClose() {
      this.$refs.ruleFormRef.resetFields();
    },
    // 添加新用户
    addUser() {
      this.$refs.ruleFormRef.validate(async (valid) => {
        // console.log(valid);
        if (!valid) return;
        // 发送添加新用户请求
        const { data: res } = await this.$http.post("users", this.addForm);
        // console.log(res);
        if (res.meta.status !== 201) {
          return this.$message.error("添加新用户失败！");
        }
        this.$message.success("添加新用户成功！");
        this.dialogVisible = false;
        this.getUserList();
      });
    },
    // 编辑用户信息
    async editUser(id) {
      const { data: res } = await this.$http.get("users/" + id);
      // console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error("查询用户信息失败！");
      }
      this.editForm = res.data;
      this.editUserVisible = true;
    },
    // 重置验证规则
    editDialogClose() {
      this.$refs.editFormRef.resetFields();
    },
    // 提交修改用户信息
    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        // console.log(valid);
        if (!valid) return;
        const { data: res } = await this.$http.put(
          "users/" + this.editForm.id,
          { email: this.editForm.email, mobile: this.editForm.mobile }
        );
        if (res.meta.status != 200) {
          return this.$message.error("修改用户信息失败！");
        }
        this.editUserVisible = false;
        this.getUserList();
        this.$message.success("修改用户信息成功！");
      });
    },
    // 删除用户
    deleteUser(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$http.delete("users/" + id);
          if (res.meta.status != 200) return;
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getUserList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 分配角色弹框
    async setRoleDialog(userInfo) {
      this.userInfo = userInfo;
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status !== 200) {
        return this.$message.error("获取角色列表失败！");
      }
      this.rolesList = res.data;
      // console.log(this.rolesList);
      this.setRoleVisible = true;
    },
    // 分配角色
    async setRoleOk() {
      if (!this.selectedRoleId) {
        return this.$message.error("请选择新角色！");
      }
      const { data: res } = await this.$http.put(
        `users/${this.userInfo.id}/role`,
        {
          rid: this.selectedRoleId,
        }
      );
      this.$message.success("设置角色成功!");
      this.getUserList();
      this.setRoleVisible = false;
    },
    // 重置分配角色
    setRoleClose() {
      this.selectedRoleId = "";
      this.userInfo = "";
    },
  },
};
</script>
<style lang='less' scoped>
.el-row {
  margin-bottom: 20px;
}
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>