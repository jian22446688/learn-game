// 发送事件方法
/**
 * 发送事件信息
 */
module.exports.$emit = function (node, eventname, param) {
  let btnsEvent = new cc.Event.EventCustom(eventname, true)
  btnsEvent.setUserData(param)
  node.dispatchEvent(btnsEvent);
}