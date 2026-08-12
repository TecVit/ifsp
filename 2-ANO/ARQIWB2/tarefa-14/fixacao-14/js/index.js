const banner = document.querySelector("#banner-cookies");

function mostrarBanner() {
    banner.style.display = "block";
}

function esconderBanner() {
    banner.style.display = "none";
}

function aceitarCookies() {
    localStorage.setItem("cookies", "aceito");
    esconderBanner();
}

function rejeitarCookies() {
    localStorage.setItem("cookies", "rejeitado");
    esconderBanner();
}

const escolhaSalva = localStorage.getItem("cookies");

if (escolhaSalva === null) {
    mostrarBanner();
}
