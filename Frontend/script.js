// ---------------- ELEMENTS ----------------
const upload = document.getElementById("imageUpload");
const preview = document.getElementById("preview");
const resultCard = document.getElementById("resultCard");
const resultText = document.getElementById("resultText");

const chatWindow = document.getElementById("chatWindow");
const chatOptions = document.getElementById("chatOptions");

// ---------------- GLOBAL STATE ----------------
let detectedDisease = "";
let scanType = "chest";

// ---------------- SCAN TYPE CHANGE ----------------
document.querySelectorAll('input[name="scan"]').forEach(radio => {
    radio.addEventListener("change", () => {
        scanType = radio.value;
        resetUI();
    });
});

// ---------------- IMAGE UPLOAD ----------------
upload.addEventListener("change", () => {
    const file = upload.files[0];
    if (!file) return;

    // Preview image
    preview.src = URL.createObjectURL(file);
    preview.hidden = false;

    // Prepare form data
    const formData = new FormData();
    formData.append("image", file);
    formData.append("scan", scanType);

    // Call backend
    fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        showResult(data);
    })
    .catch(err => {
        alert("❌ Backend server error. Make sure Flask is running.");
        console.error(err);
    });
});

// ---------------- SHOW RESULT ----------------
function showResult(data) {
    detectedDisease = data.result;

    resultCard.hidden = false;
    resultText.innerHTML = `
        <b>Diagnosis:</b> ${data.result}<br>
        <b>Confidence:</b> ${data.confidence}%
    `;

    // 🔥 AUTO GREETING BASED ON SCAN TYPE
    if (scanType === "chest") {
        addBotMessage("🫁 I have analyzed your chest X-ray.");
        addBotMessage(`⚠️ Result: ${data.result}`);
        addBotMessage("Would you like to know precautions, treatment, or nearby hospitals?");
    } 
    else if (scanType === "brain") {
        addBotMessage("🧠 Brain MRI analysis completed.");
        addBotMessage(`⚠️ Result: ${data.result}`);
        addBotMessage("I can help you understand seriousness, treatment, and next steps.");
    } 
    else if (scanType === "bones") {
        addBotMessage("🦴 Bone X-ray analysis completed.");
        addBotMessage(`⚠️ Result: ${data.result}`);
        addBotMessage("You may ask about recovery, precautions, or orthopedic hospitals.");
    }

    // Show chatbot options automatically
    chatOptions.hidden = false;
}


// ---------------- CHATBOT FUNCTIONS ----------------
function addBotMessage(text) {
    const div = document.createElement("div");
    div.className = "bot";
    div.innerHTML = text.replace(/\n/g, "<br>");
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}


function typeText(element, text, speed) {
    let index = 0;
    element.innerText = "";

    const interval = setInterval(() => {
        element.innerText += text.charAt(index);
        index++;
        chatWindow.scrollTop = chatWindow.scrollHeight;

        if (index >= text.length) {
            clearInterval(interval);
        }
    }, speed);
}

// ---------------- QUESTION HANDLER ----------------
function ask(type) {
    let reply = "";

    if (scanType === "chest") {
        reply = chestReplies(type);
    } else if (scanType === "brain") {
        reply = brainReplies(type);
    } else if (scanType === "bones") {
        reply = bonesReplies(type);
    }

    addBotMessage(reply);
}

// ---------------- CHEST ANSWERS ----------------
function chestReplies(type) {
    const answers = {
        next: 
        "It is recommended to consult a physician. Follow prescribed medication, take adequate rest, and monitor breathing symptoms closely.",

        serious: 
        "Pneumonia severity varies. Mild cases recover with treatment, but severe cases may require hospitalization, especially in elderly or immunocompromised patients.",

        cure: 
        "Yes, pneumonia is treatable in most cases using antibiotics, antivirals, or supportive care depending on the cause.",

        precaution: 
        "Avoid smoking, maintain hygiene, complete the full medication course, and avoid cold exposure during recovery.",

        food: 
        "Warm fluids, soups, fruits rich in vitamin C, and protein-rich foods help support recovery.",

        recovery: 
        "Most patients recover fully within weeks if treated early and properly. Recovery time may vary."
    };
    return answers[type] || "";
}


// ---------------- BRAIN ANSWERS ----------------
function brainReplies(type) {
    const answers = {
        next: 
        "It is strongly advised to consult a neurologist or neurosurgeon for further evaluation and confirmatory imaging tests.",

        serious: 
        "Brain tumors can range from benign to malignant. Severity depends on tumor type, size, and location.",

        cure: 
        "Treatment options include surgery, radiation therapy, chemotherapy, or monitoring, depending on diagnosis.",

        precaution: 
        "Avoid stress, follow medical advice strictly, and attend all recommended diagnostic tests.",

        food: 
        "A balanced diet with fruits, vegetables, and adequate hydration is generally recommended during treatment.",

        recovery: 
        "Recovery depends on tumor type, treatment approach, and individual health condition."
    };
    return answers[type] || "";
}


// ---------------- BONE ANSWERS ----------------
function bonesReplies(type) {
    const answers = {
        next: 
        "Immobilize the affected area and consult an orthopedic specialist for proper diagnosis and treatment.",

        serious: 
        "Most fractures are treatable. Severity depends on fracture type and location.",

        cure: 
        "Yes, bones generally heal with proper immobilization, medication, or surgical intervention if required.",

        precaution: 
        "Avoid putting pressure on the injured area and follow immobilization guidelines strictly.",

        food: 
        "Calcium, vitamin D, protein, and minerals support bone healing.",

        recovery: 
        "Bone healing typically takes several weeks to months depending on the fracture."
    };
    return answers[type] || "";
}


// ---------------- HOSPITAL SEARCH ----------------
function findHospital() {
    const city = prompt("Enter your city name:");
    if (!city) return;

    const query = `https://www.google.com/maps/search/hospital+near+${city}`;
    window.open(query, "_blank");

    addBotMessage("🏥 Opening nearest hospitals near you.");
}

// ---------------- RESET UI ----------------
function resetUI() {
    preview.hidden = true;
    resultCard.hidden = true;
    chatOptions.hidden = true;
    chatWindow.innerHTML = `
        <div class="bot">Hello 👋 I am your AI health assistant.</div>
        <div class="bot">Upload a scan to get medical guidance.</div>
    `;
}

function findHospital() {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
        return;
    }

    alert("Please allow location access to find nearby hospitals");

    navigator.geolocation.getCurrentPosition(
        function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            let searchQuery = "hospital";

            if (scanType === "chest") {
                searchQuery = "pulmonology hospital";
            } 
            else if (scanType === "brain") {
                searchQuery = "neurology neurosurgery hospital";
            } 
            else if (scanType === "bones") {
                searchQuery = "orthopedic hospital";
            }

            const mapsUrl =
                `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}/@${lat},${lon},15z`;

            // ✅ SAME TAB REDIRECT (NO POPUP BLOCK)
            window.location.href = mapsUrl;
        },
        function () {
            alert("Location permission denied. Please allow location access.");
        }
    );
}

