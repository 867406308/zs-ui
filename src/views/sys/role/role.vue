<template>
  <div>
    <el-button :plain="true" @click="open3">warning</el-button>
  </div>
</template>
<script>
export default defineComponent({
  setup() {
    const state = reactive({
      value1: '',
      formInline: {
        user: '',
        region: '',
      },
    });
    const open3 = () => {
      ElMessage({
        showClose: true,
        message: 'Warning, this is a warning message.',
        type: 'warning',
      });
    };

    const open = () => {
      ElMessageBox.alert('This is a message', 'Title', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: 'OK',
        callback: (action) => {
          ElMessage({
            type: 'info',
            message: `action: ${action}`,
          });
        },
      });
    };
    const onSubmit = () => {
      console.log('submit!');
    };
    return {
      ...toRefs(state),
      open3,
      open,
      onSubmit,
    };
  },
});
</script>
