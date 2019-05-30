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
    properties: {
        _selfRect: null,
        _curQues: null
     },
    onLoad () {},
    start () {
        var self = this;
        var isMove = false;
        let ansBox = Main._instance.answer_to
        var rect_a = new cc.Rect(ansBox.x, ansBox.y, ansBox.width , ansBox.height)
        let originalVec2 = null
        let zindex = null
        this.node.on(cc.Node.EventType.TOUCH_START, function(event){
            if (!window._c_isClick) return
            self._curQues = Main._instance.getCurQues()
            isMove = true;
            originalVec2 = self.node.position
            zindex = self.node.zindex
            self.node.zIndex = 999;
            let btnsEvent =  new cc.Event.EventCustom('on-queset-start', true)
            self.node.dispatchEvent(btnsEvent);
            // MOUSE_MOVE
            self.node.on(cc.Node.EventType.TOUCH_MOVE, function(event){
                if (isMove) {
                    self.node.x += event.getDelta().x
                    self.node.y += event.getDelta().y
                    self._selfRect = new cc.Rect(self.node.x, self.node.y, self.node.width, self.node.height)
                    // if(rect_a.containsRect(self._selfRect)) {
                    //     isMove = false;
                    //     self.node.zIndex = zindex
                    //     let btnsEvent =  new cc.Event.EventCustom('on-queset-move', true)
                    //     self.node.dispatchEvent(btnsEvent);
                    //     self.node.off(cc.Node.EventType.TOUCH_MOVE);
                    //     self.node.active = false
                    // }
                }
                event.stopPropagation();
            }, self.node)
        }, this.node)
        this.node.on(cc.Node.EventType.TOUCH_END, (event)=> {
            if(isMove) {
                // self.node.setPosition(originalVec2)
                // self.node.runAction(cc.moveTo(0.2, originalVec2))
                self.node.zIndex = zindex;
                isContainsRect(event)
            }
            isMove = false;
            // let btnsEvent =  new cc.Event.EventCustom('on-queset-end', true)
            // self.node.dispatchEvent(btnsEvent);
            self.node.off(cc.Node.EventType.TOUCH_MOVE);
        }, this.node)
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, ()=> {
            if(isMove){
                // self.node.runAction(cc.moveTo(0.2, originalVec2))
                // self.node.setPosition(originalVec2)
                self.node.zIndex = zindex;
                isContainsRect(event)
            }
            isMove = false;
            // let btnsEvent =  new cc.Event.EventCustom('on-queset-end', true)
            // self.node.dispatchEvent(btnsEvent);
            self.node.off(cc.Node.EventType.TOUCH_MOVE);
        }, this.node)

        function isContainsRect(event) {
            if (!window._c_isClick) return
           
            let answer = self._curQues.answer
            self.node.zIndex = zindex
            if(rect_a.containsRect(self._selfRect)) {
                let selectAns = event.target.name
                selectAns = selectAns.substr(selectAns.lastIndexOf(), selectAns.length)
                if (selectAns.toLowerCase() === answer.toLowerCase()) {
                    // todo Correct answer
                    let btnsEvent = new cc.Event.EventCustom('on-move-zhengque-end', true)
                    self.node.dispatchEvent(btnsEvent);
                    self.node.active = false
                } else {
                    // todo Error answer
                    self.node.runAction(cc.moveTo(0.2, originalVec2))
                    let btnsEvent = new cc.Event.EventCustom('on-move-cuowu-end', true)
                    self.node.dispatchEvent(btnsEvent);
                }
                let btnsEvent = new cc.Event.EventCustom('on-move-complete-end', true)
                self.node.dispatchEvent(btnsEvent);
            } else {
                self.node.runAction(cc.moveTo(0.2, originalVec2))
                
                let btnsEvent = new cc.Event.EventCustom('on-queset-end', true)
                self.node.dispatchEvent(btnsEvent);
            }
        }
    }
});
