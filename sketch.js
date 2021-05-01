var gameState;
var PLAY;
var END;
var gameState = "PLAY"

var climber, createClimber, climberGroup;
var door, createDoor, doorGroup;
var tower, createTower;
var spooky;
var ghost, ghostRunning
var invisibleGround;

var score;

function preload() {
  
  createClimber = loadImage('climber.png');
  createDoor = loadImage('door.png');
  createTower = loadImage('tower.png');
  ghostRunning = loadImage('ghost-standing.png');
  ghostRunning = loadImage('ghost-jumping.png');
  spooky = loadSound('spooky.wav');
  
}

function setup() {
  createCanvas(600,600);
  spooky.loop();
  
  tower = createSprite(300,300);
  tower.addImage(createTower);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost", ghostRunning);
  ghost.scale = 0.3;
  
  invisibleGround = createSprite(200,590,800,20);
  
  doorGroup = new Group();
  climberGroup = new Group();
  
  score=0;
}

function draw() {
  background(0);
  
  stroke("yellow");
  fill("yellow");
  textSize(30);
  text("Score:", score, 300, 300);
  
  if(gameState === "PLAY") {
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
  }
    spawnDoors();
  
  drawSprites();
    if(climberGroup.isTouching(ghost)){
      ghost.velocityY = 0;
      gameState = "END"
      
}
  if(invisibleGround.isTouching(ghost)){
      ghost.velocityY = 0;
      gameState = "END"
      
}
    
  }
  if (gameState === "END"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    
    door.addImage(createDoor);
    climber.addImage(createClimber);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
  

    
    //add each door to the group
    doorGroup.add(door);
    climberGroup.add(climber);
    
  }
}
} 