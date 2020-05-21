// 初始化dayjs 相关配置

import Vue from 'vue'

import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用处理相对时间
dayjs.extend(relativeTime)
// 配置使用中文语言包
dayjs.locale('zh-cn')

// 例如日期格式

// console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))

// console.log(dayjs('2008-01-01').from(dayjs()))

Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})
