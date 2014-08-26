/**
 * Created by wanghe on 2014/8/19.
 */
var BetLineSelectorLayer = cc.Layer.extend({
    curScene:null,
    startX:50,
    startY:175,
    endY:592,
    leftSlider:null,
    rightSlider:null,
    currentSlider:null,
    isAvailableToMove:true,
    currentBetLine:50,

    ctor: function () {
        this._super();
        cc.SpriteFrameCache.getInstance().addSpriteFrames(res.textureTablet_plist,res.textureTablet_png);
        cc.Director.getInstance().getTouchDispatcher()._addTargetedDelegate(this, 0, true);
        this.createUI();
        this.currentSlider = this.leftSlider;
    },
    createUI:function(){
        var size = cc.director.getWinSize();
        var leftBg = cc.Sprite.createWithSpriteFrameName("baseUI/Slider_track.png");
        leftBg.setPosition(this.startX,size.height/2)
        this.addChild(leftBg);

        var rightBg = cc.Sprite.createWithSpriteFrameName("baseUI/Slider_track.png");
        rightBg.setPosition(size.width-this.startX,leftBg.getPosition().y);
        this.addChild(rightBg);

        this.leftSlider = cc.Sprite.createWithSpriteFrameName("baseUI/Slider_ball.png");
        this.leftSlider.setPosition(this.startX,this.endY);
        this.addChild(this.leftSlider);

        var numTF = cc.LabelTTF.create("50",null,30,cc.size(30,30), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        numTF.setPosition(30,40);
        numTF.setTag("slider");
        this.leftSlider.addChild(numTF);

        this.rightSlider = cc.Sprite.createWithSpriteFrameName("baseUI/Slider_ball.png");
        this.rightSlider.setPosition(size.width-this.startX,this.endY);
        this.addChild(this.rightSlider);

        var numRTF = cc.LabelTTF.create("50",null,30,cc.size(30,30), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        numRTF.setPosition(30,40);
        numRTF.setTag("sliderR");
        this.rightSlider.addChild(numRTF);
    },
    containTouchLocationSlider:function(touch){
        var getPoint = touch.getLocation();
        var contentSize  =  this.currentSlider.getContentSize();
        var myRect = cc.rect(0, 0, contentSize.width, contentSize.height);
        myRect._origin.x = this.currentSlider.getPosition().x-contentSize.width/2;
        myRect._origin.y = this.currentSlider.getPosition().y-contentSize.height/2;
        var startMove = cc.rectContainsPoint(myRect, getPoint);

        return startMove;
    },
    setMoveState:function(canMove){
        this.isAvailableToMove = canMove;
    },
    onTouchBegan:function (touch, event) {
        var isMove = this.containTouchLocationSlider(touch);
        if(isMove && this.isAvailableToMove){
            return true;
        }else{
            return false;
        }
    },
    onTouchMoved:function(touch, event){
        var touchPoint = touch.getLocation();
        var touchY = touchPoint.y;
        var targetY = 0;
        if(touchY<this.startY){
            targetY = this.startY;
        }else if(touchY>this.endY){
            targetY = this.endY;
        }else{
            targetY = touchY;
        }
        this.leftSlider.setPositionY(targetY);
        this.rightSlider.setPositionY(targetY);

        var allDistance = this.endY - this.startY;
        var everyDistance = allDistance/50;
        var slideDistance = targetY - this.startY;
        var currentBetNum;
        if(slideDistance<=everyDistance){
            currentBetNum = 1
        }else{
            currentBetNum = Math.ceil(slideDistance/everyDistance);
        }

        this.leftSlider.getChildByTag("slider").setString(currentBetNum);
        this.rightSlider.getChildByTag("sliderR").setString(currentBetNum);

        if(currentBetNum>22){
            currentBetNum = 22
        }
        if(this.currentBetLine!=currentBetNum){
            this.currentBetLine = currentBetNum;
            this.curScene.betLineChange(currentBetNum);
        }
    },
    onTouchEnded:function (touch, event) {
        cc.log("===========");
    },
    updateBetLine:function(num){
        var allDistance = this.endY - this.startY;
        var everyDistance = allDistance/50;
        var targetY;
        if(num<2){
            targetY = this.startY;
        }else{
            targetY = num*everyDistance+this.startY;
        }

        this.leftSlider.setPosition(this.startX,targetY);
        this.rightSlider.setPosition(size.width-this.startX,targetY);
        this.leftSlider.getChildByTag("slider").setString(num);
        this.rightSlider.getChildByTag("sliderR").setString(num);
    }
})