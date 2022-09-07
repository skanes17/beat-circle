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
        console.log(output3);
        
        let bpm = document.querySelector("#tempo").value;
        
        // To Do modify the if statement to only modify the bpmMessage calculation
        // This is will allow the code to be written just once
        if (output3 === "4") {  
            console.log("Standard Time!")
            let bpmMessage = (60 / bpm) * 1000;
            document.querySelector("#currentTempo").innerHTML = `Your current tempo is: ${bpm} BPM.`;
            document.querySelector("#beats").innerHTML += "BEAT "; // ensures the beat starts immediately on click
            myInterval = setInterval(displayMessage,bpmMessage); // produces beats by running the below function at each interval
            
            let i = 1;
            function displayMessage() { // adds strong and weak beats to the paragraph with id="beats"
                selectElement = document.querySelector('#topNumber');
                output2 = selectElement.value;
        
                if(i % output2 === 0) {
                    document.querySelector("#beats").innerHTML += "BEAT ";
                    i += 1;
                } else {
                    document.querySelector("#beats").innerHTML += "Beat ";
                    i += 1;
                }      
            }
            document.querySelector("#startStopBut").innerHTML = "Stop the Beat!"; 
            toggle = false;
        } else {
            console.log("Double Time!")
            let bpmMessage = (60 / (bpm * 2)) * 1000;
            document.querySelector("#currentTempo").innerHTML = `Your current tempo is: ${bpm} BPM.`;
            document.querySelector("#beats").innerHTML += "BEAT "; // ensures the beat starts immediately on click
            myInterval = setInterval(displayMessage,bpmMessage); // produces beats by running the below function at each interval
            
            let i = 1;
            function displayMessage() { // adds strong and weak beats to the paragraph with id="beats"
                selectElement = document.querySelector('#topNumber');
                output2 = selectElement.value;
        
                if(i % output2 === 0) {
                    document.querySelector("#beats").innerHTML += "BEAT ";
                    i += 1;
                } else {
                    document.querySelector("#beats").innerHTML += "Beat ";
                    i += 1;
                }      
            }
            document.querySelector("#startStopBut").innerHTML = "Stop the Beat!"; 
            toggle = false;
        }        
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