
var itemsLayer;
var basket;
var xSpeed = 0;
var left;
var right;
var scoreCount=0;
var eggCount=0;
var missedCount=0;

var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        
        
        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;


        
        
        
        var bg = cc.Sprite.create("res/tree.png");
        bg.setAnchorPoint(cc.p(0.5,0.5));
        bg.setPosition(cc.p(size.width/2,size.height/2.35));
        bg.setScale(.6,.6);
        this.addChild(bg);

        var score = cc.Sprite.create("res/score.png");
        score.setAnchorPoint(cc.p(0.5,0.5));
        score.setPosition(cc.p(size.width/1.15,size.height/10));
        score.setScale(.06,.06);
        this.addChild(score);

 
        

        var bird1 = cc.Sprite.create("res/bird1.png");
        bird1.setAnchorPoint(cc.p(0.5,0.5));
        bird1.setPosition(cc.p(size.width/5,size.height/1.2));
        bird1.setScale(.08,.08);
        this.addChild(bird1);

        var bird2 = cc.Sprite.create("res/bird2.png");
        bird2.setAnchorPoint(cc.p(0.5,0.5));
        bird2.setPosition(cc.p(size.width/2.7,size.height/1.2));
        bird2.setScale(.08,.08);
        this.addChild(bird2);

        var bird3 = cc.Sprite.create("res/bird3.png");
        bird3.setAnchorPoint(cc.p(0.5,0.5));
        bird3.setPosition(cc.p(size.width/2,size.height/1.2));
        bird3.setScale(.08,.08);
        this.addChild(bird3);

        var bird4 = cc.Sprite.create("res/bird4.png");
        bird4.setAnchorPoint(cc.p(0.5,0.5));
        bird4.setPosition(cc.p(size.width/1.5,size.height/1.2));
        bird4.setScale(.08,.08);
        this.addChild(bird4);

        itemsLayer = cc.Layer.create();
        this.addChild(itemsLayer);
        topLayer = cc.Layer.create();
        this.addChild(topLayer);
        basket = cc.Sprite.create("res/basket.png");
        topLayer.addChild(basket,0);
        basket.setPosition(240,50);
        this.schedule(this.addItem,1);
/*        
        left = cc.Sprite.create("res/leftArrow.png");
        topLayer.addChild(left,0);
        left.setPosition(60,160);
        left.setOpacity(128);
        right = cc.Sprite.create("res/rightArrow.png");
        topLayer.addChild(right,0);
        right.setPosition(740,160);
        right.setOpacity(128);
*/        
        this.schedule(this.addItem,1);
        //cc.eventManager.addListener(touchListener, this);
        this.scheduleUpdate();
    
        
        var score = cc.Sprite.create("res/score.png");
        score.setAnchorPoint(cc.p(0.5,0.5));
        score.setPosition(cc.p(size.width/1.15,size.height/10));
        score.setScale(.06,.06);
        this.addChild(score);

        scoreText = cc.LabelTTF.create("Score: 0","Arial","28",cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(scoreText);
        scoreText.setPosition(700,50);


      
        



//Drag with mouse or touch

         var listener = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function (touch, event) {     
                    var target = event.getCurrentTarget();
                    var location = target.convertToNodeSpace(touch.getLocation());
                    var targetSize = target.getContentSize();
                    var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
                     if (cc.rectContainsPoint(targetRectangle, location)){
                        
                        return true;
                     }      
                },
                onTouchMoved: function(touch,event){
                   
                    var target = event.getCurrentTarget();
                    var location = target.convertToNodeSpace(touch.getLocation());
                    basket.setPosition(touch.getLocation().x,50);
                    return true;
                }
            });   
            cc.eventManager.addListener(listener, basket);     
/*
        var touchListener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
        if(touch.getLocation().x < 400){
        xSpeed = -2;
        left.setOpacity(255);
        right.setOpacity(128);
        }
        else{
        xSpeed = 2;
        right.setOpacity(255);
        left.setOpacity(128);
        }
        return true;
        
        },
        onTouchEnded:function (touch, event) {
        xSpeed = 0;
        left.setOpacity(128);
        right.setOpacity(128);
        }

        });

        cc.eventManager.addListener(touchListener, this);
*/



    },
    addItem:function(){
    var item = new Item();
    itemsLayer.addChild(item,1);
    },
    removeItem:function(item){
    itemsLayer.removeChild(item);
    },
    update:function(dt){
        if((eggCount-scoreCount)==12){
        var gameOver = cc.Sprite.create("res/gameOver.png");
        gameOver.setPosition(400,230);
        gameOver.setScale(.4,.4);
        this.addChild(gameOver);

        scoreText1 = cc.LabelTTF.create("Game Over","Arial","38",cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(scoreText1);
        scoreText1.setPosition(385,230);
        
        scoreText2 = cc.LabelTTF.create("Your Score: 0","Arial","25",cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(scoreText2);
        scoreText2.setPosition(385,170);

        scoreText2.setString("Your Score: "+scoreCount*10);
        scoreCount=0;
        eggCount=0;
        setTimeout(function(){ cc.director.runScene(new HelloWorldScene()); }, 3000);


    }
    }

    
});


var Item = cc.Sprite.extend({
    ctor:function() {
    this._super();
    if(Math.random()<0.1){
    this.initWithFile("res/egg4.png");
    //this.isEgg=true;
    eggCount++;
    }
    else{
    this.initWithFile("res/egg.png");
    //this.isEgg=false;
    eggCount++;
    }

    },
    onEnter:function() {
    this._super();
    var ranInt=Math.round(Math.random()*4)+1;
    switch(ranInt){
    case 1:
    this.setPosition(150,330);
    var moveAction = cc.MoveTo.create(8, new cc.Point(150,-50));
    this.runAction(moveAction);
   
  
    break;
    case 2:
    this.setPosition(300,330);
    var moveAction = cc.MoveTo.create(8, new cc.Point(300,-50));
    this.runAction(moveAction);
   
      
    break;
    case 3:
    this.setPosition(400,330);
    var moveAction = cc.MoveTo.create(8, new cc.Point(400,-50));
    this.runAction(moveAction);
  
   
    
    break;
    case 4:
    this.setPosition(530,330);
    var moveAction = cc.MoveTo.create(8, new cc.Point(530,-50));
    this.runAction(moveAction);
   
   
    break;
    }


    this.scheduleUpdate();
    },
    update:function(dt){
    if(xSpeed>0){
    basket.setFlippedX(true);
    }
    if(xSpeed<0){
    basket.setFlippedX(false);
    }

   // basket.setPosition(basket.getPosition().
   // x+xSpeed,basket.getPosition().y);

    
    //if(this.getPosition().y<=0){missedCount++;}
    //cc.log(missedCount);
    

    var basketBoundingBox = basket.getBoundingBox();
    var eggBoundingBox = this.getBoundingBox();
    if(cc.rectIntersectsRect(basketBoundingBox,eggBoundingBox)){
    
    this.setPosition(-50,-50);
    if((eggCount-scoreCount)<=12){
        scoreCount++;
    }


    scoreText.setString("Score: "+scoreCount*10);
    
    
    }

   
    
}
});

       




var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        layer.init();
        this.addChild(layer);
    }
});

