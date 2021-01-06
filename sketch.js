var sword,swordE;
var fruitGroup,f1,f2,f3,f4;
var enemyGroup,e1,e2;
var score;
var gameOver,gameOverS,gameOverE;
var knifeSwoosh;

var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  
  swordE=loadImage("sword.png");
  f1=loadImage("fruit1.png");
  f2=loadImage("fruit2.png");
  f3=loadImage("fruit3.png");
  f4=loadImage("fruit4.png");
  e1=loadImage("alien1.png");
  e2=loadImage("alien2.png");
  gameOverE=loadImage("gameover.png");
  gameOverS=loadSound("gameover.mp3");
  knifeSwoosh=loadSound("knifeSwooshSound.mp3")
 
}

function setup(){
  createCanvas(500,500);
  
  sword = createSprite(250,470,10,10);
  sword.addImage(swordE);
  sword.scale=0.7;
  
  fruitGroup = new Group();
  enemyGroup = new Group();
  
  gameOver = createSprite(250,230,30,30);
  gameOver.addImage(gameOverE);
  gameOver.scale=1.5;
  gameOver.visible=false;
  
  score=0;
}

function draw(){
  background("lightgreen");
  textSize(20);
  text("Score:"+ score,420,30);
  
  if(gameState===PLAY){
    
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    fruits();
    enemies();
    if(sword.isTouching(fruitGroup)){
      knifeSwoosh.play();
      fruitGroup.destroyEach();
      score=score+2;
    }
    if(sword.isTouching(enemyGroup)){
      fruitGroup.destroyEach();
      enemyGroup.destroyEach();
      gameOverS.play();
      gameState=END;
    }
    
  }
    else if(gameState===END){
      
    gameOver.visible=true;
    sword.x=250;
    sword.y=250;
    sword.setVelocity(0,0);
    fruitGroup.velocityY=0;
    enemyGroup.velocityX=0;
  }
 
  drawSprites();
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20)
    fruit.scale=0.2;
    r=Math.round(random(1,4));
    if(r==1){
      fruit.addImage(f1);
    }else if(r==2){
      fruit.addImage(f2);
    }else if(r==3){
      fruit.addImage(f3);
    }else {
      fruit.addImage(f4);
    }
  
  fruit.velocityY=6;
  fruit.lifetime=100;
  fruit.x=Math.round(random(10,450));
  
  fruitGroup.add(fruit);
  
  }
}

function enemies(){
  if(World.frameCount %200===0){
    enemy=createSprite(400,200,20,20);
    enemy.scale=0.5;
    n=Math.round(random(1,3));
    if(n==1){
      enemy.addImage(e1);
    }else if(n==2){
      enemy.addImage(e2);
    }else {
      enemy.addImage(e1);
    }
  
  enemy.y=Math.round(random(45,390));
  enemy.velocityX=-8;
  enemy.setlifetime=50;
  
  enemyGroup.add(enemy);
    
  }
}






