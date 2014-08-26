/**
 * Created by wanghe on 2014/8/13.
 */
var FGLayer = cc.Layer.extend({
    ctor:function(){
        this._super();

        this.init();
    },
    init:function () {
        this._super();

        var size = cc.Director.getInstance().getWinSize();

        cc.SpriteFrameCache.getInstance().addSpriteFrames(res.textureTablet_plist,res.textureTablet_png);
        var fg = cc.Sprite.createWithSpriteFrameName("baseUI/background_iPad.png");
        fg.setAnchorPoint(0, 0);
        fg.setPosition(0, 0);
        this.addChild(fg);
    }
})