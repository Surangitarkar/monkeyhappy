var player, player_running;
var banana, bananaImage, bananaGroup;
var obstacleImage, obstacleGroup,obstacle;
var invisibleground;
var scene, backImage;
var score, a;
var PLAY, END, gamestate;
var gameover, gameoverImg, restart, restartImg;

function preload() {
  player_running=
  loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage=loadImage("banana.png");
  backImage=loadImage("jungle2.jpg");
  obstacleImage=loadImage("stone.png");
  gameoverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png");
}
function setup() {
  createCanvas(800, 400);
  
  scene=createSprite(0,0,800,400);
  scene.scale=1.5;
  scene.addImage("scene",backImage);
  scene.velocityX=-4;
  scene.x=scene.width/2;
  
  invisibleground= createSprite(400,360,800,20);
  invisibleground.visible=false;
  
  player=createSprite(60,340,20,20);
  player.addAnimation("running",player_running);
  player.scale=0.10;
  
  bananaGroup= new Group();
  obstacleGroup= new Group();
  
  score=0;
  
  a=0;
  
  PLAY=1;
  END=0;
  gamestate=PLAY;
  
  gameover= createSprite(340,200,20,20);
  gameover.addImage("gameover",gameoverImg);
  gameover.scale=0.5;
  gameover.visible=false;
  restart= createSprite(340,240,20,20);
  restart.addImage("restart",restartImg);
  restart.scale=0.5;
  restart.visible=false;
  
  textSize(20);
  fill("white");
  stroke("white");
}

function draw() {
  background(220);
  
  player.collide(invisibleground);
  
  if (gamestate===PLAY){
    Banana();
    Obstacle();
    
    scene.velocityX=-4;
    if(scene.x<100){
      scene.x=scene.width/2; 
    }
    
    if (keyDown("space")&&player.y>180){
      player.velocityY=-14;
    }
  
    player.velocityY=player.velocityY+0.8;
    if(bananaGroup.isTouching(player)){
         score=score+2;
         bananaGroup.destroyEach();
       }
  
    switch(score){
      case 10: player.scale=0.12;
        break;
      case 20: player.scale=0.14;
        break;
      case 30: player.scale=0.16;
        break;
      case 40: player.scale=0.18;
        break;
      default: break;
    }
  
    if (obstacleGroup.isTouching(player)){
      a=a+1;
      player.scale=0.10;
      obstacleGroup.destroyEach();
   }
    
    
  }
  
  if(a===2){
        gamestate=END;
      }
  if (gamestate===END){
    gameover.visible=true;
    restart.visible=true;
    scene.velocityX=0;
    player.velocityY=0;
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    reset();
  }
  
  drawSprites();
  text("score: "+score,500,40);
}

function Banana()
{
  if(frameCount%140===0)
  {
   banana= createSprite(800,random(215,270),20,20);
    banana.addImage("banana",bananaImage);
    banana.velocityX=-4;
    banana.scale=0.05;
    banana.lifetime=210;
    bananaGroup.add(banana);
  }
}

function Obstacle()
{
  if (frameCount%300===0)
  {
    obstacle= createSprite(800,360,20,20);  
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.velocityX=-4;
    obstacle.scale=0.12;
    obstacle.lifetime=210; 
    obstacleGroup.add(obstacle);
  }
}

function reset(){
   if(mousePressedOver(restart)){
      gameover.visible=false;
      restart.visible=false;
      gamestate=PLAY;
      score=0;
      a=0;
   }
}


