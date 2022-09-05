/* function bpmFunction() {    // function converts bpm to ms interval
    clearInterval(beatInterval); // should stop any existing beat - but doesn't?

    let bpm = document.getElementById("tempo").value;
    let bpmMessage = 60 / bpm * 1000;
    
    document.getElementById("currentTempo").innerHTML = `Your current tempo is: ${bpm} BPM.`;
    
    document.getElementById("beats").innerHTML = ""; // clears the paragraph
    document.getElementById("beats").innerHTML += "Beat "; // ensures the beat starts immediately on click
    
    var beatInterval = setInterval(displayMessage,bpmMessage); // produces beats by running the below function at each interval

    function displayMessage() { // adds "Beat"s to the paragraph with id="beats"
        document.getElementById("beats").innerHTML += "Beat ";
        
        // experimenting with adding audio
        // let bassDrum = document.getElementById("bassDrum");
        // bassDrum.play();
    }
    var stopBut = document.getElementById("stopBut");
    stopBut.addEventListener("click", Stop);

    function Stop() {
        clearInterval(beatInterval);
        document.getElementById("beats").innerHTML = ""; // clears the paragraph
    }
}  */

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