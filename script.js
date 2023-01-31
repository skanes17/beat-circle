// toggle advanced options
document.querySelector("#adv-toggle").addEventListener("click", () => {
  document.querySelector(".adv-on").classList.toggle("disabled");
  document.querySelector(".adv-off").classList.toggle("disabled");

  const advancedOptionsArray = document.querySelectorAll(".advanced");
  advancedOptionsArray.forEach((element) => {
    element.classList.toggle("hidden");
  });
});

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

// build beats dropdown
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

const sliderContainer = document.querySelector(".slider-container");
const toggleContainer = document.querySelector(".toggleContainer");

for (let i = 1; i < 17; i++) {
  buildSliders(i);
  buildToggles(i);
  sliderVolumes(i);
}

function buildSliders(i) {
  let wrapper = document.createElement("div");
  wrapper.classList.add("volume-wrapper");
  wrapper.classList.add(`wrapper-${i}`);
  sliderContainer.appendChild(wrapper);
  let slider = document.createElement("input");
  slider.classList.add(`volume-wrapper`);
  slider.classList.add(`vol-${i}`);
  slider.setAttribute("type", "range");

  // set initial volumes
  if (i == 1) {
    slider.setAttribute("value", "75");
  } else {
    slider.setAttribute("value", "50");
  }

  slider.setAttribute("min", "0");
  slider.setAttribute("max", "100");
  slider.setAttribute("step", "10");
  wrapper.appendChild(slider);
}

// allow sliders to change volumes
function sliderVolumes(i) {
  let slider = document.querySelector(`.vol-${i}`);
  slider.oninput = function () {
    soundsArray[i - 1].volume = this.value / 100;
    // console.log(soundsArray[i - 1].volume);
    // console.log(`changed slider ${i}`);
  };
}

function buildToggles(i) {
  let toggleWrapper = document.createElement("div");
  toggleWrapper.classList.add("emphasisToggle");
  toggleWrapper.setAttribute("id", `toggle${i}`);
  toggleContainer.appendChild(toggleWrapper);
  let togglePill = document.createElement("input");
  togglePill.setAttribute("type", "checkbox");
  togglePill.setAttribute("id", `strong${i}`);
  togglePill.setAttribute("onchange", "playSound()");
  if (i == 1) {
    togglePill.setAttribute("checked", "true");
  }
  toggleWrapper.appendChild(togglePill);
  let pillLabel = document.createElement("label");
  pillLabel.setAttribute("for", `strong${i}`);
  toggleWrapper.appendChild(pillLabel);
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
  // changes beat feel based on bottom number
  let beatLength = (60 / (tempo * (botNumber / 4))) * 1000;
  let animationLength = beatLength * topNumber;

  // for every element in the array, do this stuff based on its current index
  soundsArray.forEach((soundFile, i) => {
    let beatToggle = document.querySelector(`#strong${i + 1}`);
    let checkedButWeak = Boolean(
      beatToggle.checked == true && soundFile.src.match("sounds/weak.mp3")
    );
    let uncheckedButStrong = Boolean(
      beatToggle.checked == false && soundFile.src.match("sounds/strong.mp3")
    );

    switch (true) {
      // if a beat is newly chosen to be strong, change its source to strong
      case checkedButWeak:
        soundFile.src = "sounds/strong.mp3";
        // console.log("changed to strong");
        break;
      // if a beat is newly chosen to be weak, change its source to weak
      case uncheckedButStrong:
        soundFile.src = "sounds/weak.mp3";
        // console.log("changed to weak");
        break;
    }
  });

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
  // hides all sliders and toggles
  for (i = 1; i <= 16; i++) {
    // let x = document.getElementById(`box${i}`);
    let x = document.querySelector(`.wrapper-${i}`);
    let y = document.getElementById(`toggle${i}`);
    // x.style.display = "none";
    x.style.display = "none";
    y.style.display = "none";
  }
  // shows only as many sliders and toggles as the top number
  for (i = 1; i <= topNumber; i++) {
    let x = document.querySelector(`.wrapper-${i}`);
    let y = document.getElementById(`toggle${i}`);
    if (x.style.display === "none") {
      x.style.display = "flex";
      y.style.display = "block";
    } else {
      x.style.display = "none";
      y.style.display = "none";
    }
  }
}

// script to run animations
const handAnimation = document.querySelector(".hand");
const waveAnimation = document.querySelector(".circle");
const pulseAnimation = document.querySelector(".circle");

// array to hold slider pulse animations
const sliderAnimation = [];
for (let i = 0; i < 16; i++) {
  sliderAnimation[i] = document.querySelector(`.vol-${i + 1}`);
}

