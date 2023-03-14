<!-- <template>
  <Icon icon="mdi-light:home" />
  <Icon icon="bi:bell-slash" :inline="true" />
  <Icon icon="icon-park:add-four" :inline="true" />
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';

</script> -->
<template>
  <div>
    <!-- <icon-park type="add-user" theme="outline" />
    <icon-park type="add-text" theme="filled" /> -->

    <icon-park
      v-for="(item, index) in icons"
      :key="index"
      :type="item.name"
      theme="filled"
    ></icon-park>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import icons from '@icon-park/vue-next/icons.json';
// import icons from '../source/icons.json';
onMounted(() => {
  // const appData = require('@icon-park/vue-next/icons.json');
  console.log('zszs', icons);
});
</script>
