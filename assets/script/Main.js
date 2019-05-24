// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var gameNode = require('./gameNode')
var utils = require('../utils/index')

var Main = cc.Class({
    extends: cc.Component,
    statics : {
        _instance: null
    },
    properties: {
        gameNode: {
            type: gameNode,
            default: null
        },
        answer_to: {
            type: cc.Node,
            default: null
        },
        answerNode: {
            type: [cc.Node],
            default: []
        },
        answer: {
            type: [cc.Sprite],
            default: []
        },
        quesList: [],
        curQues: 0,
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Main._instance = this;
        this.answerNode = this.node.getChildByName('answer').children
        this.answer_to = this.node.getChildByName('ques-box')
        this.answer = this.answerNode.map(c => c.children[0].getComponent(cc.Sprite))
        // 初始化问题
        this.quesList = this.gameNode.getQuesList()
    },

    start () {
       
        this.initQuestion()
    },

    initQuestion() {
        console.log('quest', this.quesList)
        
        // 初始化问题选择位置
        this.randomPos()
    },

    randomPos() {
        let rand = utils.getRandomNum(1, 3)
        switch (rand) {
            case 1:
                let node1 = this.answerNode[0].position
                this.answerNode[0].position = this.answerNode[1].position
                this.answerNode[1].position = this.answerNode[2].position
                this.answerNode[2].position = node1
                break;
            case 2:
                let node2 = this.answerNode[1].position
                this.answerNode[1].position = this.answerNode[2].position
                this.answerNode[2].position = this.answerNode[0].position
                this.answerNode[0].position = node2
                break;
            case 3:
                let node3 = this.answerNode[2].position
                this.answerNode[2].position = this.answerNode[0].position
                this.answerNode[0].position = this.answerNode[1].position
                this.answerNode[1].position = node3
                break;
        }
    },

    onPlayQuestion() {
        this.randomPos()
        this.gameNode.auBtnPlay()
        let curQues = this.gameNode.getQuesList()
        let audio = curQues[0].question
        this.gameNode.auQuesPlay(audio)
    },
    onGameExit() {
        this.gameNode.auBtnPlay()
        let curQues = this.gameNode.getQuesList()
        this.gameNode.setQuesSprite(this.answer[0], curQues[0].select_a)
        this.gameNode.setQuesSprite(this.answer[1], curQues[0].select_b)
        this.gameNode.setQuesSprite(this.answer[2], curQues[0].select_c)
        console.log(curQues)
        this.randomPos()
        console.log(this.answer[2].node.name);
        

    }
    // update (dt) {},
});
