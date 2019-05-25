// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var ActionType = cc.Enum({
  移动: 0,
  旋转: 1,
  缩放: 2
})

cc.Class({
  extends: cc.Component,
  properties: {
    moves: cc.Vec2,
    duration: 0.3
  },
  
  onLoad () {
      
  },
  start() {
     // 让节点左右来回移动并一直重复
    var seq = cc.repeatForever(cc.moveTo(duration, this.moves))
    this.node.runAction(seq)
  }
});