/* const beatArray = []; // generates the beat options (top number)
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

// loop to generate event listeners for each box/stack
// these determine which box was clicked, and the function runs accordingly
for (let i = 1; i < 17; i++) {
  document.getElementById(`box${i}`).addEventListener("click", () => {
    let box = i;
    changeVolume(box);
  });
}

// this function styles the beat volumes
function changeVolume(box) {
  // grab all styles
  let vol25 = document.querySelector(`.vol25-${box}`).style.backgroundColor;
  let vol50 = document.querySelector(`.vol50-${box}`).style.backgroundColor;
  let vol75 = document.querySelector(`.vol75-${box}`).style.backgroundColor;
  let vol100 = document.querySelector(`.vol100-${box}`).style.backgroundColor;

  // toss the styles in an array
  const volArray = [vol25, vol50, vol75, vol100];

  // if top box is full, clear all boxes
  if (volArray[3] == "rgba(95, 39, 205, 0.75)") {
    document.querySelector(`.vol25-${box}`).style.backgroundColor =
      "rgba(95, 39, 205, 0.25)";
    document.querySelector(`.vol50-${box}`).style.backgroundColor =
      "rgba(95, 39, 205, 0.25)";
    document.querySelector(`.vol75-${box}`).style.backgroundColor =
      "rgba(95, 39, 205, 0.25)";
    document.querySelector(`.vol100-${box}`).style.backgroundColor =
      "rgba(95, 39, 205, 0.25)";
    console.log("all clear");
    // if third box is full, fill top box
  } else if (volArray[2] == "rgba(95, 39, 205, 0.75)") {
    document.querySelector(`.vol100-${box}`).style.backgroundColor =
      "rgba(95, 39, 205, 0.75)";
    console.log("4 boxes");
    // if second box is full, fill third box
  } else if (volArray[1] == "rgba(95, 39, 205, 0.75)") {
    document.querySelector(`.vol75-${box}`).style.backgroundColor =
      "rgba(95, 39, 205, 0.75)";
    console.log("3 boxes");
    // if first box is full, fill second box
  } else if (volArray[0] == "rgba(95, 39, 205, 0.75)") {
    document.querySelector(`.vol50-${box}`).style.backgroundColor =
      "rgba(95, 39, 205, 0.75)";
    console.log("2 boxes");
  } else {
    document.querySelector(`.vol25-${box}`).style.backgroundColor =
      "rgba(95, 39, 205, 0.75)";
    console.log("1 box");
  }
}

let toggle;
let myInterval;

function bpmFunction() {
  // function converts bpm to ms interval
  if (toggle === false) {
    // stop button
    document.querySelector("#currentTempo").innerHTML = `You stopped the beat!`;
    clearInterval(myInterval);
    document.querySelector("#beats").innerHTML = ""; // clears the paragraph
    document.querySelector("#startStopBut").innerHTML = "Start the Beat!";
    toggle = true;
    return;
  }

  // main beat production
  let botNumber = document.querySelector("#botNumber").value;

  let tempo = document.querySelector("#tempo").value;
  let bpmMessage = (60 / (tempo * (botNumber / 4))) * 1000; // changes beat feel based on bottom number
  document.querySelector("#currentTempo").innerHTML = `Tempo: ${tempo} BPM`;
  document.querySelector("#beats").innerHTML += "BEAT "; // ensures the beat starts immediately on click

  soundState = document.querySelector("#volumeToggle");
  if (soundState.checked == true) {
    let woodblock = new Audio("woodblock.mp3");
    woodblock.volume = 0.5;
    woodblock.play();
  }

  myInterval = setInterval(displayMessage, bpmMessage); // produces beats by running the below function at each interval

  let i = 1;
  function displayMessage() {
    // adds strong and weak beats to the paragraph with id="beats"
    topNumber = document.querySelector("#topNumber").value;

    if (i % topNumber === 0) {
      document.querySelector("#beats").innerHTML += "BEAT ";
      if (soundState.checked == true) {
        let woodblock = new Audio("woodblock.mp3");
        woodblock.volume = 0.5;
        woodblock.play();
      }
      i += 1;
    } else {
      document.querySelector("#beats").innerHTML += "Beat ";
      if (soundState.checked == true) {
        let korgClick = new Audio("korgClick.mp3");
        korgClick.volume = 0.2;
        korgClick.play();
      }
      i += 1;
    }
  }
  document.querySelector("#startStopBut").innerHTML = "Stop the Beat!";
  toggle = false;
}

/* practice generating boxes with JS
let rows = 4; // determines the number of boxes
boxes = document.querySelector("#test");
for (let i = 0; i < rows; i++) {
  let beatColumn = document.createElement("div");
  beatColumn.classList.add("beatEmphasisStack"); // adds a class to the element
  beatColumn.style.backgroundColor = "red"; // adds bkgd color
  boxes.appendChild(beatColumn);
}

let columns = 16; // determines the number of beats
boxes = document.querySelector("#test2");
for (let i = 0; i < columns; i++) {
  let beatColumn = document.createElement("div");
  beatColumn.classList.add("beatEmphasisBoxes");
  beatColumn.style.flexDirection = "column";
  beatColumn.style.width = "50px";
  beatColumn.style.borderStyle = "dashed";
  beatColumn.style.borderColor = "gray";
  beatColumn.style.alignItems = "flex-end";
  beatColumn.style.justifyContent = "end";
  boxes.appendChild(beatColumn);
}
*/

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
const startStopBut = document.querySelector("#startStopBut");
const waveAnimation = document.querySelector(".outer-circle");
const pulseAnimation = document.querySelector(".outer-circle");

// the listener is on the button, which triggers the animation on the hand
startStopBut.addEventListener("click", () => {
  let topNumber = document.querySelector("#topNumber").value;
  let botNumber = document.querySelector("#botNumber").value;
  let tempo = document.querySelector("#tempo").value;
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
    iterations: Infinity,
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
    iterations: Infinity,
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
    iterations: Infinity,
  };

  pulseAnimation.animate(pulse, pulseTiming);
});
