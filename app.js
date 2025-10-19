// function pesquisar() {
//     let section = document.getElementById("resultados-pesquisa");
//     let campoPesquisa = document.getElementById("campo-pesquisa").value

//     if (!campoPesquisa) {
//         section.innerHTML = "<p>Nada foi encontrado. Pesquise o item pelo nome ou tag.</p>"
//         return
//     }

//     campoPesquisa = campoPesquisa.toLowerCase()
//     let resultados = "";
//     let nome = "";
//     let descricao = "";
//     let tags = "";

//     for (let dado of dados) {
//         nome = dado.nome.toLowerCase()
//         tags = dado.descricao.toLowerCase()
//         tags = dado.tags.toLowerCase()
        
//         if (nome.includes(campoPesquisa) || descricao.includes(campoPesquisa) || tags.includes(campoPesquisa)) {
//             resultados += `
//             <div class="item-resultado">
//                 <h2>
//                     <a href="#" target="_blank">${dado.nome}</a>
//                 </h2>
//                 <p class="descricao-meta">${dado.descricao}</p>
//                 <a href=${dado.link} target="_blank">Mais informações</a>
//             </div>
//         `;
//         }
//     }

//     if (!resultados) {
//         resultados = "<p>Nada foi encontrado.</p>"
//     }

//     section.innerHTML = resultados;
// }

// ===== Carrossel Automático =====
let currentSlide = 0;
const slides = document.querySelectorAll(".banner-slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 5000);

// ===== Menu Mobile =====
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

menuToggle.addEventListener("click", () => {
  mobileNav.classList.toggle("show");
});

// ===== Modo Escuro Manual =====
const modoBtn = document.querySelector(".modo-toggle");
modoBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  modoBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});
