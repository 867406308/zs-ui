<template>
  <el-form
    :model="form"
    ref="dataForm"
    @keyup.enter.native="dataFormSubmitHandle()"
    class="form"
  >
    <el-form-item prop="username">
      <el-input
        v-model="form.username"
        placeholder="手机号"
        class="username"
        size="large"
      >
        <template #prepend
          ><el-icon><Iphone /></el-icon
        ></template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="form.password"
        type="password"
        placeholder="请输入验证码"
        size="large"
      >
        <template #prepend>
          <el-icon><Message /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-checkbox
        >我已阅读并同意<el-link type="warning">服务条款</el-link>、<el-link
          type="warning"
          >隐私政策</el-link
        ></el-checkbox
      >
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="dataFormSubmitHandle()"
        class="w-percent-100"
        style="width: 100%"
        size="large"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
import { defineComponent, toRefs, reactive } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      form: {
        username: '',
        password: '',
      },
    })
    // 表单提交
    const dataFormSubmitHandle = () => {}
    return {
      ...toRefs(state),
      dataFormSubmitHandle,
    }
  },
})
</script>
<style lang="scss" scoped>
.zs-form {
  padding-top: 20px;
  .tools {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .zs-icon {
    height: 1.5em;
    width: 1.5em;
    svg {
      height: 1.5em;
      width: 1.5em;
    }
  }
}
</style>
