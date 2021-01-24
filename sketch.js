const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var bird1, bird2, bird3;

var birds=[];

var score=0;

var gameState = "onSling";

var birdSelectSound;
var birdFlySound;
var pigSnortSound;

function preload() {
    getTime();

    birdSelectSound=loadSound("sounds/bird_select.mp3");
    birdFlySound=loadSound("sounds/bird_flying.mp3");
    pigSnortSound=loadSound("sounds/pig_snort.mp3");
}

function setup(){
    var canvas = createCanvas(1200,400);
    canvas.position(15,70);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);
    bird1 = new Bird(150,170);
    bird2 = new Bird(100,170);
    bird3 = new Bird(50,170);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});

    birds=[bird3,bird2,bird1,bird];
}

function draw(){
    if (backgroundImg){
        background(backgroundImg);
    }
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.calculateScore();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.calculateScore();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    bird1.display();
    bird2.display();
    bird3.display();

    platform.display();
    //log6.display();
    slingshot.display();    

    text("score:"+score,1000,50);
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(birds[birds.length-1].body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
    birdFlySound.play();
}

function keyPressed(){
    if(keyCode === 32){
        birds.pop();
        Matter.Body.setPosition(birds[birds.length-1].body,{x:200,y:50});
        slingshot.attach(birds[birds.length-1].body);
        gameState = "onSling";
        //bird.trajectory=[];
        birdSelectSound.play();

    }
}

async function getTime(){
    var response = await fetch("https://worldtimeapi.org/api/timezone/America/Chicago");
    console.log(response);
    var responseData = await response.json();
    console.log(responseData);
    var dateTime = responseData.datetime;
    console.log(dateTime);
    var Hour = dateTime.slice(11,13);
    console.log(Hour);
    if (Hour>6&&Hour<18){
        backgroundImg=loadImage("sprites/bg.png");
    }
    else
    {
        backgroundImg=loadImage("sprites/bg2.jpg");
    }

}