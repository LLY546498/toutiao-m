 <template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar
     class="app-nav-bar"
    >
    <van-button
      class="search-btn"
      slot="title"
      icon="search"
      type="info"
      round
      size="small"
    >搜索</van-button>
    </van-nav-bar>
    <!-- 文章频道列表 -->
    <van-tabs v-model="active">
      <van-tab
       :title="channel.name"
       v-for="channel in channels"
       :key="channel.id"
      >
        <article-list :channel="channel"/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArticleList from './components/article-list'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async loadChannels () {
      const { data } = await getUserChannels()
      this.channels = data.data.channels
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  /deep/.van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #5babfb;
    border: none;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
}
</style>
