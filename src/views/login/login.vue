<template>
  <div class="login-container">
    <div class="login">
      <!-- <div class="login_title">
        <p>智慧校园报修服务平台</p>
      </div> -->
      <div class="login_main">
        <el-row>
          <el-col class="main_left" :span="13"></el-col>
          <el-col class="main_right" :span="11">
            <div class="right_title">智慧校园报修服务平台</div>
            <el-tabs v-model="activeName" class="demo-tabs">
              <el-tab-pane label="账号密码登录" name="first">
                <login-username />
              </el-tab-pane>
              <el-tab-pane label="手机号登录" name="second">
                <login-phone />
              </el-tab-pane>
            </el-tabs>
            <div class="main-footer">
              <div class="main-footer-left">
                <div>其他方式登录</div>
                <div>
                  <img src="@/assets/icons/login/alipay.svg" />
                  <img src="@/assets/icons/login/wechat.svg" />
                </div>
              </div>
              <div class="main-footer-right">
                <el-link type="primary" :underline="false">注册账号</el-link>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- <div class="login_footer">
        <p>建议浏览器：IE9以上、Firefox v22</p>
      </div> -->
    </div>
  </div>
</template>

<script>
import { reactive, defineComponent, toRefs } from 'vue'
import loginUsername from './components/login-username.vue'
import loginPhone from './components/login-phone.vue'
export default defineComponent({
  components: {
    loginUsername,
    loginPhone,
  },
  setup() {
    const state = reactive({
      activeName: 'first',
    })

    return {
      ...toRefs(state),
    }
  },
})
</script>
<style lang="scss" scoped>
.login-container {
  background-color: cornflowerblue;
  // background-image: url('@/assets/bg.jpg');
  // background-repeat: round;
  height: 100vh;
  .login {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .login_title {
      height: 80px;
      text-align: center;

      p {
        color: #fff;
        font-size: 40px;
        font-weight: 600;
        margin-top: -8px;
        letter-spacing: 5px;
      }
    }

    .login_main {
      width: 900px;
      height: 520px;
      background-color: #fff;
      border-radius: 15px;

      .main_left {
        height: 520px;
        background: url('@/assets/bg6.png') no-repeat;
        background-repeat: round;
      }

      .main_right {
        padding: 40px 30px;
        // background-color: #e9eef2;

        .right_title {
          color: #0064c8;
          font-size: 30px;
          font-weight: 700;
          text-align: center;
          line-height: 30px;
          margin-bottom: 25px;
        }

        .main-footer {
          width: 100%;
          display: flex;
          justify-content: space-between;

          &-left {
            display: flex;

            div {
              margin-left: 10px;

              img {
                cursor: pointer;
                margin-left: 10px;
                width: 1.5em;
                height: 1.5em;
              }
            }
          }
        }
      }
    }
  }
}
</style>
