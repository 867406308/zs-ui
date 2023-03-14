<template>
  <div class="nav-bar">
    <div @click="clickCollapse" class="nav-collapse">
      <el-icon v-if="!collapse"><Fold /></el-icon>
      <el-icon v-if="collapse"><Expand /></el-icon>
    </div>
    <div class="nav-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in route.matched">{{
          item.meta.title
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>
<script setup>
import { useSettingStore } from '@/store/modules/setting';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
const settingStore = useSettingStore();
const { clickCollapse } = settingStore;
const { collapse } = storeToRefs(settingStore);
const router = useRouter();
const route = useRoute();

onMounted(() => {
  console.log('1212', route.matched);
});
</script>
<style lang="scss" scoped>
.nav-bar {
  height: $nav-height;
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e6eb;

  .nav-collapse {
    display: flex;
    align-items: center;
    .zs-icon {
      margin-left: 10px;
      cursor: pointer;
    }
  }

  .nav-breadcrumb {
    margin-left: 10px;
  }
}
</style>
