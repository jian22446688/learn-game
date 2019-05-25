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

        // {
        //     "other": "",
        //     "id": "1",
        //     "game_id": "001",
        //     "level": "",
        //     "question": "audio/a_book",
        //     "question_text": "a book",
        //     "question_type": "audio",
        //     "select_type": "image",
        //     "answer": "a",
        //     "select_a": "image/book_picture_1",
        //     "a_text": "",
        //     "select_b": "image/crayon_picture_1",
        //     "b_text": "",
        //     "select_c": "image/pencil_picture_1",
        //     "c_text": "",
        //     "select_d": "",
        //     "d_text": ""
        // }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Main._instance = this;
        this.answerNode = this.node.getChildByName('answer').children
        this.answer_to = this.node.getChildByName('ques-box')
        this.answer = this.answerNode.map(c => c.children[0].getComponent(cc.Sprite))
        this.answerPos = this.answerNode.map(c => JSON.parse(JSON.stringify(c.position)))
        // 初始化问题
        this.quesList = this.gameNode.getQuesList()
    },

    start() {
        this.initQuestion()
        let self = this
        // 拖动物体移动, 回答问题
        this.node.on('on-queset-move', event => {
            let selectAns = event.target.name
            selectAns = selectAns.substr(selectAns.lastIndexOf(), selectAns.length)
            console.log('name', selectAns)
            let answer = this.curQuestion.answer
            if (selectAns.toLowerCase() === answer.toLowerCase()) {
                // todo Correct answer
                console.log('回答正确')
                setTimeout(() => {
                    this.nextQuest()
                }, 1000)
            } else {
                // todo Error answer
                console.log('回答错误')
                
                setTimeout(() => {
                    self.initQuestion(this.curQuesNumber)
                }, 1000)
            }
            if (this.curQuesNumber === this.quesList.length - 1) {
                // todo Answer completed
                alert('回答完成')
            }
        })

        // 拖动物体开始
        this.node.on('on-queset-start', event => {
        })
        // 拖动物体结束
        this.node.on('on-queset-end', event => {
        })
    },

    initQuestion(id = 0) {
        this.curQuestion = this.quesList[id]
        for (let index = 0; index < this.answerNode.length; index++) {
            // this.answerNode[index].setPosition(this.answerPos[index])
            this.answerNode[index].active = true
        }
        this.gameNode.setQuesSprite(this.answer[0], this.curQuestion.select_a)
        this.gameNode.setQuesSprite(this.answer[1], this.curQuestion.select_b)
        this.gameNode.setQuesSprite(this.answer[2], this.curQuestion.select_c)
        this.initQ()
        // 初始化问题选择位置
        this.randomPos()
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
