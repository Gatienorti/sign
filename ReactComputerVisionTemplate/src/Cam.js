// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import "./App.css";
import { nextFrame } from "@tensorflow/tfjs";
import Speech from 'speak-tts'
// 2. TODO - Import drawing utility here
// e.g. import { drawRect } from "./utilities";


function Cam() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  
  const labelMap = {
    1:{name:'Hello', color:'red'},
    2:{name:'Thank You', color:'yellow'},
    3:{name:'I Love You', color:'lime'},
    4:{name:'Yes', color:'blue'},
    5:{name:'No', color:'purple'},
}
const [finalWord,setFinalWord] = useState('')
const [words,setWords] = useState('')
// Define a drawing function
const speech = new Speech()
speech.init().then((data)=>{
  console.log('speechis ready', data)
}).catch(e=>{
  console.error('and error', e)
})
speech.init({
  volume: 1,
     lang: 'en-GB',
     rate: 1,
     pitch: 1,
     voice:'Google UK English Female',
     splitSentences: true,
     listeners: {
         onvoiceschanged: (voices) => {
            //  console.log("Event voiceschanged", voices)
         }
     }
})

  // speech.speak({
  //   text:finalWord,
  // }).then(()=>{
  //   console.log('succses')
  // }).catch(e=>{
  //   console.log('eror',e)
  // })
  


const drawRect = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx,)=>{
    for(let i=0; i<=boxes.length; i++){
        if(boxes[i] && classes[i] && scores[i]>threshold){
            // Extract variables
            const [y,x,height,width] = boxes[i]
            const text = classes[i]
            
            // Set styling
            ctx.strokeStyle = labelMap[text]['color']
            ctx.lineWidth = 5
            ctx.fillStyle = 'white'
            ctx.font = '30px Arial'         
            
            // DRAW!!
            ctx.beginPath()
            ctx.fillText(Math.round(scores[i]*100)/100, x*imgWidth, y*imgHeight-10)
            ctx.rect(x*imgWidth, y*imgHeight, width*imgWidth/2.5, height*imgHeight/2);
            ctx.stroke()
            if(words !== labelMap[text]['name']){
            setWords(labelMap[text]["name"])
           
          }
            // setWord = labelMap[text]["name"]
        }
    }
}

if(words !== finalWord && words!== ''){
  console.log(words)
  setFinalWord(words)
  speech.speak({
    text:words,
  }).then(()=>{
    console.log('succses')
  }).catch(e=>{
    console.log('eror',e)
  })
  
  
}


  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network 
    // e.g. const net = await cocossd.load();
    // https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json
    const net = await tf.loadGraphModel('https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json')
    
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 18.7);
  };
  
  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      const img = tf.browser.fromPixels(video)
      const resized = tf.image.resizeBilinear(img, [640,480])
      const casted = resized.cast('int32')
      const expanded = casted.expandDims(0)
      const obj = await net.executeAsync(expanded)
      // console.log(obj)

      const boxes = await obj[1].array()
      const classes = await obj[2].array()
      const scores = await obj[4].array()
      
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)  
      requestAnimationFrame(()=>{drawRect(boxes[0], classes[0], scores[0], 0.8, videoWidth, videoHeight, ctx)}); 

      tf.dispose(img)
      tf.dispose(resized)
      tf.dispose(casted)
      tf.dispose(expanded)
      tf.dispose(obj)

    }
  };
  
  useEffect(()=>{runCoco()},[]);
 

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "1vw",
            marginRight: "auto",
            left: '5vw',
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: '45vw',
            height: 'auto',
           borderRadius: '15px'
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "1vw",
            marginRight: "auto",
            left: '5vw',
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: '45vw',
            height: 'auto',
            borderRadius: '15px'
          }}
        />
      </header>
      <div className="text">
        <p className='idtext'>{finalWord}</p>
        
        
      </div>
    </div>
  );
}

export default Cam;
