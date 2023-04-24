<template>
  <div>
    <icon-park
      v-for="(item, index) in iconsList"
      :key="index"
      :type="item.name"
      theme="filled"
    ></icon-park>
    <div v-for="(item, index) in iconsList" :key="index">
      {{ item.name }}
      <icon-park :type="item.name"></icon-park>
      <IconPark :type="item.name"></IconPark>
    </div>
    <CustomIcon :icons="iconsList" />
    <el-pagination
      background
      :current-page="page"
      :layout="layout"
      :page-size="size"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>
<script>
import icons from '@icon-park/vue-next/icons.json'
export default defineComponent({
  setup() {
    const state = reactive({
      iconsList: [],
      page: 1,
      size: 20,
      total: 0,
      layout: 'total,prev, pager, next',
    })
    const pageData = () => {
      state.total = icons.length
      state.iconsList = icons.slice((state.page - 1) * state.size, state.page * state.size)
      // console.log(state.iconsList)
    }
    const handleCurrentChange = (val) => {
      state.page = val
      pageData()
    }
    const handleSizeChange = () => {
      state.size = val
      pageData()
    }
    onMounted(() => {
      pageData()
    })
    return {
      ...toRefs(state),
      pageData,
      handleCurrentChange,
      handleSizeChange,
    }
  },
})
</script>
