/**
 * Created by wanghe on 2014/8/13.
 */
var ControlBarLayer = cc.Layer.extend({
    curScene:null,
    spinBtn:null,
    isShowPayTable:false,
    ctor:function(){
        this._super();
        this.tagName = "controlBar"
        var size = cc.director.getWinSize();

        cc.SpriteFrameCache.getInstance().addSpriteFrames(res.textureControl_plist,res.textureControl_png);
        var bg = cc.Sprite.createWithSpriteFrameName("GamecontrolsBg.png");
        this.addChild(bg);

        var spinNormal = cc.Sprite.createWithSpriteFrameName("SpinBtn.png");
        var spinSelect = cc.Sprite.createWithSpriteFrameName("SpinBtn.png");
        spinSelect.setScale(0.9,0.9);
        var spinDisable = cc.Sprite.createWithSpriteFrameName("SpinBtn.png");
        this.spinBtn = cc.MenuItemSprite.create(spinNormal, spinSelect, spinDisable,this.onSpin.bind(this));

        var psyTableNormal = cc.Sprite.createWithSpriteFrameName("PaytableBtn.png");
        var psyTableSelect = cc.Sprite.createWithSpriteFrameName("PaytableBtn.png");
        var psyTableDisable = cc.Sprite.createWithSpriteFrameName("PaytableBtn.png");
        var payTableItem = cc.MenuItemSprite.create(psyTableNormal,psyTableSelect,psyTableDisable,this.onPaytable,this);

        var betMaxNormal = cc.Sprite.createWithSpriteFrameName("BetMaxBtn.png");
        var betMaxSelect = cc.Sprite.createWithSpriteFrameName("BetMaxBtn.png");
        betMaxSelect.setScale(0.9,0.9);
        var betMaxItem = cc.MenuItemSprite.create(betMaxNormal,betMaxSelect,null,this.onBetMax,this);

        var betOneNormal = cc.Sprite.createWithSpriteFrameName("BetOneBtn.png");
        var betOneSelect = cc.Sprite.createWithSpriteFrameName("BetOneBtn.png");
        betOneSelect.setScale(0.9,0.9)
        var betOneItem = cc.MenuItemSprite.create(betOneNormal,betOneSelect,null,this.onBetOne,this);

        var menu = cc.Menu.create(payTableItem,betOneItem,betMaxItem,this.spinBtn);
        menu.alignItemsHorizontallyWithPadding(10);

        menu.setPosition(bg.getPositionX(),bg.getPositionY());
        this.addChild(menu, 1);
    },
    onEnter:function(){
        this._super();
    },
    onSpin:function (pSender) {
        this.curScene.startSpin();
        this.curScene.showWins(false);
    },
    onPaytable:function (pSender) {
        this.isShowPayTable = !this.isShowPayTable;
        this.curScene.showPayTable(this.isShowPayTable);
    },
    onBetMax:function(){
        this.curScene.showWins(false);
        this.curScene.betLineChange(50);
    },
    onBetOne:function(){
        this.curScene.showWins(false);
        this.curScene.addOneBetLine();
    }
})