import { defineStore } from 'pinia';

export const menuStore = defineStore('menu', {
  state: () => {
    return {
      menuList: [],
    };
  },
  getters: {},
  actions: {
    async getMenuList() {},
  },
});
