/**
 * Created by wanghe on 2014/8/15.
 */
var PayTableLayer = cc.Layer.extend({
    size:null,
    closeBtn:null,
    touchCloseBtn:false,
    touchPage:false,
    touchBeginX:null,
    pages:null,
    pagesOriginalPos:null,
    pageWidth:null,
    pageOffsetX:60,
    currentPageIndex:null,
    isAvailableToMove:false,
    moveOffsetX:null,

    ctor:function(){
        this._super();
        this.setVisible(false);

        cc.SpriteFrameCache.getInstance().addSpriteFrames(res.textureAssets02_plist);
        cc.Director.getInstance().getTouchDispatcher()._addTargetedDelegate(this, 0, true);
        this.createUI();
    },
    createUI:function(){
        this.size = cc.director.getWinSize();

        var bgLayer = cc.LayerColor.create(cc.c4b(0, 0, 0, 200), this.size.width, this.size.height);
        bgLayer.setOpacity(150);
        this.addChild(bgLayer);

        this.createPages();

        this.closeBtn = cc.Sprite.createWithSpriteFrameName("button_close.png");
        var btnSize = this.closeBtn.getContentSize();
        this.closeBtn.setPosition(this.size.width-btnSize.width,this.size.height-btnSize.height);
        this.addChild(this.closeBtn);
    },
    show:function(isShow){
        if(isShow){
            this.touchCloseBtn = this.touchPage = false;
            this.touchBeginX = this.size.width/2;
            this.currentPageIndex = 0;
            this.isAvailableToMove = true;
        }
        this.setVisible(isShow);
    },
    createPages:function(){
        this.pages = cc.Layer.create();
        for (var i=0; i<4; i++) {
            var pageName = "HelpScreens_0"+(i+1)+".png";
            var page = cc.Sprite.createWithSpriteFrameName(pageName);
            if(this.pageWidth == null){
                this.pageWidth = page.getContentSize().width;
            }
            page.setPosition(i*(this.pageWidth+ this.pageOffsetX),0)
            this.pages.addChild(page);
        }
        this.pagesOriginalPos = cc.p(this.size.width/2,this.size.height/2+70);
        this.pages.setPosition(this.pagesOriginalPos.x,this.pagesOriginalPos.y);
        this.addChild(this.pages);
    },
    containTouchLocationOnCloseButton:function(touch){
        var getPoint = touch.getLocation();
        var contentSize  =  this.closeBtn.getContentSize();
        var myRect = cc.rect(0, 0, contentSize.width, contentSize.height);
        myRect._origin.x = this.closeBtn.getPosition().x-contentSize.width/2;
        myRect._origin.y = this.closeBtn.getPosition().y-contentSize.height/2;
        this.touchCloseBtn = cc.rectContainsPoint(myRect, getPoint);

        return this.touchCloseBtn;
    },
    containTouchLocationOnPages:function(touch){
        var getPoint = touch.getLocation();
        var myRect = cc.rect(20, 120, this.size.width-40, this.size.height-140);
        this.touchPage = cc.rectContainsPoint(myRect, getPoint);
        return this.touchPage;
    },
    onTouchBegan:function (touch, event) {
        var isClose = this.containTouchLocationOnCloseButton(touch);
        var isMove = this.containTouchLocationOnPages(touch);
        if (isClose){
            return true;//continue touch event
        }else{
            if(isMove && this.isAvailableToMove){
                this.touchBeginX = touch.getLocation().x;
                return true;
            }else{
                return false;
            }
        }
    },
    onTouchMoved:function(touch, event){
        if(!this.touchCloseBtn){
            var touchPoint = touch.getLocation();
            if(this.moveOffsetX == null){
                this.moveOffsetX = touchPoint.x - (-this.currentPageIndex*(this.pageWidth+ this.pageOffsetX)+this.pagesOriginalPos.x);
            }
            var currentX = touchPoint.x - this.moveOffsetX;
            this.pages.setPositionX(currentX);
        }
    },
    onTouchEnded:function (touch, event) {
        if(this.touchCloseBtn){
            this.show(false);
        }
        if(this.touchPage && this.isAvailableToMove){
            this.isAvailableToMove = false;
            var touchEndX = touch.getLocation().x;
            var moveDistance = this.touchBeginX - touchEndX;
            var moveToLeft = moveDistance>0?true:false;
            var offsetX = Math.abs(moveDistance);
            if(offsetX>this.size.width/3){//move
                var targetPageIndex = this.currentPageIndex;
                if(moveToLeft){
                    if(targetPageIndex<3){
                        targetPageIndex +=1;
                    }else{
                        targetPageIndex =3;
                    }
                }else{
                    if(targetPageIndex>0){
                        targetPageIndex -=1;
                    }else{
                        targetPageIndex =0;
                    }
                }
            }else{//return back
                     targetPageIndex = this.currentPageIndex;
            }
            var targetX = -targetPageIndex*(this.pageWidth+ this.pageOffsetX)+this.pagesOriginalPos.x;
            var moveAnim = cc.MoveTo.create(1, cc.p(targetX, this.pagesOriginalPos.y));
            var easeMove = cc.EaseOut.create(moveAnim,3);
            var onComplete = cc.CallFunc.create(this.onComplete,this,targetPageIndex);
            this.pages.runAction(cc.Sequence.create(easeMove, onComplete));
        }
    },
    onComplete: function (e,targetPageIndex) {
        this.isAvailableToMove = true;
        this.currentPageIndex = targetPageIndex;
        this.moveOffsetX = null;
//        cc.log("finish"+targetPageIndex)
    }
})