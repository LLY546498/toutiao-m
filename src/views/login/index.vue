 <template>
  <div class="login-container">
     <van-nav-bar
     class="app-nav-bar"
      title="注册 / 登录"
      left-arrow
      @click-left="$router.back()"
      />
      <!-- 登录表单 -->
      <van-form
       :show-error="false"
       :show-error-message="false"
       :validate-first="true"
       ref="login-form"
       @submit="onLogin"
       @failed="onFailed"
       >
        <van-field
          v-model="user.mobile"
          icon-prefix="icon"
          left-icon="shouji"
          name="mobile"
          center
          placeholder="请输入手机号"
          :rules="formRoules.mobile"
       />
        <van-field
          v-model="user.code"
          clearable
          icon-prefix="icon"
          left-icon="yanzhengma"
          name="code"
          center
          placeholder="请输入验证码"
          :rules="formRoules.code"
        >
          <template #button>
            <van-count-down :time="1000 * 60"
             format="ss s"
             v-if="isCountDownShow"
             @finish="isCountDownShow = false"
             />
            <van-button
              v-else
              class="send-btn"
              size="mini"
              round
              :loading="isSendSmsLoading"
              @click.prevent="onSendSms()"
             >发送验证码</van-button>
          </template>
        </van-field>
        <div class="login-btn-wrap">
          <van-button
           class="login-btn"
           type="info"
            block
            >
            登录</van-button>
        </div>
      </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      formRoules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false,
      isSendSmsLoading: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLogin () {
      // 1，找到数据接口
      // 2，封装请求方法
      // 3，请求调用登录
      Toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        // const res = await login(this.user)
        const { data } = await login(this.user)
        // console.log(res)
        Toast.success('登录成功')
        // 将后端返回的token等数据放到vuex容器中
        this.$store.commit('setUser', data.data)
        this.$router.back()
      } catch (err) {
        console.log(err)
        console.log('登录失败', err)
        Toast.fail('登录失败，手机号或验证码失败')
      }
      // 4，处理响应结果
    },
    onFailed (error) {
      if (error.errors[0]) {
        Toast({
          message: error.errors[0].message,
          position: top
        })
      }
    },
    async onSendSms () {
      console.log(123)
      try {
        await this.$refs['login-form'].validate('mobile'
        )
        this.isSendSmsLoading = true
        await sendSms(this.user.mobile)
        // 短信发出去开始 倒计时
        this.isCountDownShow = true
      } catch (err) {
        let message = ''
        if (err && err.response && err.response.status === 429) {
          message = '发送太频繁了，请稍后重试'
        } else if (err.name === 'mobile') {
          message = err.message
        } else {
          message = '发送失败，请稍后重试'
        }
        Toast({
          message,
          position: 'top'
        })
      }
      // 关闭发送按钮的loading状态
      this.isSendSmsLoading = false
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666666;
    }
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>
