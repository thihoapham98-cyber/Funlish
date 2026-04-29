
// Multi-language Logic
let currentLang = 'vi';

function setLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`lang-${lang}`).classList.add('active');

    document.querySelectorAll('[data-lang]')
        .forEach(el => {

            const key = el.dataset.lang;

            if (LANG[key]) {

                el.innerText = LANG[key][lang];

            }
        });

    // Update placeholder
    const input = document.getElementById('chat-input');
    input.placeholder = lang === 'vi' ? 'Hỏi Funlish điều gì đó...' : 'Ask Funlish something...';
}

// Modal Management
function openRegisterModal(courseName) {
    document.getElementById('modal-course-name').innerText = (currentLang === 'vi' ? "Khóa học: " : "Course: ") + courseName;
    document.getElementById('registerModal').style.display = 'flex';
}

function openContentModal(type) {
    const contentArea = document.getElementById('modal-content-area');
    const data = {
        about: {
            vi: { title: "Về E-Elite Academy", body: "Hệ thống giáo dục hàng đầu với 100% giáo viên bản ngữ đạt chứng chỉ CELTA/TESOL." },
            en: { title: "About E-Elite", body: "Leading education system with 100% native teachers certified by CELTA/TESOL." }
        },
        tintuc: {
            vi: { title: "Tin tức mới nhất", body: "Mason v2.0 đã cập nhật tính năng phân tích giọng nói AI vượt trội." },
            en: { title: "Latest News", body: "Mason v2.0 updated with superior AI voice analysis features." }
        }
    };
    const item = data[type] ? data[type][currentLang] : { title: "Elite", body: "..." };
    contentArea.innerHTML = `<h3 class="text-3xl font-bold mb-6 text-blue-900">${item.title}</h3><p class="text-slate-600 text-lg">${item.body}</p>`;
    document.getElementById('contentModal').style.display = 'flex';
}

// Chat Logic
function toggleAIChat() {
    const chat = document.getElementById('ai-mason-chat');
    chat.style.display = (chat.style.display === 'flex' ? 'none' : 'flex');
}

function processChat() {
    const input = document.getElementById('chat-input');
    const val = input.value.trim();
    if(!val) return;
    appendMsg(val, 'user');
    input.value = "";
    setTimeout(() => {
        const reply = currentLang === 'vi' ? "Tôi đã nhận thông tin. Bạn muốn tư vấn khóa học nào ạ?" : "Got it. Which course are you interested in?";
        appendMsg(reply, 'ai');
    }, 800);
}

function appendMsg(txt, type) {
    const container = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = `chat-bubble ${type === 'ai' ? 'ai-msg shadow-sm' : 'user-msg'}`;
    div.textContent = txt;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

window.onclick = (e) => { if(e.target.classList.contains('modal-overlay')) closeModals(); }