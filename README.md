小游戏

/json/game-question.json 
服务器根目录 放入问题数据文件

添加了构建模板 
buid-templates->web-desktop

添加了 windows 全局变量
window.c_GameNode = this

## 添加自定义事件
let btnsEvent =  new cc.Event.EventCustom('on-audio-quest-erroe', true)
self.node.dispatchEvent(btnsEvent);
this.node.on('on-btns-quest-close', event => {
    this.hideGame()
    this.gameMain.active = true
    this.playbtns('on-audio-btns')
})
