const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var sceneimg,scene,heliImg,package;
var boy,boysad,boyhappy;
var button;
var rope,link,heli;

function preload()
{
  sceneimg = loadImage('images (1).jpg')
  heliImg = loadImage('helicopter.png')
  boysad = loadImage('12312.png')
  boyhappy = loadImage('123.png')
  packageImg = loadImage('package.png')
}
function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile)
  {
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth+100,displayHeight+100)
  }else
  {
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth,windowHeight)
  }

  engine = Engine.create();
  world = engine.world;

  rope = new Rope(2,{x:80,y:50});

  ground = new Ground(canW/2,canH-50,canW,20);

  heli = createSprite(180,canH-700,200,100);
  heli.addImage(heliImg);
  heli.scale = .5;

  button = createImg('cut_btn.png')
  button.position(10,canH-700);
  button.size(70,50);
  button.mouseClicked(drop);
  
  package = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,package);

  link = new Link(rope,package);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  

}

function draw() 
{
  background('white');
  image(sceneimg,000,000,600,700)

  push();
  imageMode(CENTER);
  if(package!=null){
    image(packageImg,package.position.x,package.position.y,70,70);
  }
  pop();
 
  push();
  imageMode(CENTER)
  image(boysad,460,300,90,90)
  pop();

  if(keyCode == RIGHT_ARROW && heli.x<550)
  {
    heli.x += 10;
  }
  if(keyCode == LEFT_ARROW && heli.x>0)
  {
    heli.x -= 10;
  }

  rope.show();
  Engine.update(engine);
  ground.show();
  drawSprites();
}
function drop()
{
  rope.break();
  link.detach();
  link = null;
}


