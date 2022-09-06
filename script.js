let toggle;
let myInterval;

function bpmFunction() {    // function converts bpm to ms interval
    if (toggle === false) { // stop button
        document.getElementById("currentTempo").innerHTML = `You stopped the beat!`;
        clearInterval(myInterval); // should stop any existing beat - but doesn't?
        document.getElementById("beats").innerHTML = ""; // clears the paragraph
        toggle = true;
    } else {    // main beat production
        let bpm = document.getElementById("tempo").value;
        let bpmMessage = (60 / bpm) * 1000;
        document.getElementById("currentTempo").innerHTML = `Your current tempo is: ${bpm} BPM.`;
        document.getElementById("beats").innerHTML += "Beat "; // ensures the beat starts immediately on click
        myInterval = setInterval(displayMessage,bpmMessage); // produces beats by running the below function at each interval
        function displayMessage() { // adds "Beat"s to the paragraph with id="beats"
            document.getElementById("beats").innerHTML += "Beat ";
        }
        toggle = false;
    }
}

// I found a similar code on w3schools
// need more practice to pick it apart and build it from scratch
// plan to replace outputs with beat manipulation
function getTimeSig() {
        selectElement = document.querySelector('#topNumber');
        output1 = selectElement.value;
    
        selectElement = document.querySelector('#botNumber');
        output2 = selectElement.value;
        document.querySelector('.timeSigOutput').textContent = `Your chosen time signature is ${output1}/${output2}`;
}