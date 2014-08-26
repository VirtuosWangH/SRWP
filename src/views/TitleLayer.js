/**
 * Created by wanghe on 2014/8/19.
 */
var TitleLayer = cc.Layer.extend({
    normalTitle:null,
    bigWinTitle:null,
    fiveWinTitle:null,
    wildMatchTitle:null,
    titleAry:null,
    hideY:100,
    currentTitle:null,
    targetTitle:null,
    ctor: function () {
        this._super();
        cc.SpriteFrameCache.getInstance().addSpriteFrames(res.textureTablet_plist,res.textureTablet_png);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(res.textureAssets02_plist,res.textureAssets02_png);
        this.createUI();
    },
    createUI:function(){
        var size = cc.director.getWinSize();

        this.normalTitle = cc.Sprite.createWithSpriteFrameName("baseUI/title.png");
        this.addChild(this.normalTitle);

        this.titleAry = [];
        this.bigWinTitle = cc.Sprite.createWithSpriteFrameName("bigWin.png");
        this.fiveWinTitle = cc.Sprite.createWithSpriteFrameName("fiveOfAKind.png");
        this.wildMatchTitle = cc.Sprite.createWithSpriteFrameName("wildMatch.png");
        this.titleAry.push(this.bigWinTitle,this.fiveWinTitle,this.wildMatchTitle);

        this.currentTitle = this.normalTitle;

        this.layoutUI()
    },
    layoutUI:function(){
        var num = this.titleAry.length;
        for (var i=0; i<num; i++) {
            var title = this.titleAry[i];
            title.setPosition(0,this.hideY)
            this.addChild(title);
        }
    },
    switchTitle:function(titleName){
        switch (titleName) {
            case "bigWin" :
                this.targetTitle = this.bigWinTitle;
                break;
            case "fiveOfAKind" :
                this.targetTitle = this.fiveWinTitle;
                break;
            case "wildMatch" :
                this.targetTitle = this.wildMatchTitle;
                break;
            default :
                this.targetTitle = this.normalTitle;
                break;
        }
        if(this.currentTitle != this.targetTitle){
            var hidAnim = cc.MoveTo.create(0.3, cc.p(0, this.hideY));
            var easeMove = cc.EaseSineIn.create(hidAnim);
            var onComplete = cc.CallFunc.create(this.showTargetTitle,this);
            this.currentTitle.runAction(cc.Sequence.create(easeMove, onComplete));
        }
    },
    showTargetTitle:function(){
        var showAnim = cc.MoveTo.create(0.5, cc.p(0, 0));
        var easeMove = cc.EaseSineOut.create(showAnim);
        var onComplete = cc.CallFunc.create(this.completeSwitchTitle,this);
        this.targetTitle.runAction(cc.Sequence.create(easeMove, onComplete));
    },
    completeSwitchTitle:function(){
        this.currentTitle = this.targetTitle;
    }
})