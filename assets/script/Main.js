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
    statics: {
        _instance: null
    },
    properties: {
        gameNode: {
            type: gameNode,
            default: null
        },
        QuestImage: {
            type: cc.Sprite,
            default: null
        },
        answer_to: {
            type: cc.Node,
            default: null
        },
        AnimateNode: {
          type: cc.Animation,
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
        curQuestion: null,
        curQuesNumber: 0,
        auZhengque: {
            type: cc.AudioClip,
            default: null
        },
        auCuowu: {
            type: cc.AudioClip,
            default: null
        },
        btn_next: {
            type: cc.Node,
            default: null
        },
        rePlayPanel: {
            type: cc.Node,
            default: null
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Main._instance = this;
        this.answerNode = this.node.getChildByName('answer').children
        // this.answer_to = this.node.getChildByName('ques-box')
        this.answer = this.answerNode.map(c => c.children[0].getComponent(cc.Sprite))
        this.answerPos = this.answerNode.map(c => JSON.parse(JSON.stringify(c.position)))
        // 初始化问题
        this.quesList = this.gameNode.getQuesList()
    },

    start() {
        // this._AnimateNode = this.answer_to.getComponent(cc.Animation)
        this.initQuestion()
        let self = this
        // 拖动物体移动, 回答问题
        this.node.on('on-queset-move', event => {
            self._selectAns = event.target.name
            self.AnimateNode.play('chiing')
            window._c_isClick = false
        })

        // 拖动物体开始
        this.node.on('on-queset-start', event => {
            if (!window._c_isClick) return
            self.AnimateNode.play('zhangzui')
        })
        // 拖动物体结束
        this.node.on('on-queset-end', event => {
            if (!window._c_isClick) return
            self.AnimateNode.play('daiji')
        })
        // 吃完了
        this.node.on('on-anim-chiwan-end', event => {
            // self.chiingEvent()
            self.AnimateNode.play('zhengque')
            self.gameNode.auClipPlay(self.auZhengque)
        })
        // 吃完了
        this.node.on('on-anim-zhengque-end', event => {
            self.btn_next.active = true
            self.AnimateNode.play('daiji')
            if (self.curQuesNumber === self.quesList.length - 1) {
                // todo Answer completed
                // alert('回答完成')
                self.rePlayPanel.active = true
                self.btn_next.active = false
            }
        })
        this.node.on('on-anim-cuowu-end', event => {
            // setTimeout(() => {
            //     self.initQuestion(this.curQuesNumber)
            // }, 1000)
            self.AnimateNode.play('daiji')
            window._c_isClick = true
        })
        this.node.on('on-move-zhengque-end', event => {
            window._c_isClick = false
            self.AnimateNode.play('chiing')
        })
        this.node.on('on-move-cuowu-end', event => {
            window._c_isClick = false
            self.gameNode.auClipPlay(self.auCuowu)
            self.AnimateNode.play('cuowu')
        })
        this.node.on('on-move-complete-end', event => {
            window._c_isClick = false
            
        })
    },

    initQuestion(id = 0) {
        window._c_isClick = true
        this.rePlayPanel.active = false
        this.curQuestion = this.quesList[id]
        for (let index = 0; index < this.answerNode.length; index++) {
            this.answerNode[index].setPosition(this.answerPos[index])
            this.answerNode[index].active = true
        }
        this.answer[0].scale = 0.97
        this.answer[1].scale = 0.97
        this.answer[2].scale = 0.97
        this.gameNode.setQuesSprite(this.answer[0], this.curQuestion.select_a)
        this.gameNode.setQuesSprite(this.answer[1], this.curQuestion.select_b)
        this.gameNode.setQuesSprite(this.answer[2], this.curQuestion.select_c)
        this.initQ()
        // 初始化问题选择位置
        this.randomPos()
        this.randomPos()
        this.randomPos()
        this.btn_next.active = false
        this.curQuesNumber = id
    },
    chiingEvent() {
        let selectAns = this._selectAns
        selectAns = selectAns.substr(selectAns.lastIndexOf(), selectAns.length)
        console.log('name', selectAns)
        let answer = this.curQuestion.answer
        if (selectAns.toLowerCase() === answer.toLowerCase()) {
            // todo Correct answer
            console.log('回答正确')
            this.gameNode.auClipPlay(this.auZhengque)
            this.AnimateNode.play('zhengque')
        } else {
            // todo Error answer
            this.gameNode.auClipPlay(this.auCuowu)
            this.AnimateNode.play('cuowu')
        }
        if (this.curQuesNumber === this.quesList.length - 1) {
            // todo Answer completed
            alert('回答完成')

        }
    },
    initQ() {
        // 初始化问题 数据
        if (this.curQuestion) {
            let ques = this.curQuestion.question
            if (this.curQuestion.question_type === 'audio') {
                this.gameNode.auQuesPlay(ques)
            } else if (this.curQuestion.question_type === 'image') {
                if (this.QuestImage) {
                    this.gameNode.setQuesSprite(this.QuestImage, ques)
                }
            } else {

            }
        }
    },
    getCurQues() {
        return this.curQuestion
    },
    randomPos() {
        let rand = utils.getRandomNum(1, 3)
        this.answerPos.sort(utils.randomsort)
        switch (rand) {
            case 1:
                let node1 = this.answerPos[0]
                this.answerNode[0].position = this.answerPos[1]
                this.answerNode[1].position = this.answerPos[2]
                this.answerNode[2].position = node1
                break;
            case 2:
                let node2 = this.answerPos[1]
                this.answerNode[1].position = this.answerPos[2]
                this.answerNode[2].position = this.answerPos[0]
                this.answerNode[0].position = node2
                break;
            case 3:
                let node3 = this.answerPos[2]
                this.answerNode[2].position = this.answerPos[0]
                this.answerNode[0].position = this.answerPos[1]
                this.answerNode[1].position = node3
                break;
        }
    },

    nextQuest() {
        if (this.curQuesNumber + 1 < this.quesList.length) {
            this.curQuesNumber++
            
            this.initQuestion(this.curQuesNumber)
        }
    },

    onTestButton() {
        console.log('chiing')
        this.AnimateNode.play('chiing')
    },

    onPlayQuestion() {
        if (!window._c_isClick) return
        if (this.curQuestion) {
            let ques = this.curQuestion.question
            if (this.curQuestion.question_type === 'audio') {
                this.gameNode.auQuesPlay(ques)
            } else if (this.curQuestion.question_type === 'image') {

            } else {

            }
        }
    },
    onGameNext() {
        this.gameNode.auBtnPlay()
        this.nextQuest()
    },
    onReplayGame() {
        // 重新开始
        this.gameNode.auBtnPlay()
        this.initQuestion()
    },
    onGameExit() {
        this.gameNode.auBtnPlay()
        cc.game.end()
    }
});
