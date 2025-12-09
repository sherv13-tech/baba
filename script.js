// SCREENS
const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const screen3 = document.getElementById("screen3");

// BUTTONS
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
const giftSection = document.getElementById("giftSection");
const openGiftBtn = document.getElementById("openGiftBtn");

// YES button grows, NO button runs away
let yesSize = 20;

noBtn.addEventListener("mouseover", () => {
    const x = Math.random() * 300 - 150;
    const y = Math.random() * 200 - 100;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;

    yesSize += 3;
    yesBtn.style.transform = `scale(${yesSize / 20})`;
});

// YES → go to envelope screen
yesBtn.addEventListener("click", () => {
    screen1.classList.add("hidden");
    screen2.classList.remove("hidden");
});

// Envelope opens → show letter + gift section
let opened = false;
envelope.addEventListener("click", () => {
    if (opened) return;
    opened = true;

    envelope.classList.add("open");

    // show letter inside envelope
    letter.style.opacity = 1;

    // show gift section
    giftSection.classList.remove("hidden");
});

// Gift button → final screen
openGiftBtn.addEventListener("click", () => {
    screen2.classList.add("hidden");
    screen3.classList.remove("hidden");

    startKissAnimation();
});

// Floating kiss animation
function startKissAnimation() {
    const kissContainer = document.getElementById("kissContainer");

    setInterval(() => {
        const kiss = document.createElement("div");
        kiss.classList.add("kiss");

        const emojis = ["😘", "💋", "😍", "❤️"];
        kiss.innerText = emojis[Math.floor(Math.random() * emojis.length)];

        kiss.style.left = Math.random() * 80 + 10 + "%";
        kiss.style.top = Math.random() * 10 + 10 + "%";

        kissContainer.appendChild(kiss);

        setTimeout(() => kiss.remove(), 3000);
    }, 500);
}
