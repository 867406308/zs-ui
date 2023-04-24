<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="!form.sysMenuId ? '新增' : '修改'"
    @close="close"
    :close-on-click-modal="false"
  >
    <el-form :model="form" ref="formRef" label-width="auto" :rules="rules">
      <el-row>
        <el-col>
          <el-form-item label="菜单类型">
            <el-radio-group v-model="form.type">
              <el-radio :label="1">目录</el-radio>
              <el-radio :label="2">菜单</el-radio>
              <el-radio :label="3">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="父级菜单" prop="pid">
            <el-tree-select
              v-model="form.pid"
              :data="treeData"
              check-strictly
              :props="{
                label: 'title',
                value: 'sysMenuId',
                children: 'children',
              }"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="菜单名称" prop="title">
            <el-input v-model="form.title" placeholder="请输入菜单名称"></el-input> </el-form-item
        ></el-col>
      </el-row>

      <el-row>
        <el-col v-if="form.type === 1 || form.type === 2">
          <el-form-item label="路由名" prop="name">
            <el-input v-model="form.name" placeholder="请输入路由名，如: sys/menu"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col v-if="form.type === 1 || form.type === 2">
          <el-form-item label="路由路径" prop="path">
            <el-input v-model="form.path" placeholder="请输入路由地址，如: /sys/menu"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col v-if="form.type === 2">
          <el-form-item label="组件路径" prop="component">
            <el-input v-model="form.component" placeholder="前端组件路径,如: @/views/sys/role/index"> </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col v-if="form.type === 1 || form.type === 2">
          <el-form-item label="图标" prop="icon">
            <el-popover
              ref="popoverRef"
              popper-class="my-popover"
              :show-arrow="false"
              width="400px"
              placement="top-start"
              trigger="click"
            >
              <template #reference>
                <el-input v-model="form.icon" style="width: 100%" placeholder="请选择图标"> </el-input>
              </template>
              <template #default>
                <ZsIcon @onClick="click"></ZsIcon>
              </template>
            </el-popover>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col v-if="form.type === 3">
          <el-form-item label="权限" prop="permissions">
            <el-input
              v-model="form.permissions"
              placeholder="多个用逗号隔开，如: sys:menu:save,sys:menu:list"
            ></el-input
          ></el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit(formRef)">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { getList, getById, save, edit } from '@/api/sys/menu';
export default defineComponent({
  emits: ['query-data'],
  setup(props, { emit }) {
    const state = reactive({
      dialogFormVisible: false,
      formRef: null,
      popoverRef: null,
      form: {
        sysMenuId: '',
        type: 1,
        name: '',
        path: '',
        title: '',
        component: '',
        icon: '',
        permissions: '',
      },
      treeData: [],
      rules: {
        pid: [{ required: true, message: '请选择父级菜单', trigger: 'change' }],
        name: [{ required: true, message: '请输入路由名', trigger: 'blur' }],
        path: [{ required: true, message: '请输入路由路径', trigger: 'blur' }],
        title: [{ required: true, message: '请输入路由名称', trigger: 'blur' }],
        component: [{ required: true, message: '请输入vue组件路劲', trigger: 'blur' }],
        icon: [{ required: true, message: '请选着图标', trigger: 'change' }],
        permissions: [{ required: true, message: '请输入权限字符', trigger: 'blur' }],
      },
    });
    const init = async () => {
      state.dialogFormVisible = true;
      nextTick(() => {
        getTree();
        if (state.form.sysMenuId) {
          console.log('3aa', state);
          getInfoById();
        }
      });
    };
    const click = (val) => {
      state.form.icon = val;
      state['popoverRef'].hide();
    };
    const getInfoById = async () => {
      const data = await getById(state.form.sysMenuId);
      state.form = {
        ...data?.data,
      };
    };
    const getTree = async () => {
      const data = await getList();
      state.treeData = [
        {
          title: '主类目',
          sysMenuId: 0,
          children: data?.data,
        },
      ];
    };
    const close = () => {
      state.formRef.resetFields();
      state.dialogFormVisible = false;
      state.form = {
        sysMenuId: '',
        type: 1,
        name: '',
        path: '',
        title: '',
        component: '',
        icon: '',
        permissions: '',
      };
    };
    const submit = (formRef) => {
      if (!formRef) return;
      state['formRef'].validate(async (valid, fields) => {
        if (valid) {
          if (!state.form.sysMenuId) {
            console.log('保存!');
            await save(state.form);
          } else {
            console.log('修改!');
            await edit(state.form);
          }
          state.dialogFormVisible = false;
          emit('query-data');
        } else {
          console.log('error submit!', fields);
        }
      });
    };
    return {
      ...toRefs(state),
      init,
      getTree,
      getInfoById,
      close,
      submit,
      click,
    };
  },
});
</script>

<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
