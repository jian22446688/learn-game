// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var ActionEnum = cc.Enum({
  move: 0,
  rotate: 1,
  scale: 2
})

// 让节点左右来回移动并一直重复

cc.Class({
  extends: cc.Component,
  properties: {
    // 选择类型
    ActionType: {
      type: ActionEnum,
      default: ActionEnum.move
    },
    moves: {
      type: cc.Vec2,
      default: new cc.Vec2(0, 0),
      visible() {
        return this.ActionType === ActionEnum.move
      }
    },
    moveReverse: {
      type: cc.Boolean,
      default: false,
      visible() {
        return this.ActionType === ActionEnum.move
      }
    },
    rotate: {
      default: 1,
      visible() {
        return this.ActionType === ActionEnum.rotate
      }
    },
    scale: {
      type: cc.Vec2,
      default: new cc.Vec2(0, 0),
      visible() {
        return this.ActionType === ActionEnum.scale
      }
    },
    duration: 0.3,
    
  },
  
  onLoad () {
      
  },
  start() {
    
    let seq = null
    if (this.ActionType === ActionEnum.move) {
      this._pos = this.node.position
      seq = cc.repeatForever(cc.sequence(
        cc.moveTo(this.duration, this.moves), 
        this.moveReverse ? cc.moveTo(this.duration, this._pos): cc.place(this._pos)
      ))
    } else if (this.ActionType === ActionEnum.rotate) {
      seq = cc.repeatForever(cc.sequence(cc.rotateBy(this.duration, this.rotate), cc.rotateBy(this.duration, -this.rotate)))
    } else if (this.ActionType === ActionEnum.scale) {
      this._scalex = this.node.scaleX
      this._scaley = this.node.scaleY
      seq = cc.repeatForever(cc.sequence(
        cc.scaleTo(this.duration, this.scale.x, this.scale.y), 
        cc.scaleTo(this.duration, this._scalex, this._scaley)
      ))
    }
    this.node.runAction(seq)
  }
});