objects = [];
status = "";
video = "";

function preload(){
    video = createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw(){
    image(video, 0, 0, 480, 380);

    if(status != ""){
        objectDetector.detect(video, gotResults);
        for(i = 0; i < objects.legnth; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are: "+ objects.legnth;

            fill("#031cfc");
            percent = floor(objects[i].confidence * 100);
            text(object[i].lable +" "+ percent +"%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke("#031cfc");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}

function start(){
   objectDetector = ml5.objectDetector('cocossd', modelLoaded);
   document.getElementById("status").innerHTML = "Status: Detecting Object";
}

function modelLoaded(){
    console.log("model loaded");
    status = true;
    video.loop();
    video.speed(1)
    video.volume(0);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }    
    else{
        console.log(results);
        objects = results;
    }
}