// 所有游戏继承于此, 属于游戏中的问题数据基类
var http = require('../utils/CusHttp')
cc.Class({
  extends: cc.Component,
  properties: {
    GameId: '001',
    gameConfig: { type: cc.JsonAsset, default: null },
    dataList: { type: cc.JsonAsset, default: null },
    datauRL: { type: String, default: '/json/game-question.json' },
    audioManager: null,
    currentNumber: 0,
    // 私有变量
    _quesList: [],
    _curQues: null,
    
    // audio 属性
    _curAudioId: -1
  },
  onLoad() {
    new http().Get(this.datauRL, (res) => {
      console.log(res);
      // this.questionList = res.data
    })
    let xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
    //     var response = xhr.responseText;
    //     console.log('data json', response);
    //   }
    // };
    // xhr.open("GET", this.datauRL, true);
    // xhr.send();

    // 本地获取
    let qlist = this.dataList.json
    // 初始化问题数据
    let gid = this.GameId
    this._quesList = qlist.filter(q => q.game_id == gid)
  },
  start() { },

  // 获取数据列表
  getQuesList() {
    return this._quesList
  },
  findQues(id = 0) {
    if (id < this._quesList.length) {
      return this._quesList[id]
    }
    return this._quesList[this.currentNumber]
  },
  // 获取当前数据
  getCurQues() {
    return this._quesList[this.currentNumber]
  },
  nextQuest() {
    if (this.currentNumber + 1 < this._quesList.length) {
      this.currentNumber++
      this._curQues = this._quesList[this.currentNumber]
      return this._curQues
    }
    return null
  },
  /**
   * 播放音频
   * @param {放博的音频name} audio 
   * @param {*} loop 
   */
  playAudio(audio, loop = false) {
    if (typeof audio === 'string') {
      cc.loader.loadRes(audio, cc.AudioClip, (err, clip) => {
        if(!err) {
          cc.audioEngine.stop(this._curAudioId);
          this._curAudioId = cc.audioEngine.play(clip, false);
        }
      })
    } else {
      cc.audioEngine.play(audio, loop)
    }
  },

  /**
   * 播放远程音频
   * @param {audioUrl} audio 
   */
  playAudioUrl(audio) {
    let urlString = "https://om4y4iln5.qnssl.com/20070319_7053ea59d8c72cae65f0ODfWRZhfVBhP.wav";
    let self = this
    if (self.audioManager == null) {
      console.error('audioManager emtpy')
      return
    }
    cc.loader.load(audio, function (err, tex) {
        if (err) {
          console.error('load audio error')
          return 
        }
        self.audioManager.playAudioClip(tex);
    });
  },

  /**
   * 停止所有播放
   */
  stopAudioAll() {
    cc.audioEngine.stopAll();
  },
  /**
   * 加载图片
   * @param {*} sprite 
   * @param {*} filename 
   */
  setResSprite(sprite, filename) {
    if (typeof filename === 'string') {
      if (!sprite) {
        cc.error('BaseGame set sprite error');
        return
      }
      cc.loader.loadRes(filename, cc.SpriteFrame, function (err, spriteFrame) {
        if (err) {
          cc.error(err.message || err);
          return;
        }
        sprite.spriteFrame = spriteFrame
      });
    }
  }

})
