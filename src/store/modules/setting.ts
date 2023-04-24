import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
  state: () => {
    return {
      collapse: false,
    }
  },
  getters: {},
  actions: {
    // 切换collapse
    clickCollapse() {
      this.collapse = !this.collapse
    },
  },
})
