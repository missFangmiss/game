import  request  from "common@lib/config";

export function setInfo(data) {
    return request({
      url: '/receive',
      method: 'post',
      data
    })
}

export function updateSet(data) {
    return request({
      url: '/receive',
      method: 'post',
      data
    })
}

