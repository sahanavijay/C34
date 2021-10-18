const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine,world;

var rope,fruit,ground;
var bg_img,food,ganesh;
var eat,sad;

var rope,rope2,rope3;

var fruit_con,fruit2_con,fruit3_con;
var button,button1,button2;

var canW;
var canH;

function preload()
{
  bg_img = loadImage('background.jpg');
  food = loadImage('Laddu.jpg');
  eat = loadImage("Eat.jpg");
  sad = loadImage("Sad.jpg");
  
}

function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  if(isMobile){
    canW=displayWidth;
    canH=displayHeight;
    createCanvas(displayWidth+80,displayHeight)
  }
  else{
    canW=windowWidth;
    canH=windowHeight;
    createCanvas(windowWidth,windowHeight)
  }

  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button1 = createImg('cut_btn.png');
  button1.position(330,35);
  button1.size(60,60);
  button1.mouseClicked(drop2);

  button2 = createImg('cut_btn.png');
  button2.position(360,200);
  button2.size(60,60);
  button2.mouseClicked(drop3);

  rope = new Rope (8,{x:40,y:30});
  rope2 = new Rope (7,{x:370,y:40});
  rope3 = new Rope (4,{x:400,y:225});

  ground = new Ground(200,canH,600,20);
  eat.frameDelay = 20;

  ganesh = createSprite(170,canH-80,100,100);
  ganesh.scale = 0.2;

  ganesh.addAnimation('eating',eat);
  ganesh.addAnimation('crying',sad);
  
  food = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit2_con = new Link(rope2,fruit);
  fruit3_con = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,ganesh)==true)
  {
    ganesh.changeAnimation('eating');
  }

  if(fruit!=null && fruit.position.y>=650)
  {
    ganesh.changeAnimation('crying');
    fruit=null;
     
  }
   
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop2()
{
  rope2.break();
  fruit2_con.detach();
  fruit2_con = null; 
}

function drop3()
{
  rope3.break();
  fruit3_con.detach();
  fruit3_con = null; 
}

function collide(body,sprite)
{
  if(body!=null)
  {
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d<=80)
    {
      World.remove(engine.world,fruit);
      fruit = null;
      return true; 
    }
    else
    {
     return false;
    }
  }
}





