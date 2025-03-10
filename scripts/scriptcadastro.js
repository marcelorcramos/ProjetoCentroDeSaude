function register() {
    let user = document.getElementById("registerUser").value;
    let pass = document.getElementById("registerPass").value;
    let number = document.getElementById("registerNumber").value;
    let name = document.getElementById("registerName").value;

    // Verifica se todos os campos estão preenchidos
    if (!user || !pass || !name || !number) {
        alert("Preencha todos os campos!");
        return;
    }

    // Verifica se o número tem exatamente 9 dígitos numéricos
    if (!/^\d{9}$/.test(number)) {
        alert("O número de registro deve conter exatamente 9 dígitos!");
        return;
    }

    // Salva os dados no localStorage
    localStorage.setItem("user", user);
    localStorage.setItem("pass", pass);
    localStorage.setItem("name", name);
    localStorage.setItem("number", number);
    localStorage.setItem("registered", "true");

    alert("Cadastro realizado com sucesso! Agora você pode fazer login.");
    window.location.href = "login.html";
}

// Verifica se os campos de login estão preenchidos antes de ativar o botão
const inputs = document.querySelectorAll("#loginUser, #loginPass");
const loginBtn = document.getElementById("loginBtn");

inputs.forEach(input => {
    input.addEventListener("input", () => {
        const allFilled = [...inputs].every(input => input.value.trim() !== "");
        loginBtn.disabled = !allFilled;
    });
});
