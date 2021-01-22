var ball;
var pos,database;

function setup(){
    createCanvas(500,500);
    database=firebase.database();
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    var ballPos=database.ref("ball/position");
    ballPos.on("value",readPos,showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref("ball/position").set({
        x:ball.x+x,
        y:ball.y+y
    })
   
}
function readPos(data){
    pos=data.val();
    ball.x=pos.x;
    ball.y=pos.y;
}
function showError(){
    console.log("ERROR")
    fill("red") 
    textSize(55)
    text("Error",30,30)
}