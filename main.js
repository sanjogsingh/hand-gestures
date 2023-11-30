// https://teachablemachine.withgoogle.com/models/fkM6XrtWR/
Webcam.set({
    width: 320,
    height: 240,
    image_format: 'jpeg',
    jpeg_quality: 90
});
Webcam.attach( '#cam' );

function clickPic()
{
    Webcam.snap(function(src){
        document.getElementById("holdPic").innerHTML="<img id='expressing' src='"+src+"'>"
    })
}

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/u6P9HZqLy/model.json", modelloaded)

function modelloaded()
{
    console.log("👍")
}

function speak()
{
   synth= window.speechSynthesis
   synth.speak( new SpeechSynthesisUtterance("first prediction is "+firstprediction+" and second prediction is "+secondprediction+""))
}

function express()
{
 img=document.getElementById("expressing")
 classifier.classify(img,gotResult)
}

function gotResult(error,result)
{
    if(error)
    {
        console.log(error)
    }
    else{
        console.log(result)
        firstprediction=result[0].label
        secondprediction=result[1].label
        document.getElementById("emotion1").innerHTML=firstprediction
        document.getElementById("emotion2").innerHTML=secondprediction

        if(firstprediction=="thumbsup")
        {
            document.getElementById("emoji1").innerHTML="&#128077"
        }
        else if (firstprediction=="thumbsdown")
        {
            document.getElementById("emoji1").innerHTML="&#128078"
        }
        else
        {
            document.getElementById("emoji1").innerHTML="&#9996"
        }

        if(secondprediction=="thumbsup")
        {
            document.getElementById("emoji2").innerHTML="&#128077"
        }
        else if (secondprediction=="thumbsdown")
        {
            document.getElementById("emoji2").innerHTML="&#128078"
        }
        else
        {
            document.getElementById("emoji2").innerHTML="&#9996"
        }
        speak()
    }
    }
