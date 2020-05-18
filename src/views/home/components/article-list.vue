 <template>
  <div class="article-list">
    <van-pull-refresh
     v-model="isRefreshLoading"
     :success-text="refreshSuccessText"
     :success-duration="1000"
     @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
         v-for="(article, index) in articles"
         :key="index"
         :title="article.title" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getAtricles } from '@/api/article'
export default {
  name: 'ArticleList',
  components: {},
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp: null,
      isRefreshLoading: false,
      refreshSuccessText: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      console.log('onload')
      const { data } = await getAtricles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      //   把数据放到list数组中
      const { results } = data.data
      this.articles.push(...results)
      //  设置本次加载状态结束，他才可以判断是否需要加载下一次
      this.loading = false
      //   数据全部加载完成
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },

    async onRefresh () {
    // 1,请求获取数据
      const { data } = await getAtricles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      // 2.把数据放到数据列表中（网顶部添加)
      const { results } = data.data
      this.articles.unshift(...results)
      // 3，关闭刷新的状态 loading
      this.isRefreshLoading = false
      this.refreshSuccessText = `更新了${results.length}条数据`
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    top: 90px;
    overflow: auto;
}
</style>
