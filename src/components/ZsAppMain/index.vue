<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="router-fade" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </section>

  <!-- <div style="height: 100px">授权</div> -->
</template>

<script>
export default {
  name: 'AppMain',
  computed: {},
};
</script>

<style lang="scss" scoped>
.app-main {
  // width: 100%;
  padding: $padding;
  position: relative;
  overflow: hidden;
  height: $app-main-height;
  background-color: #ffffff;
}
.fixed-header + .app-main {
  /* padding-top: 50px; */
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
