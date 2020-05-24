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
    <van-tabs class="channel-tabs" v-model="active">
      <van-tab
       :title="channel.name"
       v-for="channel in channels"
       :key="channel.id"
      >
        <article-list :channel="channel"/>
      </van-tab>
      <div
        slot="nav-right"
        class="wap-nav-placeholder">
      </div>
      <div
       slot="nav-right"
       @click="isChannelEditShow = true"
       class="wap-nav-wrap"
       >
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <van-popup
     v-model="isChannelEditShow"
     position="bottom"
     closeable
     close-icon-position="top-left"
     class="channel-edit-popup"
     get-container="body"
     style="height: 100%"
    >
      <channel-edit
        :user-channels="channels"
        :active="active"
        @close="isChannelEditShow = false"
        @update-active="active = $event"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: true
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
  // onUpdateActive (index) {
  //   this.active = index
  // }
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
  .channel-tabs {
    /deep/ .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/ .van-tabs__line {
      bottom: 20px;
      width: 15px !important;
      height: 3px;
      background-color: #3296fa;
    }
  }
  .wap-nav-placeholder {
    width: 33px;
    flex-shrink: 0;
  }
  .wap-nav-wrap {
    position: fixed;
    right: 0;
    height: 43px;
    width: 33px;
    line-height: 44px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: .9;
    // position: relative;
    .van-icon {
      font-size: 20px;
    }
    &:before {
      content: '';
      width: 1px;
      height: 43px;
      background: url('./line.png') no-repeat;
      background-size: cover;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}
</style>
