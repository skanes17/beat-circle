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
let toggle;
let myInterval;

function bpmFunction() {
  // function converts bpm to ms interval
  if (toggle === false) {
    // stop button
    document.querySelector("#currentTempo").innerHTML = `You stopped the beat!`;
    clearInterval(myInterval); // should stop any existing beat - but doesn't?
    document.querySelector("#beats").innerHTML = ""; // clears the paragraph
    document.querySelector("#startStopBut").innerHTML = "Start the Beat!";
    toggle = true;
    return; // read up on return a little more; helped remove the else statement
  }

  // main beat production
  let output3 = document.querySelector("#botNumber").value;

  let bpm = document.querySelector("#tempo").value;
  let bpmMessage = (60 / (bpm * (output3 / 4))) * 1000; // changes beat feel based on bottom number
  document.querySelector(
    "#currentTempo"
  ).innerHTML = `Your current tempo is: ${bpm} BPM.`;
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
    selectElement = document.querySelector("#topNumber");
    output2 = selectElement.value;

    if (i % output2 === 0) {
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

function checkInputs() {
  let output1 = document.querySelector("#tempo").value;
  let output2 = document.querySelector("#topNumber").value;
  let output3 = document.querySelector("#botNumber").value;
  document.querySelector(
    ".tempoTimeSigOutput"
  ).textContent = `You've chosen a tempo of ${output1} bpm with a time signature of ${output2}/${output3}.`;
}

function fillIn() {
  var backgroundColor = document.querySelector("#beatEmphasisContainer").style
    .backgroundColor;
  if (backgroundColor === "purple") {
    document.querySelector("#beatEmphasisContainer").style.backgroundColor =
      "blue";
  } else {
    document.querySelector("#beatEmphasisContainer").style.backgroundColor =
      "purple";
  }
}

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
