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
          @click="onUserChannelClick(channel, index)"
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
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel
} from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
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
    ...mapState(['user']),
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
    // 添加频道
    async onAdd (channel) {
      this.userChannels.push(channel)
      // TODO： 数据持久化
      if (this.user) {
        await addUserChannel({
          channels: [
            { id: channel.id, seq: this.userChannels.length }
          ]
        })
        console.log(channel.id)
      } else {
        // 没有登录把数据放到本地存储
        setItem('user-channels', this.userChannels)
      }
    },
    onUserChannelClick (channel, index) {
      if (this.isEdit && index !== 0) {
        this.deleteChannel(channel, index)
      } else {
        this.switchChannel(index)
      }
    },
    // 删除频道
    async deleteChannel (channel, index) {
      if (index <= this.active) {
        // 更新激活频道的索引
        // console.log(this.active)
        // const aa = this.active - 1
        this.$emit('update-active', this.active - 1)
        // console.log(aa)
      }
      this.userChannels.splice(index, 1)
      if (this.user) {
        await deleteUserChannel(channel.id)
      } else {
        setItem('user-channels', this.userChannels)
      }
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
