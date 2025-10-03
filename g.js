
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const output = document.getElementById('output');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Output voice
function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(speech);
}

// Recognition logic
recognition.onresult = function(event) {
  const transcript = event.results[0][0].transcript.toLowerCase();
  output.innerText = "You said: " + transcript;

  if (transcript.includes("hello")) {
    speak("Hi, how can I assist you?");
  } 
  else if (transcript.includes("time")) {
    const time = new Date().toLocaleTimeString();
    speak("The time is " + time);
  } 
  else if (transcript.includes("date")) {
    const date = new Date().toLocaleDateString();
    speak("The date is " + date);
  }
  else if (transcript.includes("open google")) {
    speak("Opening Google");
    window.open("https://www.google.com", "_blank");
  }
  else if (transcript.includes("open youtube")) {
    speak("Opening YouTube");
    window.open("https://www.youtube.com", "_blank");
  }
  else if (transcript.includes("your name")) {
    speak("I am your voice assistant!");
  }
  else if (transcript.includes("open instagram")) {
    speak("Opening Instagram");
    window.open("https://www.instagram.com", "_blank");
  }
  else if (transcript.includes("open whatsapp")) {
    speak("Opening WhatsApp");
    window.open("https://whatsapp.com", "_blank");
  }
  else if (transcript.includes("open chrome")) {
    speak("Opening Chrome");
    window.open("https://www.chrome.com");
  }
  else if (transcript.includes("play song")) {
    const audio = new Audio("song.mp3");
    audio.play();
    speak("Playing music");
  }
  else if (transcript.includes("search for")) {
    const query = transcript.replace("search for", "").trim();
    speak("Searching for " + query);
    window.open(`https://www.google.com/search?q=${query}`, "_blank");
  }
  else if (transcript.includes("search ")) {
    const query = transcript.replace("search ", "").trim();
    speak("Searching " + query);
    window.open(`https://www.youtube.com/search?q=${query}`, "_blank");
  }
  else if (transcript.includes(" ")) {
    const query = transcript.replace(" ", "").trim();

    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAZS9rfJXWHvQW1KD47pYTWr7JPJPdYEhU", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: query }] }]
      })
    })
      .then(res => res.json())
      .then(data => {
        const reply = data.candidates[0].content.parts[0].text;
        speak(reply);
        output.innerText = reply;
      })
      .catch(err => {
        console.error(err);
        speak("Sorry, I could not connect to Gemini right now.");
      });
  }
  else {
    speak("Sorry, I didn't understand that.");
  }
};

// Start recognition
startBtn.addEventListener('click', () => {
  console.log("Start button clicked");
  recognition.start();
});


// Stop recognition
stopBtn.addEventListener('click', () => {
  recognition.stop(); // voice listening बंद
  window.speechSynthesis.cancel(); // बोलणं थांबेल
  output.innerText = "Assistant stopped.";
});

