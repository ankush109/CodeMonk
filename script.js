let startRecording = false;
let startingInd = 0;
let endingInd = 0;
let stored = "";
let selectedSpeed = 1.5;
const textarea = document.getElementById("inputBox");

document.getElementById("act").innerText = "Not recording";  // <- initial status 

document.getElementById("clear").addEventListener("click", () => {   // <- fun() to clear the text area
  const outputElement = document.getElementById("inputBox");
  outputElement.value = "";
});
document.getElementById("adddummy").addEventListener("click", () => { // <- fun() to add a dummy text
  document.getElementById("inputBox").value = 
    "I am Ankush Banerjee a full stack developer who loves javacript!";
  stored = "I am Ankush Banerjee a full stack developer who loves javacript!";
});

// func() to take care of toggle of the recorder button -> start / stop recording ..
function toggleRecorder(){
 startRecording = !startRecording;

    if (startRecording) {
      document.getElementById("act").innerText = "Recording...";
      this.textContent = "Stop Recording";
      this.classList.remove("green");
      this.classList.add("red");
      document.getElementById("replayButton").disabled = true;
      const inputText = document.getElementById("inputBox").value;
      startingInd = inputText.length > 0 ? inputText.length - 1 : 0;
      console.log(startingInd, "start");
    } else {
      const inputText = document.getElementById("inputBox").value;
      this.textContent = "Start Recording";
      this.classList.add("green");
      this.classList.remove("red");

      endingInd = inputText.length - 1;
      console.log(endingInd, "end");
      stored = inputText.slice(startingInd, endingInd + 1);
      console.log(stored);
      document.getElementById("act").innerText = "Not recording";
      document.getElementById("replayButton").disabled = false;
    }
}
document
  .getElementById("toggleRecordingButton")
  .addEventListener("click", toggleRecorder);
// function to replay the text stored from the recording timeline
function replay() {
  console.log("In the replay function /", stored);

  if (startRecording) { // check to see the recording is ON / NOT
    alert("Please stop your recording to replay ...");
    return;
  }

  if (stored.length === 0) {  // check to see the length of the text recorded > 0 
    alert("Please record something first...");
    return;
  }
  ToggleButtons(true)
  document.getElementById(
    "act"
  ).innerText = ` Playing at ${selectedSpeed} x speed`;
  const outputElement = document.getElementById("inputBox");
  outputElement.value = "";
  console.log(stored, "input");

  let index = 0;
  let actualSpeed;
// to choose the setTimeout time we use this to make the speed to this correct values
  switch (selectedSpeed) {
    case 1.5:
      actualSpeed = 100;
      break;
    case 0.5:
      actualSpeed = 400;
      break;
    case 2:
      actualSpeed = 50;
      break;
    default:
      actualSpeed = 100;
      break;
  }

  function typeEffect() {
    if (index < stored.length) {
      outputElement.textContent = ""; // first clear the text area 
      outputElement.value += stored.charAt(index); // adding one value at a time
      index++;
      setTimeout(typeEffect, actualSpeed); // calls the  typeEffect () after a delay 
      if (index === stored.length) {   // to see if we reach the end of the text 
        document.getElementById("act").innerText = "PLAYING is done!";
        document.getElementById("replayButton").disabled = false;
        ToggleButtons(false)
      }
    }
  }

  typeEffect();
}

document
  .getElementById("replayButton")
  .addEventListener("click", replay);
// speed button select / unselect func()
const speedButtons = document.querySelectorAll(".speed-button");
speedButtons.forEach((button) => {
  button.addEventListener("click", function () {
    speedButtons.forEach((btn) => btn.classList.remove("selected"));

    this.classList.add("selected");

    selectedSpeed = parseInt(this.getAttribute("data-speed"));

    replay();
  });
});

function updateInfo() { // selecion of text when we select a text from the input box it gets stored 
  const start = InputTextArea.selectionStart;
  const end = InputTextArea.selectionEnd;
  stored = InputTextArea.value.substring(start, end);
  console.log(stored, "currently seelected from input");
}

const InputTextArea = document.getElementById("inputBox");
// to track the selected text in the text area 
InputTextArea.addEventListener("input", updateInfo);
InputTextArea.addEventListener("mouseup", updateInfo);
InputTextArea.addEventListener("keyup", updateInfo);

// a function to take the val as true / false and update the disable propery
const ToggleButtons=(val)=>{
  document.getElementById("replayButton").disabled = val;
  document.getElementById("adddummy").disabled = val;
  document.getElementById("clear").disabled = val;
  document.getElementById("toggleRecordingButton").disabled = val;
  document.getElementById("spbtn").disabled = val;
  document.getElementById("spbtn1").disabled = val;
  document.getElementById("spbtn2").disabled = val;
}