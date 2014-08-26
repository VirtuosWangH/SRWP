/**
 * Created by wanghe on 2014/8/13.
 */
var BGLayer = cc.Layer.extend({
    ctor:function(){
       this._super();

       this.init();
    },
    init:function () {
        this._super();

        var size = cc.Director.getInstance().getWinSize();

        cc.SpriteFrameCache.getInstance().addSpriteFrames(res.textureTablet_plist,res.textureTablet_png);
        var bg = cc.Sprite.createWithSpriteFrameName("baseUI/background_wood_ipad.png")
        bg.setPosition(cc.p(size.width/2,size.height/2));
        this.addChild(bg)
    }
})
