<!--
 * @Author: chenhaiwang
 * @Date: 2020-08-02 10:53:58
 * @LastEditors: chenhaiwang
 * @LastEditTime: 2020-08-02 21:13:24
 * @FilePath: \vue_management\src\components\roles\roles.vue
 * @Description: 头部注释
--> 
<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="addRoleVisible = true"
        class="addRoleButton"
      >添加角色
      </el-button>
      <!-- 用户角色列表 -->
      <el-table
        :data="roleList"
        style="width: 100%"
        border
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :gutter="20"
              v-for="(item1, index1) in scope.row.children"
              :key="item1.id"
              :class="['bbottom',index1 === 0 ? 'btop' : '','vcenter']"
            >
              <!-- 一级菜单 -->
              <el-col :span="3">
                <el-tag
                  closable
                  @close="deleteRights( scope.row,item1.id)"
                >{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级菜单和三级菜单 -->
              <el-col :span="21">
                <el-row
                  :gutter="20"
                  v-for="(item2, index2) in item1.children"
                  :key="item2.id"
                  :class="[index2 === 0 ? '' : 'btop','vcenter']"
                >
                  <el-col :span="4">
                    <el-tag
                      type="success"
                      closable
                      @close="deleteRights( scope.row,item2.id)"
                    >{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="20">
                    <el-tag
                      closable
                      type="danger"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      @close="deleteRights( scope.row,item3.id)"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column
          label="序号"
          type="index"
          width="60"
        >
        </el-table-column>
        <el-table-column
          label="角色名称"
          prop="roleName"
        >
        </el-table-column>
        <el-table-column
          label="角色描述"
          prop="roleDesc"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑角色信息 -->
            <el-button
              type="primary"
              plain
              icon="el-icon-edit"
              size="mini"
              @click="editRoleDialog(scope.row)"
            ></el-button>
            <!-- 删除角色 -->
            <el-button
              type="danger"
              plain
              icon="el-icon-delete"
              size="mini"
              @click="deleteRole(scope.row)"
            ></el-button>
            <!-- 分配权限 -->
            <el-tooltip
              effect="dark"
              content="分配权限"
              placement="bottom"
              :enterable="false"
            >
              <el-button
                type="warning"
                plain
                icon="el-icon-setting"
                size="mini"
                @click="setRight(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--添加角色 弹框区域 -->
    <el-dialog
      title="添加角色"
      :visible.sync="addRoleVisible"
      width="50%"
      center
      @close="addRoleClose"
    >
      <el-form
        :model="addRole"
        :rules="roleRules"
        ref="addRoleRef"
        label-width="100px"
      >
        <el-form-item
          label="角色名称"
          prop="roleName"
        >
          <el-input v-model="addRole.roleName"></el-input>
        </el-form-item>
        <el-form-item
          label="角色描述"
          prop="roleDesc"
        >
          <el-input v-model="addRole.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addRoleVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addRoleOk"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!--分配权限区域 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightVisible"
      width="50%"
      center
      @close="setRightClose"
    >
      <el-tree
        :data="rightsList"
        :props="treeProps"
        default-expand-all
        node-key="id"
        show-checkbox
        :default-checked-keys="defKeys"
        ref="treeRef"
      ></el-tree>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="setRightVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="setRightOk"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑角色弹框 -->
    <el-dialog
      title="编辑角色"
      :visible.sync="editRoleVisible"
      width="50%"
      center
    >
      <el-form
        :model="editRoleList"
        :rules="roleRules"
        ref="editRoleRef"
        label-width="100px"
      >
        <el-form-item
          label="角色名称"
          prop="roleName"
        >
          <el-input v-model="editRoleList.roleName"></el-input>
        </el-form-item>
        <el-form-item
          label="角色描述"
          prop="roleDesc"
        >
          <el-input v-model="editRoleList.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editRoleVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editRoleOk"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 添加角色弹框
      addRoleVisible: false,
      // 分配权限弹框
      setRightVisible: false,
      //  编辑角色弹框
      editRoleVisible: false,
      roleList: [],
      rightsList: [],
      editRoleList: [],
      // 默认选中的权限
      defKeys: [],
      // 角色的id
      roleId: "",
      addRole: {
        roleName: "",
        roleDesc: "",
      },
      treeProps: {
        children: "children",
        label: "authName",
      },
      roleRules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    // 获取用户角色列表
    async getRoleList() {
      const { data: res } = await this.$http.get("roles");
      // console.log(res);
      this.roleList = res.data;
    },
    // 添加角色重置
    addRoleClose() {
      this.$refs.addRoleRef.resetFields();
    },
    // 添加角色效验和添加
    addRoleOk() {
      this.$refs.addRoleRef.validate(async (valid) => {
        // console.log(valid);
        if (!valid) return;
        const { data: res } = await this.$http.post("roles", this.addRole);
        if (res.meta.status !== 201) {
          return this.$message.error("添加用户失败！");
        }
        this.$message.success("添加用户成功！");
        this.getRoleList();
        this.addRoleVisible = false;
      });
    },
    // 删除权限
    deleteRights(role, rightId) {
      this.$confirm("此操作将永久删除该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$http.delete(
            `roles/${role.id}/rights/${rightId}`
          );
          // console.log(res);
          if (res.meta.status !== 200) {
            return this.$message.error("删除失败！");
          }
          // 表格不会合起来
          role.children = res.data;
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 编辑角色弹框
    editRoleDialog(role) {
      this.editRoleList = role;
      this.editRoleVisible = true;
    },
    // 编辑角色确定
    editRoleOk() {
      this.$refs.editRoleRef.validate(async (valid) => {
        const { data: res } = await this.$http.put(
          "roles/" + this.editRoleList.id,
          this.editRoleList
        );
        if (res.meta.status !== 200) {
          return this.$message.error("角色修改失败！");
        }
        this.$message.success("角色修改成功！");
        this.getRoleList();
        this.editRoleVisible = false;
      });
    },
    // 删除角色
    deleteRole(role) {
      this.$confirm("此操作将永久删除该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$http.delete("roles/" + role.id);
          // console.log(res);
          if (res.meta.status !== 200) {
            return this.$message.error("删除失败！");
          }
          this.getRoleList();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 分配权限
    async setRight(role) {
      this.roleId = role.id;
      const { data: res } = await this.$http.get("rights/tree");
      // console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error("获取权限列表失败！");
      }
      this.rightsList = res.data;
      // console.log(role);
      this.getLeafKeys(role, this.defKeys);
      this.setRightVisible = true;
    },
    // 通过递归的方式获取角色下的三级权限的id，并保存到defKeys数组中
    getLeafKeys(node, arr) {
      // 如果当前节点不含有childrean节点，则说明是三级节点
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach((item) => {
        this.getLeafKeys(item, arr);
      });
    },
    // 解决关闭弹框后数组不清空的bug
    setRightClose() {
      this.defKeys = [];
    },
    async setRightOk() {
      const keys = [
        // getCheckedKeys()  getHalfCheckedKeys() 获取全选和半选的id的方法
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ];
      const idStr = keys.join(",");
      // console.log(idStr);
      const { data: res } = await this.$http.post(
        `roles/${this.roleId}/rights`,
        { rids: idStr }
      );
      // console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error("分配权限失败！");
      }
      this.$message.success("分配权限成功！");
      this.getRoleList();
      this.setRightVisible = false;
    },
  },
};
</script>
<style lang='less' scoped>
.addRoleButton {
  margin-bottom: 20px;
}
.btop {
  border-top: 1px solid #eee;
}
.bbottom {
  border-bottom: 1px solid #eee;
}
.el-tag {
  margin: 8px;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>