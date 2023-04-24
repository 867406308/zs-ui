<template>
  <div>
    <icon-park
      v-for="(item, index) in icons"
      :key="index"
      :type="item.name"
      theme="filled"
    ></icon-park>
  </div>
</template>
<script>
// import icons from '@icon-park/vue-next/icons.json'
export default defineComponent({
  props: {
    icons: {
      type: Array,
    },
  },
  setup(props) {
    console.log('11', props)
    const state = reactive({
      // iconsList: [],
    })
    onMounted(() => {
      // state.iconsList = icons
    })

    return {
      ...toRefs(state),
    }
  },
})
</script>
