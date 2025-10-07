const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Programming is the art of telling a computer what to do through code.",
  "Practice makes perfect when learning to type fast and accurately.",
  "JavaScript is a versatile programming language used for web development.",
  "Coding is fun and rewarding when you understand the concepts behind it.",
  "Web development requires knowledge of HTML, CSS, and JavaScript.",
  "Learning to type without looking at the keyboard improves your speed.",
  "Software engineers write code to solve complex problems every day.",
  "The best way to learn programming is by building real projects.",
  "Technology is constantly evolving and changing our daily lives."
];

let typingTimer = null;
let timeLeft = 60;
let typingStartTime = null;
let testActive = false;

function startTypingTest() {
  // Select random sentence
  const text = sentences[Math.floor(Math.random() * sentences.length)];
  document.getElementById("typingText").textContent = text;

  // Reset input
  const input = document.getElementById("typingInput");
  input.value = "";
  input.disabled = false;
  input.placeholder = "Start typing here...";
  input.focus();

  // Reset stats
  timeLeft = 60;
  typingStartTime = Date.now();
  testActive = true;

  document.getElementById("wpm").textContent = "0";
  document.getElementById("accuracy").textContent = "100";
  document.getElementById("timer").textContent = "60";

  // Start timer
  clearInterval(typingTimer);
  typingTimer = setInterval(updateTypingStats, 100);
}

function updateTypingStats() {
  if (!testActive) return;

  const input = document.getElementById("typingInput").value;
  const text = document.getElementById("typingText").textContent;

  // Update timer
  timeLeft = Math.max(0, 60 - Math.floor((Date.now() - typingStartTime) / 1000));
  document.getElementById("timer").textContent = timeLeft;

  // End test if time is up
  if (timeLeft === 0) {
    endTest();
    return;
  }

  // Calculate WPM
  const words = input.trim().split(/\s+/).filter(word => word.length > 0).length;
  const minutes = (60 - timeLeft) / 60;
  const wpm = minutes > 0 ? Math.round(words / minutes) : 0;
  document.getElementById("wpm").textContent = wpm;

  // Calculate accuracy
  let correct = 0;
  const minLength = Math.min(input.length, text.length);
  for (let i = 0; i < minLength; i++) {
    if (input[i] === text[i]) correct++;
  }
  const accuracy = input.length > 0 ? Math.round((correct / input.length) * 100) : 100;
  document.getElementById("accuracy").textContent = accuracy;

  // Check if test is complete
  if (input === text) {
    endTest(true);
  }
}

function endTest(completed = false) {
  testActive = false;
  clearInterval(typingTimer);

  const input = document.getElementById("typingInput");
  input.disabled = true;

  const wpm = document.getElementById("wpm").textContent;
  const accuracy = document.getElementById("accuracy").textContent;

  if (completed) {
    alert(`🎉 Congratulations! You completed the test!\n\nYour Speed: ${wpm} WPM\nAccuracy: ${accuracy}%\n\nClick "Start Test" to try again!`);
  } else {
    alert(`⏰ Time's up!\n\nYour Speed: ${wpm} WPM\nAccuracy: ${accuracy}%\n\nClick "Start Test" to try again!`);
  }

  document.getElementById("typingText").textContent = 'Click "Start Test" to begin!';
  input.placeholder = 'The test will start when you click the button below...';
}

// Add event listener for typing
document.getElementById("typingInput").addEventListener("input", () => {
  if (testActive) updateTypingStats();
});
