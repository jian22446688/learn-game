// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var Main = require('./Main')
cc.Class({
    extends: cc.Component,
    properties: { },
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        
    },

    start () {
        var self = this;
        var isMove = false;
        let ansBox = Main._instance.answer_to
        var rect_a = new cc.Rect(ansBox.x, ansBox.y, ansBox.width , ansBox.height)
        let originalVec2 = null
        let zindex = null
        this.node.on(cc.Node.EventType.TOUCH_START, function(event){
            isMove = true;
            originalVec2 = self.node.position
            zindex = self.node.zindex
            self.node.zIndex = 999;
            let btnsEvent =  new cc.Event.EventCustom('on-queset-start', true)
            self.node.dispatchEvent(btnsEvent);
            self.node.on(cc.Node.EventType.TOUCH_MOVE, function(event){
                if(isMove){
                   setTimeout(() => {
                    self.node.x += event.getDelta().x
                    self.node.y += event.getDelta().y
                    let _selfRect = new cc.Rect(self.node.x, self.node.y, self.node.width, self.node.height)
                    if(rect_a.containsRect(_selfRect)) {
                        isMove = false;
                        self.node.zIndex = zindex
                        self.node.setPosition(originalVec2)
                        let btnsEvent =  new cc.Event.EventCustom('on-queset-move', true)
                        self.node.dispatchEvent(btnsEvent);
                        self.node.active = false
                        // self.node.x = 99999
                    }
                   }, 10)
                }
                event.stopPropagation();
            }, self.node)
        }, this.node)
        this.node.on(cc.Node.EventType.TOUCH_END, ()=> {
            if(isMove) {
                // self.node.setPosition(originalVec2)
                self.node.runAction(cc.moveTo(0.2, originalVec2))
                self.node.zIndex = zindex;
            }
            isMove = false;
            let btnsEvent =  new cc.Event.EventCustom('on-queset-end', true)
            self.node.dispatchEvent(btnsEvent);
            self.node.off(cc.Node.EventType.TOUCH_MOVE);
        }, this.node)
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, ()=> {
            if(isMove){
                self.node.runAction(cc.moveTo(0.2, originalVec2))
                // self.node.setPosition(originalVec2)
                self.node.zIndex = zindex;
            }
            isMove = false;
            let btnsEvent =  new cc.Event.EventCustom('on-queset-end', true)
            self.node.dispatchEvent(btnsEvent);
            self.node.off(cc.Node.EventType.TOUCH_MOVE);
        }, this.node)
    }
});
