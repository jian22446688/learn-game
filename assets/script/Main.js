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
        console.log('anim', this._AnimateNode)
        this.initQuestion()
        let self = this
        // 拖动物体移动, 回答问题
        this.node.on('on-queset-move', event => {
            self._selectAns = event.target.name
            this.AnimateNode.node.scaleX = 1.115
            this.AnimateNode.play('chiing')
        })

        // 拖动物体开始
        this.node.on('on-queset-start', event => {
            this.AnimateNode.node.scaleX = 1.215
            this.AnimateNode.play('zhangzui')
        })
        // 拖动物体结束
        this.node.on('on-queset-end', event => {
            this.AnimateNode.node.scaleX = 1.115
            this.AnimateNode.play('daiji')
        })
        // 吃完了
        this.node.on('on-anim-chiwan-end', event => {
            // this._AnimateNode.play('daiji')
            this.chiingEvent()
        })
        // 吃完了
        this.node.on('on-anim-zhengque-end', event => {
            // setTimeout(() => {
            //     this.nextQuest()
            // }, 500)
            this.btn_next.active = true
            this.AnimateNode.node.scaleX = 1.115
            this.AnimateNode.play('daiji')
        })
        this.node.on('on-anim-cuowu-end', event => {
            setTimeout(() => {
                self.initQuestion(this.curQuesNumber)
            }, 500)
            this.AnimateNode.node.scaleX = 1.115
            this.AnimateNode.play('daiji')
        })
    },

    initQuestion(id = 0) {
        this.curQuestion = this.quesList[id]
        for (let index = 0; index < this.answerNode.length; index++) {
            this.answerNode[index].setPosition(this.answerPos[index])
            // this.answerNode[index].active = true
        }
        this.gameNode.setQuesSprite(this.answer[0], this.curQuestion.select_a)
        this.gameNode.setQuesSprite(this.answer[1], this.curQuestion.select_b)
        this.gameNode.setQuesSprite(this.answer[2], this.curQuestion.select_c)
        this.initQ()
        // 初始化问题选择位置
        this.randomPos()
        this.randomPos()
        this.randomPos()
        this.btn_next.active = false
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
            console.log('回答错误')
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
        console.log(this.gameNode)
    },

    onPlayQuestion() {
        this.gameNode.auBtnPlay()
        if (this.curQuestion) {
            let ques = this.curQuestion.question
            if (this.curQuestion.question_type === 'audio') {
                this.gameNode.auQuesPlay(ques)
            } else if (this.curQuestion.question_type === 'image') {

            } else {

            }
        }
    },
    onGameExit() {
        this.gameNode.auBtnPlay()
        cc.game.end()
    }
    // update (dt) {},
});
