<template>
  <div>
    <el-container>
      <el-header height="30px">
        <el-button type="primary" @click="handleAddOrEdit">新增</el-button>
      </el-header>
      <el-main>
        <el-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all>
          <el-table-column prop="title" label="菜单名称" />
          <el-table-column prop="name" label="路由名称" />
          <el-table-column prop="path" label="路径" />
          <el-table-column prop="component" label="路由" />
          <el-table-column prop="icon" label="图标">
            <template #default="scope">
              <IconPark :type="scope.row.icon"></IconPark>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="{ row }">
              <el-button link type="primary" size="small" @click="handleAddOrEdit(row)">编辑</el-button>
              <el-button link type="primary" size="small" @click="handleDetail">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <menu-add-or-edit ref="addEditRef" :key="+new Date()" @query-data="queryData" />
  </div>
</template>
<script>
import { getList } from '@/api/sys/menu';
import MenuAddOrEdit from './components/menu-add-or-edit.vue';
import { IconPark } from '@icon-park/vue-next/es/all';
export default defineComponent({
  components: { MenuAddOrEdit, IconPark },
  setup() {
    const state = reactive({
      tableData: [],
      addEditRef: null,
    });
    const queryData = async () => {
      console.log('菜单111');
      const data = await getList();
      state.tableData = data?.data;
      console.log('新的', state.tableData);
    };
    const handleAddOrEdit = (row) => {
      state.addEditRef.form.sysMenuId = row.sysMenuId;
      state.addEditRef.init();
    };
    const handleDetail = () => {};
    onMounted(() => {
      console.log('菜单');
      queryData();
    });
    return {
      ...toRefs(state),
      queryData,
      handleAddOrEdit,
      handleDetail,
    };
  },
});
</script>
