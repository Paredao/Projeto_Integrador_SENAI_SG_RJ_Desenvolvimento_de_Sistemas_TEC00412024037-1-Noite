// ===== Aguarda o carregamento do DOM =====
document.addEventListener("DOMContentLoaded", () => {

// ===== LOGIN DE USUÁRIO =====
const formLogin = document.getElementById("form-login");
if (formLogin) {
  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("msg-login");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        msg.textContent = "✅ Login realizado com sucesso!";
        msg.style.color = "green";
        setTimeout(() => (window.location.href = "index.html"), 1000);
      } else {
        msg.textContent = "❌ Usuário ou senha inválidos.";
        msg.style.color = "red";
      }
    } catch (err) {
      console.error("Erro ao logar:", err);
      msg.textContent = "Erro de conexão com o servidor.";
      msg.style.color = "red";
    }
  });
}

// ===== GERENCIAR LOGIN / LOGOUT NO CABEÇALHO =====
const token = localStorage.getItem("token");
const username = localStorage.getItem("username");

const btnLogin = document.getElementById("btn-login");
const btnAnunciar = document.getElementById("btn-anunciar");
const usuarioLogado = document.getElementById("usuario-logado");
const nomeUsuario = document.getElementById("nome-usuario");
const btnLogout = document.getElementById("btn-logout");

if (token && username) {
  if (btnLogin) btnLogin.style.display = "none";
  if (usuarioLogado) usuarioLogado.style.display = "inline";
  if (nomeUsuario) nomeUsuario.textContent = username;
} else {
  if (btnLogin) btnLogin.style.display = "inline";
  if (usuarioLogado) usuarioLogado.style.display = "none";
}

if (btnLogout) {
  btnLogout.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/logout/", {
        method: "POST",
        headers: token ? { Authorization: `Token ${token}` } : {},
      });

      if (response.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        alert("Sessão encerrada com sucesso.");
        window.location.href = "index.html";
      } else {
        alert("Não foi possível encerrar a sessão. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro ao sair:", err);
      alert("Falha na conexão com o servidor. Tente novamente.");
    }
  });
}

if (btnAnunciar) {
  btnAnunciar.addEventListener("click", (e) => {
    if (!token) {
      e.preventDefault();
      alert("Você precisa estar logado para anunciar um produto.");
      window.location.href = "login.html";
    }
  });
}

// ===== CARROSSEL AUTOMÁTICO =====
const slides = document.querySelectorAll(".banner-slide");
if (slides.length > 0) {
  let currentSlide = 0;

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
}

// ===== MENU MOBILE =====
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    mobileNav.classList.toggle("show");
  });
}

// ===== ENVIO DE FORMULÁRIO DE ANÚNCIO =====
const formAnuncio = document.getElementById("form-anuncio");
if (formAnuncio) {
  formAnuncio.addEventListener("submit", async (e) => {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const categoria = document.getElementById("categoria").value;
    const descricao = document.getElementById("descricao").value;
    const preco = document.getElementById("preco").value;
    const imagemInput = document.getElementById("imagem");

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
        headers: token ? { Authorization: `Token ${token}` } : {},
        body: formData,
      });

      if (response.ok) {
        alert("Produto publicado com sucesso!");
        formAnuncio.reset();
      } else {
        const error = await response.json();
        console.error("Erro:", error);
        alert("Ocorreu um problema ao publicar o produto.");
      }
    } catch (err) {
      console.error("Erro na conexão:", err);
      alert("Falha ao conectar com o servidor.");
    }
  });
}

// ===== LISTAGEM AUTOMÁTICA DE PRODUTOS =====
const lista = document.getElementById("lista-produtos");
if (lista) {
  async function carregarProdutos() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/produtos/");
      if (!response.ok) throw new Error("Erro ao buscar produtos");
      const produtos = await response.json();

      if (produtos.length === 0) {
        lista.innerHTML = "<p>Nenhum produto cadastrado ainda.</p>";
        return;
      }

      lista.innerHTML = produtos
        .map(
          (p) => `
          <div class="produto">
            <img src="${
              p.imagem?.startsWith("http")
                ? p.imagem
                : p.imagem
                ? "http://127.0.0.1:8000" + p.imagem
                : "assets/img/produto-placeholder.png"
            }" alt="${p.titulo}" />
            <h3>${p.titulo}</h3>
            <p class="categoria">${p.categoria}</p>
            <p class="descricao">${p.descricao}</p>
            <p class="preco">R$ ${parseFloat(p.preco).toFixed(2)} / dia</p>
            ${
              p.usuario === localStorage.getItem("username")
                ? `<button class="btn-excluir" data-id="${p.id}">Excluir</button>`
                : ""
            }
          </div>`
        )
        .join("");

      // === Botão Excluir (depois que os produtos foram renderizados) ===
      document.querySelectorAll(".btn-excluir").forEach((btn) => {
        btn.addEventListener("click", async () => {
          const id = btn.dataset.id;
          const confirmar = confirm("Deseja realmente remover este anúncio?");
          if (!confirmar) return;

          try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://127.0.0.1:8000/api/produtos/${id}/`, {
              method: "DELETE",
              headers: {
                Authorization: `Token ${token}`,
              },
            });

            if (response.ok) {
              alert("O anúncio foi removido com sucesso.");
              btn.parentElement.remove();
            } else if (response.status === 403) {
              alert("Você não tem permissão para excluir este anúncio.");
            } else {
              alert("Não foi possível excluir o anúncio. Tente novamente.");
            }
          } catch (err) {
            console.error("Erro ao excluir:", err);
            alert("Falha ao tentar excluir o anúncio.");
          }
        });
      });

    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
      lista.innerHTML =
        "<p>Erro ao carregar produtos. Tente novamente mais tarde.</p>";
    }
  }

  carregarProdutos();
}

});
