// toggles volume on/off
let soundState = document.querySelector("#volumeToggle");
soundState.addEventListener("click", () => {
  if (soundState.checked == true) {
    document.querySelector("#volumeIcon").textContent = "volume_up";
  } else {
    document.querySelector("#volumeIcon").textContent = "volume_off";
  }
});

let slider = document.querySelector("#tempoSlider");
let sliderOutput = document.querySelector("#sliderOutput");
sliderOutput.innerHTML = `${slider.value} bpm`;

// takes the value of the slider and shows it above the slider
slider.oninput = function () {
  sliderOutput.innerHTML = `${this.value} bpm`;
};

const dropdown = document.querySelector("#topNumber");
const metres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
for (let i = 0; i < metres.length; i++) {
  let metre = metres[i];
  let metreUi = document.createElement("option");
  metreUi.textContent = metre;
  metreUi.value = metre;
  dropdown.appendChild(metreUi);
  if (i === 3) {
    dropdown.selectedIndex = i;
  }
}

// make the beat stacks
const beatContainer = document.querySelector("#beatEmphasisContainer");
const boxes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
for (let i = 0; i < boxes.length; i++) {
  let box = document.createElement("div");
  box.classList.add("beatEmphasisBoxes");
  box.id = `box${i + 1}`;
  box.style.display = "none";
  beatContainer.appendChild(box);

  // make the individual beats in the stacks
  let beat = document.createElement("div");
  beat.classList.add("beatEmphasisStack", `vol100-${i + 1}`);
  box.appendChild(beat);

  beat = document.createElement("div");
  beat.classList.add("beatEmphasisStack", `vol75-${i + 1}`);
  box.appendChild(beat);

  beat = document.createElement("div");
  beat.classList.add("beatEmphasisStack", `vol50-${i + 1}`);
  box.appendChild(beat);

  beat = document.createElement("div");
  beat.classList.add("beatEmphasisStack", `vol25-${i + 1}`);
  box.appendChild(beat);
}

/*let beat = boxes[i];
  let beatUi = document.createElement("div");
  beatUi.classList.add(`vol100-${i}`);
  beatUi.classList.add(`vol75-${i}`);
  beatUi.classList.add(`vol50-${i}`);
  beatUi.classList.add(`vol25-${i}`);
  */

/*
<div id="beatEmphasisContainer" class="beatEmphasisContainer addMargins">
<div class="beatEmphasisBoxes" id="box1">
  <div class="beatEmphasisStack vol100-1"></div>
  <div class="beatEmphasisStack vol75-1"></div>
  <div class="beatEmphasisStack vol50-1"></div>
  <div class="beatEmphasisStack vol25-1"></div>
</div>
<div class="beatEmphasisBoxes" id="box2">
  <div class="beatEmphasisStack vol100-2"></div>
  <div class="beatEmphasisStack vol75-2"></div>
  <div class="beatEmphasisStack vol50-2"></div>
  <div class="beatEmphasisStack vol25-2"></div>
</div>
*/

// sets default styles/volumes to 75% for first beat, 50% for the rest
for (let i = 1; i < 17; i++) {
  if (i == 1) {
    document.querySelector(`.vol25-${i}`).style.backgroundColor =
      "rgba(95, 39, 205, 0.75)";
    document.querySelector(`.vol50-${i}`).style.backgroundColor =
      "rgba(95, 39, 205, 0.75)";
    document.querySelector(`.vol75-${i}`).style.backgroundColor =
      "rgba(95, 39, 205, 0.75)";
  } else {
    document.querySelector(`.vol25-${i}`).style.backgroundColor =
      "rgba(95, 39, 205, 0.75)";
    document.querySelector(`.vol50-${i}`).style.backgroundColor =
      "rgba(95, 39, 205, 0.75)";
  }
}

// loop to generate event listeners for each box/stack
// these determine which box was clicked, and the function runs accordingly
for (let i = 1; i < 17; i++) {
  document.getElementById(`box${i}`).addEventListener("click", () => {
    let box = i;
    changeVolume(box);
  });
}

// volume array is used to set volume of beats, used in changeVolume function
const volArray = [];

