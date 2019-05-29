// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        audaiji: {
            type: cc.AudioClip,
            default: null
        },
        auchiing: {
            type: cc.AudioClip,
            default: null
        },
        aujiaoyan: {
            type: cc.AudioClip,
            default: null
        },
        aufanu: {
            type: cc.AudioClip,
            default: null
        }
    },
    start () { },
    audaijiEvent(audio) {
        cc.audioEngine.play(this[audio], false);
    },
    chiingEvent() {
        let btnsEvent =  new cc.Event.EventCustom('on-anim-chiwan-end', true)
        this.node.dispatchEvent(btnsEvent);
    },
    zhengqueEvent() {
        let btnsEvent =  new cc.Event.EventCustom('on-anim-zhengque-end', true)
        this.node.dispatchEvent(btnsEvent);
    },
    cuowuEvent() {
        let btnsEvent =  new cc.Event.EventCustom('on-anim-cuowu-end', true)
        this.node.dispatchEvent(btnsEvent);
    }
});
