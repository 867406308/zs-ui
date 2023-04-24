<template>
  <el-form
    :model="form"
    ref="formRef"
    @keyup.enter.native="dataFormSubmitHandle()"
    class="form"
    :rules="rules"
  >
    <el-form-item prop="username">
      <el-input
        v-model="form.username"
        placeholder="用户名"
        class="username"
        size="large"
      >
        <template #prepend>
          <el-icon><User /></el-icon
        ></template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="form.password"
        type="password"
        placeholder="密码"
        size="large"
        show-password
      >
        <template #prepend>
          <el-icon><Lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <div class="tools">
        <div>
          <el-checkbox>自动登录</el-checkbox>
        </div>
        <div>
          <el-link type="primary" :underline="false">忘记密码</el-link>
        </div>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        :loading="loading"
        @click="handleLogin()"
        class="w-percent-100"
        style="width: 100%"
        size="large"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
import { isPassword } from '@/utils/validator'
import { useUserStore } from '@/store/modules/sys/user'
export default defineComponent({
  setup() {
    const validateUsername = (rule, value, callback) => {
      if ('' === value) {
        callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!isPassword(value)) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    const state = reactive({
      loading: false,
      formRef: null,
      form: {
        username: 'admin',
        password: '123456',
      },
      rules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            validator: validateUsername,
          },
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePassword,
          },
        ],
      },
    })

    const router = useRouter()
    const { login } = useUserStore()
    // 表单提交
    const handleLogin = async () => {
      state['formRef'].validate(async (valid) => {
        if (valid)
          try {
            state.loading = true
            await login(state.form)
            router.push('/index')
          } finally {
            state.loading = false
          }
      })
    }
    return {
      ...toRefs(state),
      handleLogin,
    }
  },
})
</script>
<style lang="scss" scoped>
.zs-form {
  padding-top: 20px;
  .zs-form-item__content {
    .tools {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
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
