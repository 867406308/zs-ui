<template>
  <el-popover popper-class="my-popover" :show-arrow="false" width="300px" placement="bottom-start">
    <template #reference>
      <el-input v-model="data" style="width: 100%" placeholder="请选择图标"> </el-input>
    </template>
    <template #default>
      <ZsIcon @onClick="click"></ZsIcon>
    </template>
  </el-popover>
</template>
<script>
export default defineComponent({
  props: {
    data: {
      type: String,
      required: true,
      default: '',
    },
  },
  setup(props) {
    const state = reactive({
      data: props.data,
    })
    const click = (val) => {
      state.data = val
    }
    return {
      ...toRefs(state),
      click,
    }
  },
})
</script>
<style lang="scss" scoped>
.my-popover {
  height: 200px;
  width: 100%;
}
</style>
