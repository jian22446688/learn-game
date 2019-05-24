// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var http = require('../utils/CusHttp')

let gameNode = cc.Class({
    statics: {
        _instance: null
    },
    extends: cc.Component,
    properties: {
        gameConfig: { type: cc.JsonAsset, default: null },
        gameQuestion: { type: cc.JsonAsset, default: null },
        questionList: { type: Object, default: null },
        gameQues: { type: Object, default: null },
        currentQues: { type: Object, default: null },
        // 所有的按钮音效
        au_btn_Clip: { type: cc.AudioClip, default: null },
        au_btn_sound: { type: cc.AudioSource, default: null },
        // btn 音效 id 所有的音效都从这里播放
        au_id_btn: { default: null, visible: false },
        // question 所有的 问题音效都从这里播放
        au_id_question: { default: null, visible: false, serializable: false }
    },

    onLoad () {
        gameNode._instance = this
        cc.game.addPersistRootNode(this.node)
        console.log('game-config', this.gameConfig.json);
        
        
        // new http().Get('http://' + location.host + '/json/game-question.json', (res)=> {
        //     console.log(res);
        //    this.questionList = res.data
        // })

        // 本地获取
        this.questionList = this.gameQuestion.json
        
        // 初始化问题数据
        this.gameQues = this.getGameQues(this.questionList)
        console.log('game-quest', this.gameQues);
    },

    start () {
        this.au_btn_sound = this.getComponent(cc.AudioSource)
     },
    // 获取游戏的所有问题
    getGameQues(list) { // gid = '001'
        let gid = this.gameConfig.json.game_id
        let qlist = list.filter(q => q.game_id == gid)
        return qlist
    },
    // 获取随机排序的问题
    getQuesList() {
        let ql = this.gameQues
        let number = this.gameConfig.json.question_number
        let qarr = JSON.parse(JSON.stringify(ql))
        qarr.sort(() => Math.random()>.5 ? -1 : 1)
        qarr.length = number >= qarr.length ? qarr.length : number
        this.currentQues = qarr
        return qarr
    },
    getQues(id) {
        if (id >= this.currentQues.length) {
            return this.currentQues[this.currentQues.length]
        }
        return this.currentQues[id]
    },
    // 播放所有需要播放的按钮音效
    auBtnPlay () {
        this.au_btn_sound.play()
    },
    // 播放所有问题的音效 res: 'main/au_help.mp3'
    auQuesPlay (audioname) {
        cc.loader.loadRes(audioname, cc.AudioClip, (err, clip) => {
            if(!err) {
                cc.audioEngine.stop(this.au_id_question);
                this.au_id_question = cc.audioEngine.play(clip, false);
            }
        })
    },
    // 停止播放 问题音效
    auQuesStop() {
        cc.audioEngine.stop(this.au_id_question);
    },
    // 停止所有播放
    auStopAll() {
        cc.audioEngine.stopAll();
    },

    // sprite 
    setQuesSprite(sprite, filename) {
        // load the sprite frame of (project/assets/resources/imgs/cocos.png) from resources folder
        cc.loader.loadRes(filename, cc.SpriteFrame, function (err, spriteFrame) {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            if (!sprite) {
                cc.error('gameNode set sprite error');
                return
            }
            sprite.spriteFrame = spriteFrame
        });
    }

    // update (dt) {},
});

module.exports = gameNode
