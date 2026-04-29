let currentLang = 'vi';
function toggleLang() {
    currentLang = currentLang === 'vi' ? 'en' : 'vi';
    const d = langData[currentLang];
    
    document.getElementById('txt-appname').innerText = d.appname;
    document.querySelector('.nav-home').innerText = d.home;
    document.querySelector('.nav-forum').innerText = d.forum;
    document.querySelector('.nav-resources').innerText = d.resources;
    document.querySelector('.nav-games').innerText = d.games;
    document.querySelector('.nav-ranking').innerText = d.ranking;
    document.querySelector('.nav-practice').innerText = d.practice;
    document.querySelector('.eventmonth').innerText = d.event_month;
    document.querySelector('.title_event_month').innerText = d.title_event_month;
    document.querySelector('.description_event_month').innerText = d.description_event_month;
    document.querySelector('.candidate_event_month').innerText = d.candidate_event_month;
    document.querySelector('.competition').innerText = d.title_competition;
    document.querySelector('.title_competition').innerText = d.title_competition;
    document.querySelector('.qualifying_round_competition').innerText = d.qualifying_round_competition;
    document.querySelector('.description_competition').innerText = d.description_competition;
    document.querySelector('.register_competition').innerText = d.register_competition;
    document.querySelector('.newskill').innerText = d.newskill;
    document.querySelector('.title_newskill').innerText = d.title_newskill;
    document.querySelector('.description_newskill').innerText = d.description_newskill;
    document.querySelector('.guidance').innerText = d.guidance;
    document.querySelector('.title_guidance').innerText = d.title_guidance;
    document.querySelector('.description_guidance').innerText = d.description_guidance;
    document.querySelector('.club').innerText = d.club;
    document.querySelector('.title_club').innerText = d.title_club;
    document.querySelector('.description_club').innerText = d.description_club;
    document.querySelector('.consultant').innerText = d.consultant;
    document.querySelector('.title_consultant').innerText = d.title_consultant;
    document.querySelector('.description_consultant').innerText = d.description_consultant;
    document.querySelector('.txt-welcome').innerText = d.welcome;
    document.querySelector('.txt-hot-topics').innerText = d.hot;
    document.querySelector('.txt-score-label').innerText = d.score;
    document.querySelector('.txt-level-label').innerText = d.level;
    document.querySelector('.btn-pastel').innerText = d.btnRoom;
    document.querySelector('.btn_discussion_room').innerText = d.btn_discussion_room;
    document.querySelector('.txt-weekly-mission').innerText = d.mission;
    document.getElementById('langBtn').innerText = d.btnLang;
}

function showTab(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.sidebar-menu a').forEach(a => a.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    const activeNav = Array.from(document.querySelectorAll('.sidebar-menu a')).find(a => a.getAttribute('onclick').includes(id));
    if(activeNav) activeNav.classList.add('active');
    window.scrollTo(0, 0);
}

function addPost() {
    const input = document.getElementById('forumInput');
    if(!input.value) return;
    const list = document.getElementById('postList');
    const newPost = document.createElement('div');
    newPost.className = 'post-card';
    newPost.innerHTML = `
        <span class="post-tag">CÂU HỎI CỦA BẠN</span>
        <b>${input.value}</b>
        <p style="font-size: 0.85em; opacity: 0.8;">Bởi: Bạn - Vừa xong • 0 Bình luận</p>
    `;
    list.prepend(newPost);
    input.value = '';

    setTimeout(() => {
        const aiReply = document.createElement('div');
        aiReply.innerHTML = `
            <hr style="margin: 10px 0; opacity: 0.1;">
            <p style="font-size: 0.9em; color: #5B7480;"><b>Gia sư AI Mason:</b> Đây là một câu hỏi rất hay! Bạn hãy thử kiểm tra bộ đề thi PDF ở mục Tài liệu để thấy ví dụ thực tế hơn nhé!</p>
        `;
        newPost.appendChild(aiReply);
    }, 1500);
}

const memItems = ['🍎', '🐶', '⚽', '🍦', '🍓', '🎮', '🍎', '🐶', '⚽', '🍦', '🍓', '🎮'];
let flippedCards = [];
let matchedCount = 0;

function initMemory() {
    const grid = document.getElementById('memGrid');
    grid.innerHTML = '';
    matchedCount = 0;
    document.getElementById('gameMsg').innerText = '';
    [...memItems].sort(() => Math.random() - 0.5).forEach((icon) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.icon = icon;
        card.innerHTML = '?';
        card.onclick = () => handleFlip(card);
        grid.appendChild(card);
    });
}

function handleFlip(card) {
    if (flippedCards.length === 2 || card.classList.contains('flipped')) return;
    card.classList.add('flipped');
    card.innerHTML = card.dataset.icon;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        if (flippedCards[0].dataset.icon === flippedCards[1].dataset.icon) {
            matchedCount += 2;
            flippedCards = [];
            if (matchedCount === memItems.length) {
                document.getElementById('gameMsg').innerText = '🎉 CHIẾN THẮNG! +150 ĐIỂM';
                updateScore(150);
            }
        } else {
            setTimeout(() => {
                flippedCards.forEach(c => {
                    c.classList.remove('flipped');
                    c.innerHTML = '?';
                });
                flippedCards = [];
            }, 800);
        }
    }
}

function updateScore(pts) {
    let score = parseInt(document.getElementById('userScore').innerText);
    document.getElementById('userScore').innerText = score + pts;
}

function openRoomForm() {
    document.getElementById('roomModal').style.display = 'flex';
    document.getElementById('roomFormBody').style.display = 'block';
    document.getElementById('loadingArea').style.display = 'none';
}

function closeModal() {
    document.getElementById('roomModal').style.display = 'none';
}

function createRoom() {
    const name = document.getElementById('inpRoomName').value;
    const link = document.getElementById('inpRoomLink').value || 'https://zoom.us';
    if(!name) { alert('Vui lòng nhập chủ đề thảo luận!'); return; }

    document.getElementById('roomFormBody').style.display = 'none';
    document.getElementById('loadingArea').style.display = 'flex';

    setTimeout(() => {
        closeModal();
        const container = document.getElementById('roomContainer');
        const room = document.createElement('div');
        room.className = 'post-card';
        room.style.display = 'flex';
        room.style.justifyContent = 'space-between';
        room.style.alignItems = 'center';
        room.style.background = 'var(--success)';
        room.style.marginTop = '10px';
        room.innerHTML = `
            <div>
                <b>[PHÒNG MỚI] ${name}</b>
                <p style="font-size: 0.8em; opacity:0.7;">Chủ trì: Bạn - Đang hoạt động</p>
            </div>
            <button class="btn-pastel" onclick="window.open('${link}', '_blank')">VÀO PHÒNG</button>
        `;
        container.prepend(room);
        document.getElementById('inpRoomName').value = '';
        document.getElementById('inpRoomLink').value = '';
    }, 2500);
}

initMemory();