// this function activates on click to style the boxes and set volume of individual beats
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
    console.log("all clear");
    // if third box is full, fill top box
  } else if (beatStyleArray[2] == "rgba(95, 39, 205, 0.75)") {
    document.querySelector(`.vol100-${box}`).style.backgroundColor =
      "rgba(95, 39, 205, 0.75)";
    volArray[`${box - 1}`] = 1;
    soundsArray[box - 1].volume = 1;
    console.log("4 boxes");
    // if second box is full, fill third box
  } else if (beatStyleArray[1] == "rgba(95, 39, 205, 0.75)") {
    document.querySelector(`.vol75-${box}`).style.backgroundColor =
      "rgba(95, 39, 205, 0.75)";
    volArray[`${box - 1}`] = 0.75;
    soundsArray[box - 1].volume = 0.75;
    console.log("3 boxes");
    // if first box is full, fill second box
  } else if (beatStyleArray[0] == "rgba(95, 39, 205, 0.75)") {
    document.querySelector(`.vol50-${box}`).style.backgroundColor =
      "rgba(95, 39, 205, 0.75)";
    volArray[`${box - 1}`] = 0.5;
    soundsArray[box - 1].volume = 0.5;
    console.log("2 boxes");
  } else {
    document.querySelector(`.vol25-${box}`).style.backgroundColor =
      "rgba(95, 39, 205, 0.75)";
    volArray[`${box - 1}`] = 0.25;
    soundsArray[box - 1].volume = 0.25;
    console.log("1 box");
  }
}

// added click sound to toggles
const clickSound = new Audio("sounds/toggle.mp3");
function playSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

let toggle;
let myInterval;
let myAnimations;

// main beat production
function bpmFunction() {
  // function converts bpm to ms interval
  if (toggle === false) {
    // stop button
    clearInterval(myInterval);
    clearInterval(myAnimations);
    document.querySelector(".playButton").innerHTML = "play_arrow";
    document.querySelector(".playButton").classList.toggle("md-stop");
    enableInputs();
    toggle = true;
    return;
  }

  disableInputs();

  let topNumber = document.querySelector("#topNumber").value;
  let botNumber = document.querySelector("#botNumber").value;
  let tempo = document.querySelector("#tempoSlider").value;
  let beatLength = (60 / (tempo * (botNumber / 4))) * 1000; // changes beat feel based on bottom number
  let animationLength = beatLength * topNumber;

  for (let i = 1; i < 17; i++) {
    beatStrength = document.querySelector(`#strong${i}`);
    if (
      // if a beat is newly chosen to be strong, change its source to strong
      beatStrength.checked == true &&
      soundsArray[i - 1].src.match("sounds/weak.mp3")
    ) {
      soundsArray[i - 1].src = "sounds/strong.mp3";
    } else if (
      // if a beat is newly chosen to be weak, change its source to weak
      beatStrength.checked == false &&
      soundsArray[i - 1].src.match("sounds/strong.mp3")
    ) {
      soundsArray[i - 1].src = "sounds/weak.mp3";
    }
  }

  // plays first beat if volume set to on
  let soundState = document.querySelector("#volumeToggle");
  if (soundState.checked == true) {
    soundsArray[0].currentTime = 0; // reset sound timer
    soundsArray[0].play(); // plays first beat immediately on click
  }

  // plays animations once immediately on click
  playAnimations();

  // plays beats and animations by running playBeats and playAnimations function at each interval
  myInterval = setInterval(playBeats, beatLength);
  myAnimations = setInterval(playAnimations, animationLength);

  let i = 1;
  function playBeats() {
    // grab number of beats
    topNumber = document.querySelector("#topNumber").value;
    // keeps the range within the sounds array
    let beatNumber = i % topNumber;
    soundState = document.querySelector("#volumeToggle");
    // plays audio if volume set to on
    if (soundState.checked == true) {
      // reset sound timer
      soundsArray[beatNumber].currentTime = 0;
      // plays given beat
      soundsArray[beatNumber].play();
    }
    i += 1;
  }

  document.querySelector(".playButton").innerHTML = "stop";
  document.querySelector(".playButton").classList.toggle("md-stop");
  toggle = false;
}

