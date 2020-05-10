import request from '@/utils/request'

/*
*用户相关的请求模块
*
*/

// 登录注册
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
