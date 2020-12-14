<template>
  <div class="viewsContainer">
    <el-tree
      class="filter-tree"
      :data="$store.state.compList"
      :props="defaultProps"
      default-expand-all
      :expand-on-click-node="false"
      node-key="i"
      highlight-current
      @node-click="onNodeClick"
      ref="tree"
    >
      <span class="custom-tree-node" slot-scope="{ data, node }">
        <span>{{ data.title }}{{ data.type | filterType }}</span>
        <span>
          <!-- 路由 -->
          <el-button
            type="text"
            @click="onAddPage(data, node)"
            v-if="data.type === 'to-router-view'"
            size="mini"
          >
            添加页面
          </el-button>
          <!-- 页面 -->
          <el-button
            type="text"
            @click="onEditPage(data, node)"
            v-if="data.type === 'to-router-page'"
            size="mini"
          >
            编辑
          </el-button>
          <el-button type="text" size="mini" @click="onDelete(data, node)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
    <DialogContainer
      v-model="dialogVisible"
      :form="data"
      :children="children"
      @success="onSuccess"
    />
  </div>
</template>
<script>
import { addRoutes } from "../../router";
import DialogContainer from "./commonComps/dialogContainer";
export default {
  data() {
    return {
      dialogVisible: false,
      defaultProps: {
        children: "children",
        label: "title",
      },
      children: [], //容器下面的孩子
      data: {}, //页面信息
      editData: null,
    };
  },
  components: {
    DialogContainer,
  },
  filters: {
    filterType(type) {
      if (type === "to-router-page") {
        return "(页面)";
      }
      if (type === "to-router-view") {
        return "(路由)";
      }
      return "(组件)";
    },
  },
  methods: {
    onSuccess({ children, data }) {
      this.dialogVisible = false;
      if (!this.editData) {
        //添加
        const { title, path, parentPath } = data;
        const page = {
          i: Date.now(),
          type: "to-router-page",
          title,
          path: parentPath + "/" + (path || ""),
          children: [], //装子组件
        };
        children.push(page);
      } else {
        //编辑页面
        const { path, parentPath, title } = data;
        Object.assign(this.editData, {
          title,
          path: parentPath + "/" + (path || ""),
        });
      }
      //更新路由
      addRoutes(this, this.$store.state.compList);
    },
    onAddPage(data, node) {
      //添加页面
      this.dialogVisible = true;
      this.editData = null;
      //获取父级path
      let parentPath = "";
      if (node.parent && node.parent.data) {
        parentPath = node.parent.data.path || "";
      }
      this.data = { parentPath, path: "", title: null };
      this.children = data.children || [];
    },
    onEditPage(data, node) {
      //编辑
      this.dialogVisible = true;
      this.editData = data;
      const { path: tempPath, title } = data;
      const end = tempPath.lastIndexOf("/");
      const parentPath = tempPath.slice(0, end);
      const path = tempPath.slice(end + 1);
      this.data = { path, parentPath, title };
      this.children = (node.parent.data.children || []).filter(({ path }) => {
        return path !== tempPath;
      });
    },
    onNodeClick({ path, type }) {
      //节点点击事件
      if (
        type === "to-router-page" &&
        this.$route.fullPath !== path &&
        this.$route.fullPath + "/" !== path &&
        this.$route.fullPath !== path + "/"
      ) {
        //页面点击
        this.$router.push({ path });
      }
    },
    onDelete(data) {
      const { type } = data;
      let mask = "此组件";
      if (type === "to-router-page") {
        mask = "此页面";
      } else if (type === "to-router-view") {
        mask = "此容器";
      }
      this.$alert("确定删除" + mask + "?", "删除操作", {
        confirmButtonText: "确定",
        callback: (action) => {
          if (action === "confirm") {
            this.$refs.tree.remove(data);
            if (
              data.type === "to-router-page" ||
              data.type === "to-router-view"
            ) {
              //更新路由
              addRoutes(this, this.$store.state.compList);
            }
          }
        },
      });
    },
  },
};
</script>
<style scoped lang="less">
.viewsContainer {
  padding: 5px 0;
  height: 100%;
  display: flex;
  .filter-tree {
    flex: 1;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
}
</style>