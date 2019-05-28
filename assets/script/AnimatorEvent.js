cc.Class({
  extends: cc.Component,
  properties: {},
  start () { },
  AnimatorEvent(name){
    let btnsEvent = new cc.Event.EventCustom(name, true)
    this.node.dispatchEvent(btnsEvent);
  }
});
