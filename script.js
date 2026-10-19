const sirBtn = document.getElementById("sirBtn");
const studentBtn = document.getElementById("studentBtn");
const welcome = document.getElementById("welcome");
const nameSection = document.getElementById("nameSection");
const resultSection = document.getElementById("resultSection");
const nameForm = document.getElementById("nameForm");
const nameInput = document.getElementById("nameInput");
const errorMessage = document.getElementById("errorMessage");
let selectedRole = "";

document.getElementById("year").textContent = new Date().getFullYear();

function showNameForm(role) {
  selectedRole = role;
  welcome.classList.add("hidden");
  resultSection.classList.add("hidden");
  nameSection.classList.remove("hidden");
  errorMessage.classList.add("hidden");
  nameInput.value = "";
  document.getElementById("formKicker").textContent =
    role === "sir" ? "WITH RESPECT AND GRATITUDE" : "A GREETING FOR A FRIEND";
  document.getElementById("formTitle").textContent =
    role === "sir" ? "May I know your name, Sir?" : "What's your name, student?";
  document.getElementById("formHint").textContent =
    role === "sir" ? "Enter your name to open your Dashain thank-you letter." :
    "Enter your name to open your personal Dashain greeting.";
  nameInput.placeholder = role === "sir" ? "Enter your name, Sir..." : "Enter your name...";
  nameSection.scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => nameInput.focus(), 250);
}

sirBtn.addEventListener("click", () => showNameForm("sir"));
studentBtn.addEventListener("click", () => showNameForm("student"));

document.getElementById("backBtn").addEventListener("click", () => {
  nameSection.classList.add("hidden");
  welcome.classList.remove("hidden");
  errorMessage.classList.add("hidden");
  welcome.scrollIntoView({ behavior: "smooth", block: "center" });
});

function normalizeName(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function showMessage(title, recipient, paragraphs, script) {
  document.getElementById("resultTitle").textContent = title;
  document.getElementById("recipientLine").textContent = recipient;
  document.getElementById("letterText").textContent = paragraphs;
  document.getElementById("resultScript").textContent = script;
  nameSection.classList.add("hidden");
  resultSection.classList.remove("hidden");
  document.getElementById("copyStatus").textContent = "";
  resultSection.scrollIntoView({ behavior: "smooth", block: "center" });
}

nameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const entered = normalizeName(nameInput.value);
  errorMessage.classList.add("hidden");

  if (selectedRole === "sir") {
    if (entered === "asim khad thakuri") {
      showMessage(
        "A Dashain Thank-You Letter",
        "Respected Asim Khad Thakuri Sir,",
        "As we celebrate Dashain, I want to express my sincere gratitude and respect to you. Thank you for your guidance, support, and the time you give to help students learn and improve. Your efforts make a meaningful difference, and I truly appreciate them.\n\nMay Goddess Durga bless you and your family with good health, happiness, peace, and prosperity. I hope you are enjoying this Dashain with your loved ones and making many beautiful memories.\n\nWishing you and your family a very Happy Dashain. Thank you for being a wonderful teacher.",
        "With Respect"
      );
    } else {
      errorMessage.textContent = "Sorry, this Sir's greeting is specially made for Asim Khad Thakuri. Please check the spelling.";
      errorMessage.classList.remove("hidden");
    }
    return;
  }

  const students = {
    "pragyan": "Pragyan",
    "yash": "Yash",
    "mansoon": "Mansoon",
    "aadarsh": "Aadarsh"
  };
  const studentName = students[entered];

  if (studentName) {
    showMessage(
      "Happy Dashain!",
      `Dear ${studentName},`,
      `Happy Dashain, bro! 🎉\n\nMay your home be full of happiness, love, laughter, and good health this Dashain. I hope you are enjoying the tika, jamara, delicious food, family time, and all the little moments that make this festival special.\n\nMay these festive days bring you success in your studies, confidence to chase your goals, and plenty of reasons to smile. Keep being yourself, spend lovely moments with your family, and make beautiful memories this Dashain.\n\nWishing you and your family a joyful, peaceful, and prosperous Dashain!`,
      "Warm Wishes"
    );
  } else {
    errorMessage.textContent = "I couldn't find that name on this little guest list. Try Pragyan, Yash, Mansoon, or Aadarsh.";
    errorMessage.classList.remove("hidden");
  }
});

document.getElementById("restartBtn").addEventListener("click", () => {
  resultSection.classList.add("hidden");
  welcome.classList.remove("hidden");
  welcome.scrollIntoView({ behavior: "smooth", block: "center" });
});

document.getElementById("copyBtn").addEventListener("click", async () => {
  const text = `${document.getElementById("resultTitle").textContent}\n\n${document.getElementById("recipientLine").textContent}\n\n${document.getElementById("letterText").textContent}\n\nWith warm wishes,\nPragyan`;
  const status = document.getElementById("copyStatus");
  try {
    await navigator.clipboard.writeText(text);
    status.textContent = "Message copied! You can now paste and share it.";
  } catch {
    status.textContent = "Copy isn't available in this browser. Select the message text and copy it manually.";
  }
});
