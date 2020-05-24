 <template>
  <div class="channel-edit">
      <van-cell center :border="false">
          <div
           slot="title"
           class="channel-title"
           >我的频道</div>
          <van-button
            type="danger"
            plain
            round
            size="mini"
            @click="isEdit = !isEdit"
          >{{ isEdit ? '完成' : '编辑' }}</van-button>
      </van-cell>
      <van-grid :gutter="10">
         <van-grid-item
          class="grid-item"
          :icon="(isEdit && index !== 0) ? 'clear' : ''"
          :class="{ active: index === active }"
          v-for="(channel,index) in userChannels"
          :key="index"
          :text="channel.name"
          @click="onUserChannelClick(index)"
          />
       </van-grid>
      <van-cell center :border="false">
          <div
           slot="title"
           class="channel-title"
           >频道推荐</div>
      </van-cell>
      <van-grid :gutter="10">
         <van-grid-item
          class="grid-item"
          v-for="(channel, index) in recommendChannels"
          :key="index"
          :text="channel.name"
          @click="onAdd(channel)"
          />
       </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allchannels: [],
      isEdit: false
    }
  },
  computed: {
    //   推荐频道列表
    recommendChannels () {
      return this.allchannels.filter(channle => {
        //   判断当前遍历的频道是否属于我的频道
        return !this.userChannels.find(userChannel => {
          return userChannel.id === channle.id
        })
      })
    //   const arr = []
    //   this.allchannels.forEach(channel => {
    //     let flag = false
    //     for (let i = 0; i < this.userChannels.length; i++) {
    //       if (this.userChannels[i].id === channel.id) {
    //         //   所有频道中的频道项属于用户频道
    //         flag = true
    //         break
    //       }
    //     }
    //     if (!flag) {
    //       arr.push(channel)
    //     }
    //   })
    //   return arr
    }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allchannels = data.data.channels
    },
    onAdd (channel) {
      this.userChannels.push(channel)
    },
    onUserChannelClick (index) {
      if (this.isEdit && index !== 0) {
        this.deleteChannel(index)
      } else {
        this.switchChannel(index)
      }
    },
    deleteChannel (index) {
      this.userChannels.splice(index, 1)
    },
    switchChannel (index) {
      console.log('切换频道')
      this.$emit('update-active', index)
      // 关闭弹出层
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
    padding-top: 54px;
    .channel-title {
        font-size: 16px;
        color: #333;
    }
    .grid-item {
        width: 80px;
        height: 43px;
        border-radius: 2px;
        /deep/ .van-grid-item__content {
            background-color: #f4f5f6;
            .van-grid-item__text {
                font-size: 14px;
                color: #222;
                margin-top: 0;
            }
        }
        /deep/ .van-grid-item__icon {
            position: absolute;
            right: -5px;
            top: -5px;
            font-size: 20px;
            color: #ccc;
        }
    }
    .active {
         /deep/ .van-grid-item__text {
           color: red!important;
         }
       }
}
</style>
