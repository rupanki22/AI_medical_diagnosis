/* =========================
   GLOBAL SETTINGS HANDLER
   ========================= */

/* ---------- EARLY THEME APPLY (CRITICAL FIX) ---------- */
/* Page render se pehle hi dark mode lag jaayega */
(function () {
    const theme = localStorage.getItem("theme") || "light";
    if (theme === "dark") {
        document.documentElement.classList.add("dark");
    }
})();

/* ---------- DEFAULT SETTINGS ---------- */
const DEFAULT_SETTINGS = {
    theme: "light",
    accent: "#0b5ed7",
    fontSize: "medium",
    chatSound: true
};

/* ---------- LOAD SAVED SETTINGS ---------- */
const settings = {
    theme: localStorage.getItem("theme") || DEFAULT_SETTINGS.theme,
    accent: localStorage.getItem("accent") || DEFAULT_SETTINGS.accent,
    fontSize: localStorage.getItem("fontSize") || DEFAULT_SETTINGS.fontSize,
    chatSound: localStorage.getItem("chatSound") !== null
        ? localStorage.getItem("chatSound") === "true"
        : DEFAULT_SETTINGS.chatSound
};

/* ---------- APPLY THEME ---------- */
function applyTheme(theme) {
    if (theme === "dark") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
}

/* ---------- APPLY ACCENT COLOR ---------- */
function applyAccent(color) {
    document.documentElement.style.setProperty("--accent", color);
    localStorage.setItem("accent", color);
}

/* ---------- APPLY FONT SIZE ---------- */
function applyFontSize(size) {
    let fontSize = "16px";

    if (size === "small") fontSize = "14px";
    if (size === "large") fontSize = "18px";

    document.body.style.fontSize = fontSize;
    localStorage.setItem("fontSize", size);
}

/* ---------- APPLY CHAT SOUND ---------- */
function applyChatSound(enabled) {
    localStorage.setItem("chatSound", enabled);
}

/* ---------- APPLY ALL SETTINGS ON LOAD ---------- */
document.addEventListener("DOMContentLoaded", () => {
    applyTheme(settings.theme);
    applyAccent(settings.accent);
    applyFontSize(settings.fontSize);
    applyChatSound(settings.chatSound);

    syncNavbarActive();
    bindSettingsControls();
});

/* =========================
   SETTINGS PAGE CONTROLS
   ========================= */
function bindSettingsControls() {

    /* THEME */
    document.querySelectorAll('input[name="theme"]').forEach(radio => {
        radio.checked = radio.value === settings.theme;
        radio.addEventListener("change", () => {
            applyTheme(radio.value);
        });
    });

    /* ACCENT COLOR */
    document.querySelectorAll(".color").forEach(color => {
        color.addEventListener("click", () => {
            applyAccent(color.dataset.color);
        });
    });

    /* FONT SIZE */
    const fontSelect = document.getElementById("fontSize");
    if (fontSelect) {
        fontSelect.value = settings.fontSize;
        fontSelect.addEventListener("change", () => {
            applyFontSize(fontSelect.value);
        });
    }

    /* CHAT SOUND */
    const chatToggle = document.getElementById("chatSound");
    if (chatToggle) {
        chatToggle.checked = settings.chatSound;
        chatToggle.addEventListener("change", () => {
            applyChatSound(chatToggle.checked);
        });
    }

    /* RESET */
    const resetBtn = document.getElementById("resetSettings");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            localStorage.clear();
            location.reload();
        });
    }
}

/* =========================
   NAVBAR ACTIVE LINK FIX
   ========================= */
function syncNavbarActive() {
    const links = document.querySelectorAll(".nav-links a");
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    links.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
}
