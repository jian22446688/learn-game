// 所有游戏继承于此, 属于游戏中的问题数据基类
var http = require('../utils/CusHttp')
cc.Class({
  extends: cc.Component,
  properties: {
    GameId: '001',
    gameConfig: { type: cc.JsonAsset, default: null },
    dataList: { type: cc.JsonAsset, default: null },
    datauRL: { type: String, default: '/json/game-question.json' },
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
  // 获取当前数据
  getCurQues() {
    return this._curQues
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
