const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const question = document.getElementById("question");
const subtext = document.getElementById("subtext");
const bearGif = document.getElementById("bear-gif");
const glassContainer = document.getElementById("quiz-container");
const celebrationScreen = document.getElementById("celebration");
const heartsContainer = document.getElementById("hearts-container");

// Define our sweet and interactive Q&A Journey
const quizJourney = [
    {
        question: "Are you ready for a sweet surprise?",
        subtext: "Just answer a few questions first! 😊",
        gif: "https://media.tenor.com/9wXG2R9XUqUAAAAi/cute-bear.gif",
        btn1Text: "Yes, Let's Go!",
        btn2Text: "No, Maybe Later",
        btn2Dodges: false
    },
    {
        question: "Who is the cutest person in the whole world?",
        subtext: "Be honest now... Hmm?",
        gif: "https://media.tenor.com/m5X3t5YySfwAAAAi/bear-cute.gif",
        btn1Text: "Me! 🥺",
        btn2Text: "Someone Else",
        btn2Dodges: true
    },
    {
        question: "Do you truly love me?",
        subtext: "I really, really need to know! ❤️",
        gif: "https://media.tenor.com/1G8jT7w2t_UAAAAi/cuddle-bear.gif",
        btn1Text: "Yes, Obviously!",
        btn2Text: "No Way!",
        btn2Dodges: true
    },
    {
        question: "Will you be my Valentine?",
        subtext: "I promise to make you smile every single day!",
        gif: "https://media.tenor.com/T0bC0U3Kx9AAAAAi/tkthao219-bubududu.gif",
        btn1Text: "Yes, A Thousand Times! ❤️",
        btn2Text: "No 😢",
        btn2Dodges: true
    }
];

let currentStep = 0;

function updateUI() {
    // Add fade out effect
    glassContainer.classList.add("fade-out");

    setTimeout(() => {
        const data = quizJourney[currentStep];

        // Update content
        question.textContent = data.question;
        subtext.textContent = data.subtext;
        bearGif.src = data.gif;
        btn1.textContent = data.btn1Text;
        btn2.textContent = data.btn2Text;

        // Reset button sizes and positions for the new question
        btn1.style.fontSize = "";
        btn1.style.padding = "";
        btn2.style.position = "";
        btn2.style.left = "";
        btn2.style.top = "";
        btn2.classList.remove("dodging");

        // Remove fade out to transition smoothly
        glassContainer.classList.remove("fade-out");
    }, 400); // Wait for fade out to complete before changing text
}

// Logic for the dodging button
function dodgeButton() {
    if (!quizJourney[currentStep].btn2Dodges) return;

    btn2.classList.add("dodging");

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Get button dimensions
    const btnWidth = btn2.offsetWidth;
    const btnHeight = btn2.offsetHeight;

    // Calculate random position boundaries ensuring button stays fully visible
    const maxX = viewportWidth - btnWidth;
    const maxY = viewportHeight - btnHeight;

    // Generate random coordinates
    const randomX = Math.max(0, Math.floor(Math.random() * maxX));
    const randomY = Math.max(0, Math.floor(Math.random() * maxY));

    // Apply new position using fixed positioning relative to viewport
    btn2.style.left = `${randomX}px`;
    btn2.style.top = `${randomY}px`;

    // Make the YES button slowly get bigger
    const currentSize = parseFloat(window.getComputedStyle(btn1).fontSize) || 19.2;
    btn1.style.fontSize = `${currentSize + 2}px`;
    const currentPadding = parseFloat(window.getComputedStyle(btn1).paddingLeft) || 30;
    btn1.style.padding = `15px ${currentPadding + 4}px`;
}

// Attach dodge listeners to the second button (No/Someone Else)
btn2.addEventListener("mouseover", dodgeButton);
btn2.addEventListener("touchstart", (e) => {
    if (quizJourney[currentStep].btn2Dodges) {
        e.preventDefault(); // Prevent actual click on mobile
        dodgeButton();
    }
});

// For questions where the "No" button doesn't dodge (like the first one)
btn2.addEventListener("click", () => {
    if (!quizJourney[currentStep].btn2Dodges) {
        if (currentStep === 0) {
            alert("Aww, come on! It's a nice surprise! Just click Yes! 😊");
        }
    }
});


// Logic to advance to the next step or show celebration
btn1.addEventListener("click", () => {
    if (currentStep < quizJourney.length - 1) {
        currentStep++;
        updateUI();
    } else {
        // Final celebration step
        glassContainer.classList.add("hidden");
        celebrationScreen.classList.remove("hidden");

        // Increase heart generation rate for celebration
        setInterval(createHeart, 100);
    }
});


// Background Floating Hearts Logic
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");

    // Randomize heart properties
    heart.style.left = `${Math.random() * 100}vw`; // Random horizontal position
    heart.style.animationDuration = `${Math.random() * 3 + 3}s`; // Random speed between 3s and 6s

    // Random color tint for hearts (pink/red shades)
    const hue = Math.floor(Math.random() * (360 - 330) + 330);
    const sat = Math.floor(Math.random() * (100 - 60) + 60);
    const val = Math.floor(Math.random() * (100 - 80) + 80);
    heart.style.backgroundColor = `hsla(${hue}, ${sat}%, ${val}%, 0.6)`;

    heartsContainer.appendChild(heart);

    // Remove heart after it goes off screen to prevent memory leaks
    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// Generate a new heart every 400ms initially
setInterval(createHeart, 400);

// Create some initial hearts immediately
for (let i = 0; i < 10; i++) {
    setTimeout(createHeart, i * 100);
}

// Initialize the very first load
updateUI();
