/**
 * 新版接口
 * @example 使用 var Http = require('Http')
 * @example      new Http().Get(url, cb)//url链接 回调函数
 * @example      new Http().Post(url, param, cb)//url链接 param参数(json对象) 回调函数
 */
class CusHttp {
  constructor () {
      this._http
      this._callback
    //   this._event = CusEvent.getInstance()
  }
  /**
   * Get 请求
   * @param {*} Url 
   * @param {*} cb 
   */
  Get (Url, cb) {
      let http = cc.loader.getXMLHttpRequest();
      http.open("GET", Url, true)
      http.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
      this._callback = cb;
      http.onreadystatechange = this._result.bind(this)
      http.timeout = 10000
      http.send()
      this._http = http
  }
  Post (Url, data, cb) {

      data = JSON.stringify(data)//以前不懂要怎么传，是缺少这一步
      let http = cc.loader.getXMLHttpRequest();
      http.open("POST", Url, true)
      http.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
      this._callback = cb;
      http.onreadystatechange = this._result.bind(this)
      http.timeout = 10000//超时10秒
      http.send(data)
      this._http = http
  }
  _result () {
      if (this._http.readyState == 4 && this._http.status != 500) {
          let data = Global.StrToJSON(this._http.responseText).data
         
          if (this._callback) {
              //如果服务端有回执text字段，则显示飘字
          }
      } else {
      }
  }
}
module.exports = CusHttp
