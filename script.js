/*
const beatArray = []; // generates the beat options (top number)
let beatArrayLength = 16;
for (let i = 0; i < beatArrayLength; i++) {
  beatArray[i] = `${i + 1}`;
}
console.log(beatArray);

let select = document.querySelector("#topNumber");

for (let i = 0; i < 16; i++) {
  var option = document.createElement("OPTION"),
    txt = document.createTextNode(beatArray[i]);
  option.appendChild(txt);
  option.setAttribute("value", "beatArray[i]");
  if (i == 3) {
    option.setAttribute("selected", true);
  }
  select.insertBefore(option, select.lastChild);
}
*/

let slider = document.querySelector("#tempoSlider");
let sliderOutput = document.querySelector("#sliderOutput");
sliderOutput.innerHTML = `${slider.value} bpm`;

slider.oninput = function () {
  sliderOutput.innerHTML = `${this.value} bpm`;
};

// loop to generate event listeners for each box/stack
// these determine which box was clicked, and the function runs accordingly
for (let i = 1; i < 17; i++) {
  document.getElementById(`box${i}`).addEventListener("click", () => {
    let box = i;
    changeVolume(box);
  });
}

// experimenting with the idea of using a volume array, used later
const volArray = [];

// this function styles the beat volumes
function changeVolume(box) {
  // grab all styles
  let vol25 = document.querySelector(`.vol25-${box}`).style.backgroundColor;
  let vol50 = document.querySelector(`.vol50-${box}`).style.backgroundColor;
  let vol75 = document.querySelector(`.vol75-${box}`).style.backgroundColor;
  let vol100 = document.querySelector(`.vol100-${box}`).style.backgroundColor;

  // toss the styles in an array
  const beatStyleArray = [vol25, vol50, vol75, vol100];

  // if top box is full, clear all boxes
  if (beatStyleArray[3] == "rgba(95, 39, 205, 0.75)") {
    document.querySelector(`.vol25-${box}`).style.backgroundColor =
      "rgba(95, 39, 205, 0.25)";
    document.querySelector(`.vol50-${box}`).style.backgroundColor =
      "rgba(95, 39, 205, 0.25)";
    document.querySelector(`.vol75-${box}`).style.backgroundColor =
      "rgba(95, 39, 205, 0.25)";
    document.querySelector(`.vol100-${box}`).style.backgroundColor =
      "rgba(95, 39, 205, 0.25)";
    volArray[`${box - 1}`] = 0; // sets desired volume of beat according to which box was clicked
    soundsArray[box - 1].volume = 0; // sets the volume of that beat in the soundsArray
    console.log(volArray[0]);
    console.log("all clear");
    // if third box is full, fill top box
  } else if (beatStyleArray[2] == "rgba(95, 39, 205, 0.75)") {
    document.querySelector(`.vol100-${box}`).style.backgroundColor =
      "rgba(95, 39, 205, 0.75)";
    volArray[`${box - 1}`] = 1;
    soundsArray[box - 1].volume = 1;
    console.log(volArray[0]);
    console.log("4 boxes");
    // if second box is full, fill third box
  } else if (beatStyleArray[1] == "rgba(95, 39, 205, 0.75)") {
    document.querySelector(`.vol75-${box}`).style.backgroundColor =
      "rgba(95, 39, 205, 0.75)";
    volArray[`${box - 1}`] = 0.75;
    soundsArray[box - 1].volume = 0.75;
    console.log(volArray[0]);
    console.log("3 boxes");
    // if first box is full, fill second box
  } else if (beatStyleArray[0] == "rgba(95, 39, 205, 0.75)") {
    document.querySelector(`.vol50-${box}`).style.backgroundColor =
      "rgba(95, 39, 205, 0.75)";
    volArray[`${box - 1}`] = 0.5;
    soundsArray[box - 1].volume = 0.5;
    console.log(volArray[0]);
    console.log("2 boxes");
  } else {
    document.querySelector(`.vol25-${box}`).style.backgroundColor =
      "rgba(95, 39, 205, 0.75)";
    volArray[`${box - 1}`] = 0.25;
    soundsArray[box - 1].volume = 0.25;
    console.log(volArray[0]);
    console.log("1 box");
  }
}

let toggle;
let myInterval;

