
var monkey , monkey_running, ground;
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score=0;
var gameState="play";

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(550,450);
  
  monkey= createSprite(70,400,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.15;
  
  ground= createSprite(225,430,1100,20);
  ground.x=ground.width/2;
  
  bananaGroup= new Group();
  obstacleGroup= new Group();
  
}


function draw() {
  
  background("white");
  
  if(gameState=="play"){
    
    ground.velocityX=-5;
  if(ground.x<0){
    ground.x=ground.width/2;
  }
    if(keyDown("space") && monkey.y>300){
    monkey.velocityY=-13;
  }
  monkey.velocityY=monkey.velocityY+0.5;
  
  food();
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score=score+2;
  }
  
  rocks();
  }
  
  
  monkey.collide(ground);
  
  
  
  if(obstacleGroup.isTouching (monkey)){
    
    gameState="end";
    
  }
  
  if(gameState=="end"){
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    ground.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    monkey.velocityY=0;  
    
    textSize(20);
    fill("red");
    text("Press R to Restart",200,200);
    noFill();
  }
  
  if(keyDown('r')&& gameState=="end"){
    gameState="play";
    score=0;
  }
  drawSprites();
  textSize(18);
  fill("black");
  text("Score:"+" "+score,460,20);
  noFill();

  
}
function food(){
  
  if(frameCount%100==0){
  banana=createSprite(520,Math.round(random(100,250)),20,20);
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.velocityX=-5;
  banana.lifetime=110;
  bananaGroup.add(banana);
  }  
  
}
function rocks(){
  
  if(Math.round(random(frameCount))%80==0){
  obstacle= createSprite(520,390,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.15;
  obstacle.velocityX=-6;
  obstacle.lifetime=110;
  obstacleGroup.add(obstacle);
  }
  
  
}






