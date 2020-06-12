 <template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(item,index) in suggestions"
      :key="index"
      @click="$emit('search',item)"
    >
    <div slot="title" v-html="highlight(item)"></div>
    </van-cell>
  </div>
</template>

<script>

import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [] // 联想建议数据列表
    }
  },
  computed: {},
  watch: {
    // 属性名： 要监视的数据名称
    // searchText () {
    //   console.log('hellow')
    // }
    // searchText: {
    //   // 当数据发生变化的时候会执行handler处理函数
    //   // async handler: function () {
    //   //   const { data } = await getSearchSuggestions(this.searchText)

    //   //   this.suggestions = data.data.options
    //   // },
    //   immediate: true // 监听开始之后l立即调用
    // }
    searchText: {
      // 当数据发生变化则会执行 handler 处理函数
      // debounce 函数
      //  参数1：函数
      //  参数2：时间
      //  返回值：防抖处理的函数
      handler: debounce(async function () {
        const { data } = await getSearchSuggestions(this.searchText)
        this.suggestions = data.data.options
      }, 200),
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  },
  created () {},
  mounted () {},
  methods: {
    highlight (item) {
      // 正则表达式中间的内容都会当做字符串来对待
      // RegExp 是正则表达式的构造函数
      return item.replace(
        new RegExp(this.searchText, 'gi'),
      `<span style="color: red">${this.searchText}</span>`)
    }
  }
}
</script>

<style scoped lang="less"></style>
