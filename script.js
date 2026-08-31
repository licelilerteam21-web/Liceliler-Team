/* =========================================
   LICELİLER TEAM
   Front-end demo sistemi
   ========================================= */

const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const welcomeModal = document.getElementById("welcomeModal");
const toast = document.getElementById("toast");


// -----------------------------------------
// Parçacık efekti
// -----------------------------------------

const particles = document.getElementById("particles");

for (let i = 0; i < 45; i++) {
    const particle = document.createElement("div");

    particle.className = "particle";

    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 7 + "s";
    particle.style.animationDuration =
        (5 + Math.random() * 7) + "s";

    particles.appendChild(particle);
}


// -----------------------------------------
// Modal sistemi
// -----------------------------------------

function openLogin() {
    closeModal();
    loginModal.classList.add("active");
}

function openRegister() {
    closeModal();
    registerModal.classList.add("active");
}

function switchToRegister() {
    closeModal();
    registerModal.classList.add("active");
}

function switchToLogin() {
    closeModal();
    loginModal.classList.add("active");
}

function closeModal() {
    loginModal.classList.remove("active");
    registerModal.classList.remove("active");
}

function closeWelcome() {
    welcomeModal.classList.remove("active");
    localStorage.setItem("licelilerWelcomeShown", "true");
}


// Modal dışına tıklayınca kapat
window.addEventListener("click", function(event) {

    if (event.target === loginModal) {
        loginModal.classList.remove("active");
    }

    if (event.target === registerModal) {
        registerModal.classList.remove("active");
    }

    if (event.target === welcomeModal) {
        welcomeModal.classList.remove("active");
    }
});


// ESC ile kapat
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeModal();
        welcomeModal.classList.remove("active");
    }
});


// -----------------------------------------
// Demo kayıt sistemi
// -----------------------------------------

function register() {

    const username =
        document.getElementById("registerUser").value.trim();

    const password =
        document.getElementById("registerPass").value;

    const result =
        document.getElementById("registerResult");

    if (username.length < 3) {
        result.innerHTML =
            '<span class="error">Kullanıcı adı en az 3 karakter olmalı.</span>';
        return;
    }

    if (password.length < 6) {
        result.innerHTML =
            '<span class="error">Şifre en az 6 karakter olmalı.</span>';
        return;
    }

    const users =
        JSON.parse(localStorage.getItem("licelilerUsers") || "[]");

    const exists =
        users.some(user => user.username === username);

    if (exists) {
        result.innerHTML =
            '<span class="error">Bu kullanıcı adı zaten kayıtlı.</span>';
        return;
    }

    users.push({
        username: username,
        password: password,
        rank: "Er"
    });

    localStorage.setItem(
        "licelilerUsers",
        JSON.stringify(users)
    );

    result.innerHTML =
        '<span class="success">Kayıt başarılı! Giriş yapabilirsiniz.</span>';

    document.getElementById("registerUser").value = "";
    document.getElementById("registerPass").value = "";

    setTimeout(() => {
        switchToLogin();
    }, 900);
}


// -----------------------------------------
// Demo giriş sistemi
// -----------------------------------------

function login() {

    const username =
        document.getElementById("loginUser").value.trim();

    const password =
        document.getElementById("loginPass").value;

    const result =
        document.getElementById("loginResult");

    /*
       Demo admin hesabı.

       Gerçek bir sitede kullanıcı/şifre bilgileri
       JavaScript veya localStorage içinde tutulmamalıdır.
       Bunun için sunucu taraflı kimlik doğrulama gerekir.
    */

    if (username === "admin" && password === "123456") {

        result.innerHTML =
            '<span class="success">Orgeneral yetkisiyle giriş yapıldı.</span>';

        localStorage.setItem("licelilerLoggedIn", "true");
        localStorage.setItem("licelilerRank", "Orgeneral");

        setTimeout(() => {
            closeModal();
            showToast("ADMIN • ORGENERAL olarak giriş yapıldı.");
            showWelcome();
        }, 700);

        return;
    }

    const users =
        JSON.parse(localStorage.getItem("licelilerUsers") || "[]");

    const user = users.find(
        item =>
            item.username === username &&
            item.password === password
    );

    if (!user) {

        result.innerHTML =
            '<span class="error">Kullanıcı adı veya şifre hatalı.</span>';

        return;
    }

    localStorage.setItem("licelilerLoggedIn", "true");
    localStorage.setItem("licelilerRank", user.rank);
    localStorage.setItem("licelilerUsername", user.username);

    result.innerHTML =
        '<span class="success">Giriş başarılı.</span>';

    setTimeout(() => {
        closeModal();
        showToast(
            user.username + " • " + user.rank +
            " olarak giriş yapıldı."
        );
        showWelcome();
    }, 700);
}


// -----------------------------------------
// Hoş geldin / bilgilendirme
// -----------------------------------------

function showWelcome() {

    if (
        !localStorage.getItem("licelilerWelcomeShown")
    ) {
        setTimeout(() => {
            welcomeModal.classList.add("active");
        }, 500);
    }
}


// -----------------------------------------
// Toast mesaj
// -----------------------------------------

let toastTimer;

function showToast(message) {

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}


// -----------------------------------------
// İletişim
// -----------------------------------------

function showMessage() {
    showToast(
        "İletişim sistemi yakında aktif olacak."
    );
}


// -----------------------------------------
// Üye sayacı
// -----------------------------------------

function updateMemberCount() {

    const users =
        JSON.parse(localStorage.getItem("licelilerUsers") || "[]");

    const count =
        Math.max(1, users.length + 1);

    const element =
        document.getElementById("memberCount");

    if (element) {
        element.textContent =
            String(count).padStart(3, "0");
    }
}

updateMemberCount();


// -----------------------------------------
// Sayfa açılış animasyonu
// -----------------------------------------

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

    /*
       Kullanıcı zaten giriş yaptıysa
       sayfada bilgi mesajı gösterebiliriz.
    */

    if (localStorage.getItem("licelilerLoggedIn") === "true") {

        const username =
            localStorage.getItem("licelilerUsername");

        const rank =
            localStorage.getItem("licelilerRank");

        if (username && rank) {
            setTimeout(() => {
                showToast(
                    username + " • " + rank +
                    " hesabı aktif."
                );
            }, 1200);
        }
    }
});
