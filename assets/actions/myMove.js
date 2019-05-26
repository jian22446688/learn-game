// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

// 让节点永远重复移动并一直重复
cc.Class({
    extends: cc.Component,

    properties: {
        moves: cc.Vec2,
        duration: 1.0
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
         // 让节点左右来回移动并一直重复
        this._pos = this.node.position
        var seq = cc.repeatForever(cc.sequence(cc.moveTo(this.duration, this.moves), cc.place(this._pos)))
        this.node.runAction(seq)
    },

    // update (dt) {},
});
