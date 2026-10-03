// ================= ELEMENTS =================
const themeRadios = document.querySelectorAll('input[name="theme"]');
const colors = document.querySelectorAll(".color");
const fontSizeSelect = document.getElementById("fontSize");
const chatSoundToggle = document.getElementById("chatSound");
const resetBtn = document.getElementById("resetSettings");

// ================= DEFAULT SETTINGS =================
const DEFAULTS = {
    theme: "light",
    accent: "#0b5ed7",
    fontSize: "medium",
    chatSound: true
};

// ================= APPLY SETTINGS =================
function applySettings() {
    const theme = localStorage.getItem("theme") || DEFAULTS.theme;
    const accent = localStorage.getItem("accent") || DEFAULTS.accent;
    const fontSize = localStorage.getItem("fontSize") || DEFAULTS.fontSize;
    const chatSound =
        localStorage.getItem("chatSound") === null
            ? DEFAULTS.chatSound
            : localStorage.getItem("chatSound") === "true";

    // ---------- THEME ----------
    document.body.classList.toggle("dark", theme === "dark");
    themeRadios.forEach(radio => {
        radio.checked = radio.value === theme;
    });

    // ---------- ACCENT COLOR ----------
    document.documentElement.style.setProperty("--accent", accent);

    // ---------- FONT SIZE ----------
    setFontSize(fontSize);
    fontSizeSelect.value = fontSize;

    // ---------- CHAT SOUND ----------
    chatSoundToggle.checked = chatSound;
}

// ================= FONT SIZE HANDLER =================
function setFontSize(size) {
    let value = "16px";

    if (size === "small") value = "14px";
    if (size === "large") value = "18px";

    document.documentElement.style.fontSize = value;
}

// ================= INIT =================
applySettings();

// ================= THEME CHANGE =================
themeRadios.forEach(radio => {
    radio.addEventListener("change", () => {
        localStorage.setItem("theme", radio.value);
        document.body.classList.toggle("dark", radio.value === "dark");
    });
});

// ================= ACCENT COLOR =================
colors.forEach(color => {
    color.addEventListener("click", () => {
        const accent = color.dataset.color;
        document.documentElement.style.setProperty("--accent", accent);
        localStorage.setItem("accent", accent);

        // visual active state (optional but clean)
        colors.forEach(c => c.classList.remove("active"));
        color.classList.add("active");
    });
});

// ================= FONT SIZE =================
fontSizeSelect.addEventListener("change", () => {
    const size = fontSizeSelect.value;
    localStorage.setItem("fontSize", size);
    setFontSize(size);
});

// ================= CHAT SOUND =================
chatSoundToggle.addEventListener("change", () => {
    localStorage.setItem("chatSound", chatSoundToggle.checked);
});

// ================= RESET =================
resetBtn.addEventListener("click", () => {
    if (!confirm("Reset all settings to default?")) return;

    localStorage.setItem("theme", DEFAULTS.theme);
    localStorage.setItem("accent", DEFAULTS.accent);
    localStorage.setItem("fontSize", DEFAULTS.fontSize);
    localStorage.setItem("chatSound", DEFAULTS.chatSound);

    applySettings();
});