function bpmFunction() {
  // function converts bpm to ms interval
  if (toggle === false) {
    // stop button
    clearInterval(myInterval);
    clearInterval(myAnimations);
    document.querySelector(".playButton").innerHTML = "play_circle";
    toggle = true;
    return;
  }

  // main beat production
  let topNumber = document.querySelector("#topNumber").value;
  let botNumber = document.querySelector("#botNumber").value;
  let tempo = document.querySelector("#tempoSlider").value;
  let bpmMessage = (60 / (tempo * (botNumber / 4))) * 1000; // changes beat feel based on bottom number
  let animationLength = bpmMessage * topNumber;

  soundsArray[0].play(); // plays first beat immediately on click

  playAnimations(); // plays animations once immediately on click

  myInterval = setInterval(displayMessage, bpmMessage); // produces beats by running the below function at each interval
  myAnimations = setInterval(playAnimations, animationLength);

  let i = 1;
  function displayMessage() {
    topNumber = document.querySelector("#topNumber").value; // grab number of beats
    let beatNumber = i % topNumber; // keeps the range within the sounds array
    soundState = document.querySelector("#volumeToggle"); // plays audio if volume set to on
    if (soundState.checked == true) {
      soundsArray[beatNumber].currentTime = 0; // reset sound timer
      soundsArray[beatNumber].play(); // plays given beat
    }
    console.log(`beat number ${beatNumber}`);
    i += 1;
  }

  document.querySelector(".playButton").innerHTML = "stop_circle";
  toggle = false;
}

function showBeats() {
  let topNumber = document.querySelector("#topNumber").value;
  // hides all beat containers
  for (i = 1; i <= 16; i++) {
    let x = document.getElementById(`box${i}`);
    x.style.display = "none";
  }
  // shows only as many beat containers as the top number
  for (i = 1; i <= topNumber; i++) {
    let x = document.getElementById(`box${i}`);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
}

// this runs the showBeats function on page load
document.addEventListener("DOMContentLoaded", function () {
  showBeats();
});

// script to run animation for the metronome hand and beat waves
// need to add functionality to stop the animations!
const handAnimation = document.querySelector(".hand"); // allows easy modifying of this div later
const playButton = document.querySelector(".playButton");
const waveAnimation = document.querySelector(".outer-circle");
const pulseAnimation = document.querySelector(".outer-circle");

function playAnimations() {
  let topNumber = document.querySelector("#topNumber").value;
  let botNumber = document.querySelector("#botNumber").value;
  let tempo = document.querySelector("#tempoSlider").value;
  let bpmMessage = (60 / tempo) * topNumber * (4 / botNumber) * 1000; //

  // this process fills an array which sets up keyframes
  // need to learn more about this to be able to make from scratch!
  const rotateHand = [
    { transform: "rotate(0)" },
    { transform: "rotate(360deg)" },
  ];

  // sets the timing for how quickly to run through the keyframes
  const rotateTiming = {
    duration: bpmMessage,
    iterations: 1,
  };

  // syntax is animate(keyframes, options)
  // keyframes can be  an array of keyframe objects...
  // or a keyframe object whose properties are arrays of values to iterate over
  // options are the animation duration in ms...
  // or an object containing one or more timing properties
  handAnimation.animate(rotateHand, rotateTiming);

  // to make waves on beat
  const wave = [
    { boxShadow: "0 0 0 0px rgba(108, 92, 231, 1)" },
    { boxShadow: "0 0 0 10px rgba(108, 92, 231, 0)" },
  ];

  const waveTiming = {
    duration: bpmMessage / topNumber,
    iterations: topNumber,
  };

  waveAnimation.animate(wave, waveTiming);

  // makes the circle pulse slightly on beat
  const pulse = [
    { transform: "scale(1)" },
    { transform: "scale(1.02)", offset: 0.2 }, // offset works like keyframe percentage in CSS
    { transform: "scale(1)", offset: 0.4 },
  ];

  const pulseTiming = {
    duration: bpmMessage / topNumber,
    iterations: topNumber,
  };

  pulseAnimation.animate(pulse, pulseTiming);
}

// fill an array with sound files
const soundsArray = [];
for (let i = 0; i < 16; i++) {
  // by default first beat is strong, rest weak
  // all volumes default to 75%
  if (i == 0) {
    soundsArray[i] = new Audio("sounds/strong.mp3");
    soundsArray[i].volume = 0.75;
  } else {
    soundsArray[i] = new Audio("sounds/weak.mp3");
    soundsArray[i].volume = 0.75;
    console.log(soundsArray);
  }
}

// this only exists to allow quick testing on-click; will remove later
document.querySelector(".divChildHeader").addEventListener("click", () => {
  soundsArray[0].currentTime = 0;
  soundsArray[0].play();
});
document.querySelector(".divChild").addEventListener("click", () => {
  soundsArray[1].currentTime = 0;
  soundsArray[1].play();
});
