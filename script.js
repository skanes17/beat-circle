function bpmFunction() {    // function converts bpm to ms interval
    let bpm = document.getElementById("tempo").value;
    let bpmMessage = 60 / bpm * 1000;
    
    document.getElementById("currentTempo").innerHTML = "Your current tempo is: " + bpm + " BPM.";
    document.getElementById("beats").innerHTML += "Beat "; // this ensures the beat starts as soon as the button is clicked
    
    setInterval(displayMessage,bpmMessage); // produces the beats by running the below function at each interval
    
    function displayMessage() { // adds "Beat"s to the paragraph with id="beats"
        document.getElementById("beats").innerHTML += "Beat ";
        
        /* experimenting with adding audio
        let bassDrum = document.getElementById("bassDrum");
        bassDrum.play();
        */
    }
}