function playAnimations() {
  let topNumber = document.querySelector("#topNumber").value;
  let botNumber = document.querySelector("#botNumber").value;
  let tempo = document.querySelector("#tempoSlider").value;
  let beatLength = (60 / tempo) * topNumber * (4 / botNumber) * 1000; //

  const sliderPulse = [
    {
      background: "rgb(255, 235, 164)",
      borderRadius: "4px",
      boxShadow: "0 0 10px rgb(255, 235, 164)",
    },
    {
      background: "rgb(93, 81, 189)",
      borderRadius: "12px",
    },
  ];

  // array to hold beat pulse timings, especially delays
  const timingArray = [];
  for (let i = 0; i < topNumber; i++) {
    timingArray[i] = {
      duration: beatLength / topNumber,
      iterations: 1,
      delay: (beatLength / topNumber) * i,
    };
  }

  // run each slider pulse animation
  // all sliders pulses run at once, but beat delays are invoved
  for (let i = 0; i < 16; i++) {
    sliderAnimation[i].animate(sliderPulse, timingArray[i]);
  }

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
    {
      boxShadow: "0 0 16px 8px rgba(247, 242, 242, .75)",
    },
    {
      boxShadow: "0 0 24px 16px rgba(247, 242, 242, 0)",
    },
  ];

  const waveTiming = {
    duration: beatLength / topNumber,
    iterations: topNumber,
  };

  waveAnimation.animate(wave, waveTiming);

  // makes the circle pulse slightly on beat
  const pulse = [
    { border: "5px solid " },
    // offset works like keyframe percentage in CSS
    {
      border: "10px solid rgba(255, 224, 112, 1)",
      height: "175px",
      width: "175px",
      offset: 0.2,
    },
    { transform: "scale(1)", offset: 0.4 },
  ];

  const pulseTiming = {
    duration: beatLength / topNumber,
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

/* --------------
   GetSongBPM API
----------------- */

let bpm = {
  apiKey: "0af15d9b4fa3f2417c0017662b453715",

  fetchInfo: function (song, artist) {
    /* console.log(
      "https://api.getsongbpm.com/search/?api_key=" +
        this.apiKey +
        "&type=both&lookup=song:" +
        song.toString() +
        "artist:" +
        artist.toString() +
        "&limit=1"
    ); */
    fetch(
      "https://api.getsongbpm.com/search/?api_key=" +
        this.apiKey +
        "&type=both&lookup=song:" +
        song +
        "artist:" +
        artist +
        "&limit=1"
    )
      .then((response) => response.json())

      .then((data) => this.grabBpm(data));
  },

  grabBpm: function (data) {
    if (data.search[0] === undefined) {
      document.querySelector(".fact-text").classList.remove("pulse");
      document.querySelector(".fact-text").classList.add("error");

      // generate a random number between 1 and 8
      let random = Math.floor(Math.random() * 8) + 1;
      switch (random) {
        case 1:
          errorText = "This song is too fresh to be found. Try another!";
          break;
        case 2:
          errorText = "I can't find your song. Try again!";
          break;
        case 3:
          errorText =
            "I'm having trouble finding that one... Try something else?";
          break;
        case 4:
          errorText =
            "Well, this is awkward... I don't know that one. Could you try one... less fancy?";
          break;
        case 5:
          errorText =
            "That one's not in here yet. Maybe wait a month or two and try that one again.";
          break;
        case 6:
          errorText =
            "I gave it a shot but couldn't track that one down. Try another one?";
          break;
        case 7:
          errorText =
            "OK, you stumped me. Try again but go easy on me this time.";
          break;
        case 8:
          errorText =
            "I've honestly never heard of that song. Is it new? I should check it out. Maybe check back later for it. Try another one for now!";
          break;
        default:
          errorText = "This song is too fresh to be found. Try another!";
      }
      document.querySelector(".fact-text").innerHTML = errorText;
    }

    const { song_id, song_title } = data.search[0];
    const { name } = data.search[0].artist;
    const { img } = data.search[0].album;

    fetch(
      "https://api.getsongbpm.com/song/?api_key=" +
        this.apiKey +
        "&id=" +
        song_id
    )
      .then((response) => response.json())
      .then((data) => this.displayBpm(data, song_title, name, img));
  },

  displayBpm: function (data, song_title, name, img) {
    const { tempo } = data.song;
    document.querySelector(".fact-text").classList.remove("pulse");
    document.querySelector(".fact-text").innerHTML =
      song_title +
      " by " +
      name +
      " has an average tempo of <b>" +
      tempo +
      " BPM</b>.";
    document.querySelector(".cover-art").classList.remove("hidden");
    document.querySelector(".cover-art").src = img;
  },

  search: function () {
    document.querySelector(".fact-text").classList.remove("error");
    document.querySelector(".cover-art").classList.add("hidden");
    document.querySelector(".fact-text").classList.remove("hidden");
    document.querySelector(".fact-text").innerHTML = "Searching ...";
    document.querySelector(".fact-text").classList.add("pulse");
    let search = document.querySelector(".search-bar").value;
    if (search.includes("by") === false) {
      document.querySelector(".fact-text").classList.remove("pulse");
      document.querySelector(".fact-text").classList.add("error");
      document.querySelector(".fact-text").innerHTML =
        'Make sure to search song <strong>and</strong> artist. For example, "Purple Haze <strong>by</strong> Jimi Hendrix."';
      return;
    }
    let song = search.split(" by ")[0];
    song = song.replace(/ /g, "+");
    let artist = search.split(" by ")[1];
    artist = artist.replace(/ /g, "+");
    this.fetchInfo(song, artist);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  bpm.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      bpm.search();
    }
  });
