import  request  from "common@lib/config";

export function orderList(data) {
    return request({
      url: '/receive',
      method: 'post',
      data
    })
  }