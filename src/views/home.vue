<template>
  <div @click="logout">首页</div>
</template>
<script>
import { removeToken } from '@/utils/token';
export default defineComponent({
  setup() {
    const router = useRouter();
    const logout = () => {
      removeToken();
      router.replace('/login');
    };

    return {
      logout,
    };
  },
});
</script>
