import  request  from "common@lib/config";

export function login(data) {
    return request({
      url: '/receive',
      method: 'post',
      data
    })
}

export function loginInfo(data) {
    return request({
      url: '/receive',
      method: 'post',
      data
    })
}

export function updatePwd(data) {
  return request({
    url: '/receive',
    method: 'post',
    data
  })
}
