song ="";
lefthand_x=0;
lefthand_y=0;
righthand_x=0;
righthand_y=0;
scoreleft=0;
scoreright=0;
function preload(){
song= loadSound("music.mp3");

}

function setup(){
    canvas= createCanvas(600,500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelloaded);
    poseNet.on('pose',gotposes);
}

function modelloaded(){
    console.log('POSENET IS ON!!!!!');
}

function gotposes(results,error){
    if(results.length > 0){
        console.log(results);
scoreleft=results[0].pose.keypoints[9].score;
scoreright=results[0].pose.keypoints[10].score;
console.log("scoreLeftWrist = "+scoreleft +"scorerightWriht= "+scoreright );

        lefthand_x=results[0].pose.leftWrist.x;
        lefthand_y=results[0].pose.leftWrist.y;
        console.log("left hand x = "+lefthand_x+"left hand y = "+lefthand_y);

        righthand_x=results[0].pose.rightWrist.x;
        righthand_y=results[0].pose.rightWrist.y;
        console.log("right hand x = "+righthand_x+"right hand y = "+righthand_y);
    }
    
}

function draw(){
    image(video,0,0,600,500);

    fill("#000000");
    stroke("#3fd1a8");

    if(scoreright>=0.2){

    
    circle(righthand_x,righthand_y,20);

    if(righthand_y >0 && righthand_y <=100)
    {
        document.getElementById("speed").innerHTML = "Speed =0.5x";
    song.rate(0.5);
    }
    else if(righthand_y >100 && righthand_y <=200)
    {
        document.getElementById("speed").innerHTML = "Speed =1x";
    song.rate(1);
    }
     
    else if(righthand_y >200 && righthand_y <=300)
    {
        document.getElementById("speed").innerHTML = "Speed =1.5x";
    song.rate(1.5);
    }
     
    else if(righthand_y >300 && righthand_y <=400)
    {
        document.getElementById("speed").innerHTML = "Speed =2x";
    song.rate(2);
    }
     
    if(righthand_y >400 && righthand_y <=500)
    {
        document.getElementById("speed").innerHTML = "Speed =2.5x";
    song.rate(2.5);
    }
    }
    
    if(scoreleft > 0.2){

    
    circle(lefthand_x,lefthand_y,20);
   leftY =Number(lefthand_y);
   remove_decimal=floor(leftY)
   volume=remove_decimal/500;
   document.getElementById("volume").innerHTML="Volume="+volume;
   song.setVolume(volume);
}
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function pause(){
    song.pause();
}

function stop(){
    song.stop();
}



