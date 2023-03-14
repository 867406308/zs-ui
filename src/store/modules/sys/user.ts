import { setToken } from '@/utils/token';
import { defineStore } from 'pinia';
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      username: '',
      token: '',
      avatar: '',
    };
  },
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = token;
      setToken(token);
    },
    login() {
      this.setToken('123123123');
    },
  },
});
