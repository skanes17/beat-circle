function bpmFunction() {    // function converts bpm to ms interval
    clearInterval(displayMessage); // should stop any existing beat - but doesn't?

    let bpm = document.getElementById("tempo").value;
    let bpmMessage = 60 / bpm * 1000;
    
    document.getElementById("currentTempo").innerHTML = "Your current tempo is: " + bpm + " BPM.";
    
    document.getElementById("beats").innerHTML = ""; // clears the paragraph
    document.getElementById("beats").innerHTML += "Beat "; // ensures the beat starts immediately on click
    
    setInterval(displayMessage,bpmMessage); // produces beats by running the below function at each interval

    function displayMessage() { // adds "Beat"s to the paragraph with id="beats"
        document.getElementById("beats").innerHTML += "Beat ";
        
        /* experimenting with adding audio
        let bassDrum = document.getElementById("bassDrum");
        bassDrum.play();
        */
    
        var stopBut = document.getElementById("stopBut");
        stopBut.addEventListener("click", Stop);

        function Stop() {
            console.log("Stopped");
            clearInterval(displayMessage);
        }
    }
}
