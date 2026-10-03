// ================= ELEMENTS =================
const aiLoader = document.getElementById("aiLoader");
const upload = document.getElementById("imageUpload");
const preview = document.getElementById("preview");
const resultCard = document.getElementById("resultCard");
const resultText = document.getElementById("resultText");

const chatWindow = document.getElementById("chatWindow");
const chatOptions = document.getElementById("chatOptions");

// ================= GLOBAL STATE =================
let scanType = "chest";
let detectedDisease = "";

// ================= SCAN TYPE CHANGE =================
document.querySelectorAll('input[name="scan"]').forEach(radio => {
    radio.addEventListener("change", () => {
        scanType = radio.value;
        resetChat();
        resultCard.hidden = true;
        preview.hidden = true;
        aiLoader.hidden = true;
    });
});

// ================= IMAGE UPLOAD =================
upload.addEventListener("change", () => {
    const file = upload.files[0];
    if (!file) return;

    // Preview image
    preview.src = URL.createObjectURL(file);
    preview.hidden = false;

    // ✅ SHOW LOADER ONLY HERE
    aiLoader.hidden = false;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("scan", scanType);

    fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        aiLoader.hidden = true;   // ✅ HIDE LOADER
        showResult(data);
    })
    .catch(() => {
        aiLoader.hidden = true;
        alert("❌ Backend not running. Please start Flask server.");
    });
});

// ================= SHOW RESULT =================
function showResult(data) {
    detectedDisease = data.result;

    resultCard.hidden = false;
    resultText.innerHTML = `
        <b>Diagnosis:</b> ${data.result}<br>
        <b>Confidence:</b> ${data.confidence}%
    `;

    addBot(`🧠 Analysis completed for your ${getScanLabel()}.`);
    addBot(`⚠️ Result detected: ${data.result}`);
    addBot("You can ask me questions below 👇");

    chatOptions.hidden = false;
}

// ================= CHAT =================
function addBot(message) {
    const div = document.createElement("div");
    div.className = "bot";
    div.textContent = message;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// ================= QUESTIONS =================
function ask(type) {
    let reply = "";

    if (scanType === "chest") reply = chestAnswers(type);
    else if (scanType === "brain") reply = brainAnswers(type);
    else if (scanType === "bones") reply = boneAnswers(type);

    if (reply) addBot(reply);
}

// ================= ANSWERS =================
function chestAnswers(type) {
    const answers = {
        next: "Consult a physician. Take prescribed medication, rest well, and monitor breathing closely.",
        serious: "Pneumonia can become serious if untreated, especially for elderly or immunocompromised patients.",
        cure: "Yes, pneumonia is treatable with antibiotics or antiviral therapy depending on the cause.",
        precaution: "Avoid smoking, cold exposure, complete medication, and maintain hygiene.",
        food: "Warm fluids, soups, fruits, and protein-rich foods help recovery.",
        recovery: "Most patients recover within 1–3 weeks with proper treatment."
    };
    return answers[type];
}

function brainAnswers(type) {
    const answers = {
        next: "Consult a neurologist or neurosurgeon immediately for further evaluation.",
        serious: "Some tumors are benign, others may be serious. Further tests clarify this.",
        cure: "Many tumors are treatable with surgery, radiation, or medication.",
        precaution: "Avoid stress, follow medical advice strictly, and attend regular scans.",
        food: "A balanced diet with antioxidants and proper hydration is recommended.",
        recovery: "Recovery depends on tumor type, size, and treatment response."
    };
    return answers[type];
}

function boneAnswers(type) {
    const answers = {
        next: "Immobilize the affected area and consult an orthopedic specialist.",
        serious: "Most fractures heal well, but severe ones may require surgery.",
        cure: "Yes, bones heal naturally with proper support or surgical care.",
        precaution: "Avoid pressure on the injured bone and follow immobilization instructions.",
        food: "Calcium, vitamin D, and protein-rich foods aid healing.",
        recovery: "Healing usually takes 4–12 weeks depending on severity."
    };
    return answers[type];
}

// ================= HOSPITAL SEARCH =================
function findHospital() {
    if (!navigator.geolocation) {
        alert("Geolocation not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;

            let query = "hospital";
            if (scanType === "chest") query = "pulmonology hospital";
            else if (scanType === "brain") query = "neurology neurosurgery hospital";
            else if (scanType === "bones") query = "orthopedic hospital";

            const url = `https://www.google.com/maps/search/${encodeURIComponent(query)}/@${latitude},${longitude},15z`;
            window.location.href = url;
        },
        () => alert("Please allow location access to find nearby hospitals.")
    );
}

// ================= UTIL =================
function resetChat() {
    chatWindow.innerHTML = `
        <div class="bot">Hello 👋 I am your AI health assistant.</div>
        <div class="bot">Upload a scan to receive medical guidance.</div>
    `;
    chatOptions.hidden = true;
}

function getScanLabel() {
    if (scanType === "chest") return "Chest X-ray";
    if (scanType === "brain") return "Brain MRI";
    if (scanType === "bones") return "Bone X-ray";
    return "";
}
