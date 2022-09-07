let toggle;
let myInterval;

function bpmFunction() {    // function converts bpm to ms interval
    if (toggle === false) { // stop button
        document.querySelector("#currentTempo").innerHTML = `You stopped the beat!`;
        clearInterval(myInterval); // should stop any existing beat - but doesn't?
        document.querySelector("#beats").innerHTML = ""; // clears the paragraph
        document.querySelector("#startStopBut").innerHTML = "Start the Beat!"; 
        toggle = true;
    } else {    // main beat production
        selectElement = document.querySelector('#botNumber');
        output3 = selectElement.value;        

        let bpm = document.querySelector("#tempo").value;        
        let bpmMessage = (60 / (bpm * (output3 / 4))) * 1000;   // changes beat feel based on bottom number
        document.querySelector("#currentTempo").innerHTML = `Your current tempo is: ${bpm} BPM.`;
        document.querySelector("#beats").innerHTML += "BEAT "; // ensures the beat starts immediately on click

        let woodblock = new Audio("woodblock.mp3");
        woodblock.volume = 0.5;
        woodblock.play();

        myInterval = setInterval(displayMessage,bpmMessage); // produces beats by running the below function at each interval
        
        let i = 1;
        function displayMessage() { // adds strong and weak beats to the paragraph with id="beats"
            selectElement = document.querySelector('#topNumber');
            output2 = selectElement.value;
    
            if(i % output2 === 0) {
                document.querySelector("#beats").innerHTML += "BEAT ";
                let woodblock = new Audio("woodblock.mp3");
                woodblock.volume = 0.5;
                woodblock.play();
                i += 1;
            } else {
                document.querySelector("#beats").innerHTML += "Beat ";
                let korgClick = new Audio("korgClick.mp3");
                korgClick.volume = 0.2;
                korgClick.play();
                i += 1;
            }      
        }
        document.querySelector("#startStopBut").innerHTML = "Stop the Beat!"; 
        toggle = false;
    }        
}

// I found a similar code on w3schools
// need more practice to pick it apart and build it from scratch
// plan to replace outputs with beat manipulation
function checkInputs() {
        selectElement = document.querySelector('#tempo');
        output1 = selectElement.value;
        
        selectElement = document.querySelector('#topNumber');
        output2 = selectElement.value;
    
        selectElement = document.querySelector('#botNumber');
        output3 = selectElement.value;
        document.querySelector('.tempoTimeSigOutput').textContent = `You've chosen a tempo of ${output1} bpm with a time signature of ${output2}/${output3}.`;
}