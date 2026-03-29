const themeToggle = document.getElementById('themeToggle');
const toast = document.getElementById('toast');
let toastTimer = null;

function setTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('bs-theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
}

function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 1800);
}

function copyClassString(classString) {
    if (!navigator.clipboard) {
        const textArea = document.createElement('textarea');
        textArea.value = classString;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return Promise.resolve();
    }
    return navigator.clipboard.writeText(classString);
}

// Load saved theme
const savedTheme = localStorage.getItem('bs-theme') || 'light';
setTheme(savedTheme);

// Toggle click
themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-bs-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});

// Copy class on btn-gctl click
document.body.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.classList.contains('btn-gctl')) {
        return;
    }

    if (target.id === 'themeToggle') {
        return;
    }

    const classList = target.className.trim();
    if (!classList) return;

    copyClassString(classList)
        .then(() => {
            showToast(`Copied: ${classList}`);
        })
        .catch(() => {
            showToast('Copy failed, please try manually');
        });
});