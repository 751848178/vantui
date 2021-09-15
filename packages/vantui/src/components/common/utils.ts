import Taro from '@tarojs/taro'
import { isDef, isPlainObject, isPromise } from './validator'
import { canIUseGroupSetData, canIUseNextTick } from './version'
export { isDef } from './validator'
export function range(num: any, min: any, max: any) {
  return Math.min(Math.max(num, min), max)
}
export function nextTick(cb: any) {
  if (canIUseNextTick()) {
    Taro.nextTick(cb)
  } else {
    setTimeout(() => {
      cb()
    }, 33.333333333333336)
  }
}
let systemInfo: any
export function getSystemInfoSync() {
  if (systemInfo == null) {
    systemInfo = Taro.getSystemInfoSync()
  }
  return systemInfo
}
export function addUnit(value: any) {
  if (!isDef(value)) {
    return undefined
  }
  return /^-?\d+(\.\d+)?$/.test('' + value) ? Taro.pxTransform(value) : value
}
export function requestAnimationFrame(cb: any) {
  const systemInfo = getSystemInfoSync()
  if (systemInfo.platform === 'devtools') {
    return setTimeout(() => {
      cb()
    }, 33.333333333333336)
  }
  return Taro.createSelectorQuery()
    .selectViewport()
    .boundingClientRect()
    .exec(() => {
      cb()
    })
}
export function pickExclude(obj: any, keys: any) {
  if (!isPlainObject(obj)) {
    return {}
  }
  return Object.keys(obj).reduce((prev: any, key) => {
    if (!keys.includes(key)) {
      prev[key] = obj[key]
    }
    return prev
  }, {})
}
export function getRect(context: any, selector: any) {
  return new Promise((resolve) => {
    let query = Taro.createSelectorQuery()
    if (context) {
      query = query.in(context)
    }
    query
      .select(selector)
      .boundingClientRect()
      .exec((rect = []) => resolve(rect[0]))
  })
}
export function getAllRect(context: any, selector: any) {
  return new Promise((resolve) => {
    let query = Taro.createSelectorQuery()
    if (context) {
      query = query.in(context)
    }
    query
      .selectAll(selector)
      .boundingClientRect()
      .exec((rect = []) => resolve(rect[0]))
  })
}
export function groupSetData(context: any, cb: any) {
  if (canIUseGroupSetData()) {
    context.groupSetData(cb)
  } else {
    cb()
  }
}
export function toPromise(promiseLike: any) {
  if (isPromise(promiseLike)) {
    return promiseLike
  }
  return Promise.resolve(promiseLike)
}
export function getCurrentPage() {
  const pages = Taro.getCurrentPages()
  return pages[pages.length - 1]
}
