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

export function h5GameSet(data) {
  return request({
    url: '/entry',
    method: 'post',
    data
  })
}

export function h5GameInfo(data) {
  return request({
    url: '/entry',
    method: 'post',
    data
  })
}

export function h5GameSearch(data) {
  return request({
    url: '/entry',
    method: 'post',
    data
  })
}

export function h5GameRecord(data) {
  return request({
    url: '/entry',
    method: 'post',
    data
  })
}

export function h5GamePrice(data) {
  return request({
    url: 'https://api.yjinvest.top/api/market/time-sharing',//TODO'https://testapi.okoption.top/api/market/time-sharing',
    method: 'get',
    params:data,
    data:{}
  })
}

export function h5GameBuy(data) {
  return request({
    url: '/entry',
    method: 'post',
    data
  })
}

export function h5GameStart(data) {
  return request({
    url: '/entry',
    method: 'post',
    data
  })
}

export function h5GameResult(data) {
  return request({
    url: '/entry',
    method: 'post',
    data
  })
}

export function h5GameIndex(data) {
  return request({
    url: '/entry',
    method: 'post',
    data
  })
}

export function h5Record(data) {
  return request({
    url: '/entry',
    method: 'post',
    data
  })
}