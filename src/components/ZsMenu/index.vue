<template>
  <div class="menu-bar">
    <ZsLogo />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        default-active="2"
        :collapse="collapse"
        :router="true"
        background-color="#fff"
        text-color="#282c34"
        mode="vertical"
        :collapse-transition="false"
        :style="{ width: !collapse ? '200px' : '64px' }"
      >
        <SubMenu v-for="(item, index) in menuList" :key="index" :menu="item" :basePath="item.path" :collapse="collapse"></SubMenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { useRoutersStore } from '@/store/modules/router'
import { useSettingStore } from '@/store/modules/setting'
import { storeToRefs } from 'pinia'
export default defineComponent({
  setup() {
    // 路由状态
    const routersStore = useRoutersStore()
    // 设置状态
    const settingStore = useSettingStore()
    const { collapse } = storeToRefs(settingStore)
    const state = reactive({
      menuList: [],
    })
    onMounted(() => {
      state.menuList = routersStore.menuList
    })

    return {
      ...toRefs(state),
      collapse,
    }
  },
})
</script>
<style lang="scss" scoped>
.menu-bar {
  height: 100%;
  :deep() {
    .zs-scrollbar {
      height: $menu-left-height;

      .zs-scrollbar__view {
        height: 100%;

        .zs-menu {
          border-right: none;
          height: 100%;

          // .zs-sub-menu {
          //   padding: 5px;
          //   &.is-opened {
          //     background-color: red;

          //     .zs-sub-menu__title {
          //       line-height: 20px !important;
          //       padding: 0 !important;
          //       background-color: transparent !important;

          //       .sub-menu-style {
          //         width: 100%;
          //         height: 100%;
          //       }
          //     }
          //   }
          // }
        }
      }
    }
  }
}
</style>