// this runs the showBeats function on page load
document.addEventListener("DOMContentLoaded", function () {
  showBeats();
});

function showBeats() {
  let topNumber = document.querySelector("#topNumber").value;
  // hides all beat containers and toggles
  for (i = 1; i <= 16; i++) {
    let x = document.getElementById(`box${i}`);
    let y = document.getElementById(`toggle${i}`);
    x.style.display = "none";
    y.style.display = "none";
  }
  // shows only as many beat containers and toggles as the top number
  for (i = 1; i <= topNumber; i++) {
    let x = document.getElementById(`box${i}`);
    let y = document.getElementById(`toggle${i}`);
    if (x.style.display === "none") {
      x.style.display = "block";
      y.style.display = "block";
    } else {
      x.style.display = "none";
      y.style.display = "none";
    }
  }
}

// script to run animations
const handAnimation = document.querySelector(".hand");
const playButton = document.querySelector(".playButton");
const waveAnimation = document.querySelector(".outer-circle");
const pulseAnimation = document.querySelector(".outer-circle");

// array to hold beat pulse animations
const stackAnimation = [];
for (let i = 0; i < 16; i++) {
  stackAnimation[i] = document.querySelector(`#box${i + 1}`);
}

function playAnimations() {
  let topNumber = document.querySelector("#topNumber").value;
  let botNumber = document.querySelector("#botNumber").value;
  let tempo = document.querySelector("#tempoSlider").value;
  let beatLength = (60 / tempo) * topNumber * (4 / botNumber) * 1000; //

  // this array defines the animations used along with their keyframes
  const rotateHand = [
    { transform: "rotate(0)" },
    { transform: "rotate(360deg)" },
  ];

  // sets the timing for how quickly to run through the keyframes
  const rotateTiming = {
    duration: beatLength,
    iterations: 1,
  };

  // syntax is animate(keyframes, options)
  // keyframes can be an array of keyframe objects...
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
    duration: beatLength / topNumber,
    iterations: topNumber,
  };

  waveAnimation.animate(wave, waveTiming);

  // makes the circle pulse slightly on beat
  const pulse = [
    { transform: "scale(1)" },
    // offset works like keyframe percentage in CSS
    {
      transform: "scale(1.02)",
      background: "rgba(44, 30, 153, 1)",
      offset: 0.2,
    },
    { transform: "scale(1)", offset: 0.4 },
  ];

  const pulseTiming = {
    duration: beatLength / topNumber,
    iterations: topNumber,
  };

  pulseAnimation.animate(pulse, pulseTiming);

  const stackPulse = [
    { boxShadow: "inset 0 0 0 0 rgba(95, 39, 205, 1)", borderRadius: "8px" },
    {
      boxShadow: "inset 0 0 0 64px rgba(95, 39, 205, 0)",
      borderRadius: "8px",
    },
  ];

  // array to hold beat pulse timings, especially delays
  const stackTimingArray = [];
  for (let i = 0; i < topNumber; i++) {
    stackTimingArray[i] = {
      duration: beatLength / topNumber,
      iterations: 1,
      delay: (beatLength / topNumber) * i,
    };
  }

  // run each beat pulse animation
  // all beat pulses run at once, but beat delays are invoved
  for (let i = 0; i < 16; i++) {
    stackAnimation[i].animate(stackPulse, stackTimingArray[i]);
  }
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
  }
}

// functions to enable/disable inputs while beat is playing
function disableInputs() {
  document.querySelector("#tempoSlider").disabled = true;
  document.querySelector("#topNumber").disabled = true;
  document.querySelector("#botNumber").disabled = true;
  // disables strong beat selection
  for (let i = 1; i < 17; i++) {
    document.querySelector(`#strong${i}`).disabled = true;
  }
}
function enableInputs() {
  document.querySelector("#tempoSlider").disabled = false;
  document.querySelector("#topNumber").disabled = false;
  document.querySelector("#botNumber").disabled = false;
  // enable strong beat selection
  for (let i = 1; i < 17; i++) {
    document.querySelector(`#strong${i}`).disabled = false;
  }
}

/*
function circleDivisions() {
  let divisions = document.querySelector("#topNumber");

}
*/
