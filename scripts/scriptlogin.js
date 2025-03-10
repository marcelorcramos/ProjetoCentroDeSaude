document.addEventListener("DOMContentLoaded", function () {
    let isLoggedIn = localStorage.getItem("loggedIn");
    let userEmail = localStorage.getItem("loggedUser");
    let userName = localStorage.getItem("name");
    let userNumber = localStorage.getItem("number");
    let userInfo = document.getElementById("userInfo");
    let loginForm = document.getElementById("loginForm");
    let cadastroDiv = document.getElementById("cadastroDiv");

                if (isLoggedIn) {
        userInfo.innerHTML = `
            <div class="user-info" style="margin-top: -100px; text-align: left;">
                <p>Nome: ${userName}</p>
                <p>Número de Utente: ${userNumber}</p>
                <p>Email: ${userEmail}</p>
                <button onclick="logout()">Logout</button>
            </div>
        `;
        loginForm.style.display = "none"; 
        if (cadastroDiv) cadastroDiv.style.display = "none";
    }
});

function login() {
    let user = document.getElementById("loginUser").value;
    let pass = document.getElementById("loginPass").value;
    let storedUser = localStorage.getItem("user");
    let storedPass = localStorage.getItem("pass");
    let isRegistered = localStorage.getItem("registered");

    if (!isRegistered) {
        alert("Você precisa se cadastrar antes de fazer login!");
        window.location.href = "cadastro.html";
        return;
    }

    if (user === storedUser && pass === storedPass) {
        alert("Login bem-sucedido!");
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("loggedUser", user);
        window.location.href = "home.html";
    } else {
        alert("Usuário ou senha incorretos!");
    }
}

function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("name");
    localStorage.removeItem("number");
    window.location.reload();
}