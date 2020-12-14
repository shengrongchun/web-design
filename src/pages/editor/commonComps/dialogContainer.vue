<template>
  <div @mousemove.stop>
    <el-dialog
      title="添加页面"
      :visible.sync="dialogVisible"
      width="60%"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      @close="onClose"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="页面名称" prop="title">
          <el-input
            v-model="form.title"
            placeholder="请输入页面名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="已占名称" v-if="children.length">
          <ul class="pathUl">
            <li v-for="(page, idx) in children" :key="idx">
              {{ page.title }}
            </li>
          </ul>
        </el-form-item>
        <el-form-item label="页面路径" prop="path">
          <el-input v-model="form.path" placeholder="请输入页面路径">
            <template slot="prepend">{{ form.parentPath + "/" }}</template>
          </el-input>
        </el-form-item>
        <el-form-item label="已占路径" v-if="children.length">
          <ul class="pathUl">
            <li v-for="(page, idx) in children" :key="idx">
              {{ page.title }}：{{ page.path }}
            </li>
          </ul>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onConfirmAddPage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    form: {
      type: Object,
      default() {
        return {
          title: null,
          path: "",
          parentPath: "",
        };
      },
    },
    children: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  watch: {
    value(val) {
      this.dialogVisible = val;
    },
  },
  data() {
    return {
      dialogVisible: this.value,
    };
  },
  created() {
    const validatePagePath = (rule, value, callback) => {
      let obj = null;
      if (this.children && this.children.length) {
        obj = this.children.find((item) => {
          return item.path === this.form.parentPath + "/" + value;
        });
      }
      //
      if (obj) {
        callback(new Error("路径重复"));
      } else {
        callback();
      }
    };
    const validatePageName = (rule, value, callback) => {
      let obj = null;
      if (this.children && this.children.length) {
        obj = this.children.find((item) => {
          return item.title === value;
        });
      }
      //
      if (obj) {
        callback(new Error("名称重复"));
      } else {
        callback();
      }
    };
    this.rules = {
      title: [
        { required: true, message: "请输入页面名称", trigger: "blur" },
        { validator: validatePageName, trigger: "blur" },
      ],
      path: [{ validator: validatePagePath, trigger: "blur" }],
    };
  },
  methods: {
    onConfirmAddPage() {
      //确认添加页面
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit("success", {
            data: this.form,
            children: this.children,
          });
        }
      });
    },
    onClose() {
      this.$emit("input", false);
    },
  },
};
</script>
<style scoped lang="less">
.pathUl {
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    margin-right: 10px;
    background-color: #ecf5ff;
    display: inline-block;
    height: 26px;
    padding: 0 10px;
    line-height: 24px;
    font-size: 12px;
    color: #409eff;
    border: 1px solid #d9ecff;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
  }
}
</style>