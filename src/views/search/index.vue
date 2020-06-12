 <template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isResultShow=false"
      />
    </form>

    <!-- 搜索结果 -->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
      />

    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
      ></search-suggestion>

    <!-- 历史记录 -->
    <search-history
      v-else
      :search-histotys = 'searchHistorys'
      />

  </div>
</template>

<script>

import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search_history'
import SearchResult from './components/search-result'

import { setItem, getItem } from '@/utils/storage'

import { getSearchHistories } from '@/api/search'
import { mapState } from 'vuex'
export default {
  name: 'SearchIndex',
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  props: {},
  data () {
    return {
      searchText: '', // 搜索输入框的内容
      isResultShow: false, // 控制搜索结果的显示状态
      searchHistorys: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadSearchHistories()
  },
  mounted () {},
  methods: {
    onSearch (searchText) {
      // console.log('onSearch')

      this.searchText = searchText

      // 触发搜索 记录搜索历史记录

      const index = this.searchHistorys.indexOf(searchText)
      if (index !== -1) {
        // 把重复项删除
        this.SearchSuggestion.splice(index, 1)
      }
      // 把最新的搜索记录放到顶部
      this.searchHistorys.unshift(searchText)
      // 如果用户已经登录则把搜索记录存储到线上

      // 如果用户未登录 则把搜索记录存储到本地
      setItem('search-historys', this.searchHistorys)
      this.isResultShow = true
    },
    async loadSearchHistories () {
      let searchHistorys = getItem('search-historys') || []
      // 让后端返回的历史记录和本地的历史记录合并起来
      if (this.user) {
        const { data } = await getSearchHistories()
        // console.log(data.data.keywords)
        searchHistorys = [...new Set([...searchHistorys, ...data.data.keywords])]
        // console.log(new Set([...searchHistorys, ...data.data.keywords]))
      }
      // console.log(searchHistorys)
      this.searchHistorys = searchHistorys
      // return searchHistories
    }
  }
}
</script>

<style scoped lang="less"></style>
