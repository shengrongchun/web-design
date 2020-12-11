<template>
  <div class="viewsContainer">
    <el-tree class="filter-tree"
             :data="$store.state.compList"
             :props="defaultProps"
             default-expand-all
             :expand-on-click-node="false"
             node-key="i"
             highlight-current
             @node-click="onNodeClick"
             :filter-node-method="onFilterNode"
             ref="tree">
      <span class="custom-tree-node"
            slot-scope="{ data, node }">
        <span>{{ data.type === "to-router-page" ? "页面/" : ""
          }}{{ data.title }}</span>
        <span>
          <el-button type="text"
                     @click="onAddPage(data, node)"
                     v-if="data.type === 'to-router-view'"
                     size="mini">
            添加
          </el-button>
          <el-button type="text"
                     @click="onAddPage(data, node)"
                     v-if="data.type === 'to-router-page'"
                     size="mini">
            编辑
          </el-button>
          <el-button type="text"
                     size="mini"> 删除 </el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog title="添加页面"
               :visible.sync="dialogVisible"
               width="40%">
      <el-form ref="form"
               :model="form"
               :rules="rules"
               label-width="80px">
        <el-form-item label="页面名称"
                      prop="title">
          <el-input v-model="form.title"
                    placeholder="请输入页面名称"></el-input>
        </el-form-item>
        <el-form-item label="页面路径"
                      prop="path">
          <el-input v-model="form.path"
                    placeholder="请输入页面路径">
            <template slot="prepend">{{ parentPath + "/" }}</template>
          </el-input>
        </el-form-item>
        <el-form-item label="已占路径"
                      v-if="tempData.children.length">
          <ul class="pathUl">
            <li v-for="(page, idx) in tempData.children"
                :key="idx">
              {{ page.title }}：{{ page.path }}
            </li>
          </ul>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="onConfirmAddPage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { addRoutes } from "../../router";
export default {
  data() {
    return {
      dialogVisible: false,
      tempData: {
        children: [],
      },
      parentPath: "",
      form: {
        title: null,
        path: null,
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  created() {
    const validatePageName = (rule, value, callback) => {
      if (value.indexOf('/') > -1) {
        callback(new Error("输入路径不能包含 /"))
        return
      }
      let obj = null;
      const { children, path } = this.tempData;
      if (children && children.length) {
        obj = children.find((item) => {
          return item.path === path + value;
        });
      }
      //
      if (obj) {
        callback(new Error("路径重复"))
      } else {
        callback();
      }
    };
    this.rules = {
      title: [{ required: true, message: "请输入页面名称", trigger: "blur" }],
      path: [
        // { required: true, message: '请输入页面路径', trigger: 'blur' },
        { validator: validatePageName, trigger: "blur" },
      ],
    };
  },
  mounted() {
    this.$refs.tree.filter();
  },
  methods: {
    onConfirmAddPage() {
      //确认添加页面
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          this.addPageSuccess();
        }
      });
    },
    addPageSuccess() {
      const { title, path } = this.form;
      const page = {
        type: "to-router-page",
        title,
        path: this.parentPath + "/" + (path || ""),
        children: [], //装子组件
      };
      this.tempData.children.push(page);
      //添加路由
      addRoutes(this, this.$store.state.compList);
    },
    onAddPage(data, node) {
      this.dialogVisible = true;
      this.tempData = data;
      this.parentPath = "";
      if (node.parent && node.parent.label) {
        this.parentPath = node.parent.data.path;
      }
    },
    onNodeClick({ path, type }) {
      //节点点击事件
      if (type === "to-router-page" && this.$route.fullPath !== path) {
        //页面点击
        this.$router.push({ path });
      }
    },
    onFilterNode(value, { type }) {
      //过滤节点
      return type === "to-router-view" || type === "to-router-page";
    },
  },
};
</script>
<style scoped lang="less">
.viewsContainer {
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .pathUl {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
</style>