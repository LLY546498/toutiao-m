 <template>
  <div class="home-container">
    <!-- 文章频道列表 -->
      <van-tabs v-model="active">
        <van-tab
         :title="channel.name"
         v-for="channel in channels"
          :key="channel.id"
         >{{ channel.name }}的内容 1</van-tab>
      </van-tabs>
  </div>
</template>

<script>
// import { getUserChannels } from '@/api/user.js'
export default {
  name: 'HomeIndex',
  components: {},
  props: {},
  data () {
    return {
      active: 0
    }
  },
  computed: {},
  watch: {},
  created () {
    // this.loadChannels()
  },
  mounted () {},
  methods: {
    // async loadChannels () {
    //   const { data } = await getUserChannels()
    // }
  }
}
</script>

<style scoped lang="less"></style>
