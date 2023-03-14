import { defineStore } from 'pinia';

export const useSettingStore = defineStore('setting', {
  state: () => {
    return {
      collapse: false,
    };
  },
  getters: {},
  actions: {
    // 切换collapse
    clickCollapse() {
      console.log('121212');
      this.collapse = !this.collapse;
    },
  },
});
