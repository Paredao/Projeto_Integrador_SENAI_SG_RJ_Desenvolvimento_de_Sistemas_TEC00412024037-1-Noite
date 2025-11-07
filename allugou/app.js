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

// ===== Envio do formulário de anúncio para a API =====
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-anuncio");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const titulo = document.getElementById("titulo").value;
      const categoria = document.getElementById("categoria").value;
      const descricao = document.getElementById("descricao").value;
      const preco = document.getElementById("preco").value;
      const imagemInput = document.getElementById("imagem");

      // Cria o FormData (para incluir texto e imagem)
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("categoria", categoria);
      formData.append("descricao", descricao);
      formData.append("preco", preco);
      if (imagemInput.files[0]) {
        formData.append("imagem", imagemInput.files[0]);
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/api/produtos/", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          alert("✅ Produto cadastrado com sucesso!");
          form.reset();
        } else {
          const error = await response.json();
          console.error("Erro:", error);
          alert("❌ Ocorreu um erro ao cadastrar o produto.");
        }
      } catch (err) {
        console.error("Erro na conexão:", err);
        alert("❌ Falha ao conectar com o servidor.");
      }
    });
  }
});
