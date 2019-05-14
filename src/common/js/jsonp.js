// 以入之前的jsonp
import originJsonp from 'jsonp'
// 导出自己的jsonp，封装成简单易用的promise形式

//为了以后再添加url参数设定一个参数data

export default function jsonp (url,data,option) {
  url += (url.indexOf('?') < 0 ? '?' : '&' ) + param(data)
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err,data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })

}
 export function param(data) {
  let url = ''
    for (let k in data) {
      let value = data[k] !== undefined ? data[k]: ''
      url += '&' + k + '=' + encodeURIComponent(value)
    }
    return url ? url.substring(1) : ''
  }
