<template>
  <component :is="'LayoutVertical'" />
</template>
<script>
import LayoutHorizontal from './LayoutHorizontal/index.vue';
import LayoutVertical from './LayoutVertical/index.vue';
export default defineComponent({
  components: { LayoutHorizontal, LayoutVertical },
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.main-content {
  width: 100%;
}
</style>
