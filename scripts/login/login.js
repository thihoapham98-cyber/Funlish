let currentLang = 'vi';
let isLogin = true;
let currentRole = 'user';
let activeSocial = '';

function setLanguage(l) {
    currentLang = l;
    const d = langs[l];
    document.getElementById('lang-flag').innerText = d.flag;
    document.getElementById('lang-display').innerText = d.name;
    document.getElementById('role-title').innerHTML = d.roleTitle;
    document.getElementById('role-subtitle').innerText = d.roleSubtitle;
    
    const sloganEl = document.getElementById('role-slogan');
    sloganEl.innerText = d.slogan;
    sloganEl.style.animation = 'none'; sloganEl.offsetHeight; sloganEl.style.animation = null;

    document.getElementById('back-text').innerText = d.back;
    document.getElementById('panel-title').innerText = d.welcome;
    document.getElementById('panel-desc').innerText = d.panelDesc;
    document.getElementById('form-title').innerText = isLogin ? d.login : d.register;
    document.getElementById('form-subtitle').innerText = d.subtitle;
    document.getElementById('lbl-name').innerText = d.lblName;
    document.getElementById('lbl-pass').innerText = d.lblPass;
    document.getElementById('submit-btn-text').innerText = d.btnConfirm;
    document.getElementById('toggle-text').innerText = isLogin ? d.toggleReg : d.toggleLog;
    document.getElementById('social-text').innerText = d.social;

    document.getElementById('social-form-subtitle').innerText = d.socialSub;
    document.getElementById('lbl-social-user').innerText = d.socialUser;
    document.getElementById('lbl-social-pass').innerText = d.socialPass;
}

function selectRole(r) {
    currentRole = r;
    document.getElementById('role-view').classList.add('hidden-view');
    document.getElementById('auth-view').classList.remove('hidden-view');
    
    const panel = document.getElementById('auth-panel');
    const icon = document.getElementById('role-main-icon');
    const toggleBtn = document.getElementById('toggle-auth-btn');

    if(r === 'user') {
        panel.className = "md:w-[35%] p-10 text-white flex flex-col justify-between relative bg-purple-800";
        icon.className = "fas fa-user-graduate text-5xl";
    }
    
    document.getElementById('social-login').classList.toggle('hidden', r === 'admin');
}

function toggleAuthMode() {
    isLogin = !isLogin;
    const d = langs[currentLang];
    document.getElementById('name-box').classList.toggle('hidden', isLogin);
    document.getElementById('form-title').innerText = isLogin ? d.login : d.register;
    document.getElementById('toggle-text').innerText = isLogin ? d.toggleReg : d.toggleLog;
}

function togglePass() { 
    const i = document.getElementById('auth-pass'); 
    i.type = i.type === 'password' ? 'text' : 'password'; 
    document.getElementById('eye-icon').className = i.type === 'password' ? 'fas fa-eye text-sm' : 'fas fa-eye-slash text-sm'; 
}

function showToast(title, msg, type = 'info') {
    const toast = document.getElementById('toast');
    document.getElementById('toast-title').innerText = title.toUpperCase();
    document.getElementById('toast-msg').innerText = msg;
    const iconBox = document.getElementById('toast-icon-box');
    const icon = document.getElementById('toast-icon');
    
    iconBox.className = "w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg " + 
        (type === 'success' ? 'bg-emerald-500' : type === 'error' ? 'bg-red-500' : 'bg-indigo-600');
    icon.className = type === 'success' ? 'fas fa-check text-white' : type === 'error' ? 'fas fa-times text-white' : 'fas fa-spinner fa-spin text-white';
    
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3000);
}

async function handleAuth(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const btnTxt = document.getElementById('submit-btn-text');
    const email = document.getElementById('auth-email').value;
    const pass = document.getElementById('auth-pass').value;

    btnTxt.innerHTML = '<div class="loader-ring"></div>';
    btn.classList.add('opacity-80', 'pointer-events-none');

    await new Promise(r => setTimeout(r, 1200));

    // Logic Phân Quyền Đăng Nhập
    let redirectUrl = "";
    let isValid = false;

    if (currentRole === 'user' && email === "abc@gmail.com" && pass === "linh") {
        isValid = true;
        redirectUrl = "listcourse.html";
    }

    if (isValid) {
        showToast(langs[currentLang].toastSuccess, "Xin chào! Đang chuyển hướng...", "success");
        setTimeout(() => {
            window.location.href = redirectUrl;
        }, 800);
    } else {
        showToast(langs[currentLang].toastError, "Tài khoản hoặc mật khẩu không chính xác", "error");
        btn.classList.remove('opacity-80', 'pointer-events-none');
        btnTxt.innerText = langs[currentLang].btnConfirm;
    }
}

function openSocialModal(p) { 
    activeSocial = p;
    document.getElementById('social-modal').classList.add('active');
    document.getElementById('social-form-title').innerText = `${langs[currentLang].socialTitle} ${p}`;
    document.getElementById('social-submit-text').innerText = `${langs[currentLang].socialBtn} ${p}`;
    const icon = document.getElementById('social-form-icon');
    const sBtn = document.getElementById('social-submit-btn');
    
    if(p === 'Google') {
        icon.className = "w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl shadow-lg bg-google";
        icon.innerHTML = '<i class="fab fa-google"></i>';
        sBtn.className = "w-full py-4 rounded-xl text-white font-black uppercase text-[10px] tracking-widest shadow-xl bg-google flex items-center justify-center gap-2";
    } else {
        icon.className = "w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl shadow-lg bg-facebook";
        icon.innerHTML = '<i class="fab fa-facebook-f"></i>';
        sBtn.className = "w-full py-4 rounded-xl text-white font-black uppercase text-[10px] tracking-widest shadow-xl bg-facebook flex items-center justify-center gap-2";
    }
}

function closeSocialModal() { document.getElementById('social-modal').classList.remove('active'); }
async function handleSocialAuth(e) { 
    e.preventDefault();
    showToast("Social Link", "Đang xác thực qua " + activeSocial, "info");
    setTimeout(() => {
        showToast("Thành công", "Liên kết mạng xã hội thành công", "success");
        closeSocialModal();
    }, 1500);
}

function toggleDarkMode() { 
    document.documentElement.classList.toggle('dark'); 
    document.getElementById('theme-icon').className = document.documentElement.classList.contains('dark') ? 'fas fa-sun' : 'fas fa-moon'; 
}

function logout() { location.reload(); }

setLanguage('vi');
selectRole('user');