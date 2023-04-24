<template>
  <div class="seach-icon">
    <el-input v-model="value" @input="handleInput"> </el-input>
    <el-scrollbar height="200px">
      <el-space wrap :size="9">
        <div v-for="(item, index) in iconsList" :key="index">
          <div class="icon" @click="onClick(item.name)">
            <icon-park :type="item.name" theme="filled"></icon-park>
          </div>
        </div>
      </el-space>
    </el-scrollbar>
  </div>
</template>
<script>
import icons from '@icon-park/vue-next/icons.json'
export default defineComponent({
  props: {},
  emits: ['onClick'],
  setup(props, { emit }) {
    const state = reactive({
      iconsList: [],
      value: '',
    })
    const handleInput = (val) => {
      state.iconsList = icons.slice(0, 100)
      state.iconsList = state.iconsList.filter((item) => {
        return item.name.toLowerCase().includes(val.toLowerCase())
      })
    }
    const onClick = (val) => {
      emit('onClick', val)
    }

    onBeforeMount(() => {
      state.iconsList = icons.slice(0, 100)
    })
    return {
      ...toRefs(state),
      handleInput,
      onClick,
    }
  },
})
</script>
<style lang="scss" scoped>
.seach-icon {
  .zs-input {
    margin-bottom: 15px;
  }
  .icon {
    background-color: white;
    border: solid 1px var(--zs-menu-border-color);
    border-radius: 4px;
    padding: 10px;

    &:hover {
      border: solid 1px var(--el-color-primary);
    }
  }
}
</style>
