<template>
  <el-sub-menu
    v-if="menu.children && menu.children.length >= 1"
    :index="getPath(menu.path)"
  >
    <template #title>
      <div class="sub-menu-style" v-if="collapse">
        <div class="icon">
          <el-icon>
            <component :is="menu.meta.icon" class="icon"></component>
          </el-icon>
        </div>
        <!-- <IconCustomBug /> -->
        <!-- <div class="text" v-if="collapse">{{ menu.meta.title }}</div> -->
      </div>
      <div v-else>
        <el-icon>
          <component :is="menu.meta.icon" class="icon"></component>
        </el-icon>
        <span>{{ menu.meta.title }}</span>
      </div>
    </template>
    <SubMenu
      v-for="item in menu.children"
      :key="item.id"
      :menu="item"
      :basePath="getPath(menu.path)"
      :collapse="collapse"
    ></SubMenu>
  </el-sub-menu>
  <el-menu-item
    v-else
    :index="getPath(menu.path)"
    @click="routerChild(getPath(menu.path))"
  >
    <el-icon>
      <component :is="menu.meta.icon" class="icon"></component>
    </el-icon>
    <template #title>{{ menu.meta.title }}</template></el-menu-item
  >
</template>
<script setup>
import path from 'path-browserify';
const props = defineProps({
  menu: {
    type: Object,
    required: true,
  },
  basePath: {
    type: String,
    default: '',
  },
  collapse: {
    type: Boolean,
    default: false,
  },
});
const routerChild = (menu) => {
  console.log('menu11 ', menu);
};
// routepath 为当前菜单的path值
// getpath: 拼接 当前菜单的上一级菜单的path 和 当前菜单的path
const getPath = (routePath) => {
  return path.resolve(props.basePath, routePath);
};
</script>
<style lang="scss" scoped>
.zs-meun {
  .zs-sub-menu__title {
    background-color: blueviolet;
  }
}
.sub-menu-style {
  line-height: 25px;
  .icon {
    text-align: center;
  }
  .text {
    text-align: center;
  }
}
</style>
