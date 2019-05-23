//游戏管理器
var GameManager = cc.Class({
  extends: cc.Component,

  properties: {
            
  },
  statics:{
      self:null,
       getInstance:function()
       {
              if(GameManager.self==null)
              {
                  var node=new cc.Node("GameManager");
                  GameManager.self=node.addComponent(GameManager);
              }
              return GameManager.self;
       } 
  },

ctor() //构造函数
  {
      this.scene=new Array();
      GameManager.self=this;
  },
  onLoad () {
      cc.game.addPersistRootNode(this.node);     //常驻节点
  },
})
