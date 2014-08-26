var MyLayer = cc.Layer.extend({
    size:null,
    init:function () {
        this._super();
        this.tagName = "slotRunningApp";
        size = cc.Director.getInstance().getWinSize();

//        this.testSwitchScene();
        this.start();
    },
    testSwitchScene:function(){
        var startItem = cc.MenuItemFont.create("Game Start",this.start,this);
        startItem.tagName = "gameStartBtn"
        var menu = cc.Menu.create(startItem);
        this.addChild(menu, 1);
    },
    start:function(sender){
        cc.log("begin to switch scene");

        //load resources
        cc.LoaderScene.preload(g_maingame, function () {
            var scene = new GameScene()
//            scene.initbyme();
            cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
        }, this);
    }
});

var MyScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MyLayer();
        this.addChild(layer);
        layer.init();
    }
});