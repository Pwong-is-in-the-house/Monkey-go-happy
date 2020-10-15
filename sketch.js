var PLAY=0;
var END=0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup;
var Score;
var ground;
var obstacles, food;
var bananas

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 600);
  
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("running", monkey_running)
  monkey.scale=0.1;
  
  ground=createSprite(400,350,1000,10)
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
 obstacleGroup = new Group(); 
foodGroup= new Group();
  score=0
}


function draw() {
  background("silver");
  
    if (gameState===PLAY){
if(keyDown("space") && monkey.y >= 159) {
    
      monkey.velocityY = -12;
    }
      
    monkey.velocityY = monkey.velocityY + 0.8
      
       monkey.collide(ground);
      if (ground.x < 0){
      ground.x = ground.width/2;
    }
      if (foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
          stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 400,50);
    }
    if(obstacleGroup.isTouching(monkey)){
        gameState = END;
     
     
    }

   else if (gameState === END) {
     
      ground.velocityX = 0;
      monkey.velocityY = 0
     
      
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);
   }}
  
 
      spawnbanana();
      spawnObstacles();
  

drawSprites();

  
    stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
}

function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacles = createSprite(400,340,10,40);
   obstacles.velocityX = -6
obstacles.addImage(obstacleImage);
   
            
    obstacles.scale = 0.1;
    obstacles.lifetime = 300;
   

    obstacleGroup.add(obstacles);
 }
}

function spawnbanana() {
  if (frameCount % 80 === 0) {
     banana = createSprite(600,80,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
   banana.scale = 0.1 ;
    banana.velocityX = -3;

    banana.lifetime = 250;
   foodGroup.add(banana);
    }
}
 






