function pesquisar() {
    let section = document.getElementById("resultados-pesquisa");
    let campoPesquisa = document.getElementById("campo-pesquisa").value

    if (!campoPesquisa) {
        section.innerHTML = "<p>Nada foi encontrado. Pesquise o item pelo nome ou tag.</p>"
        return
    }

    campoPesquisa = campoPesquisa.toLowerCase()
    let resultados = "";
    let nome = "";
    let tags = "";

    for (let dado of dados) {
        nome = dado.nome.toLowerCase()
        tags = dado.tags.toLowerCase()
        
        if (nome.includes(campoPesquisa) || tags.includes(campoPesquisa)) {
            resultados += `
            <div class="item-resultado">
                <h2>
                    <a href="#" target="_blank">${dado.nome}</a>
                </h2>
                <p class="descricao-meta">${dado.descricao}</p>
                <a href=${dado.link} target="_blank">Mais informações</a>
            </div>
        `;
        }
    }

    if (!resultados) {
        resultados = "<p>Nada foi encontrado.</p>"
    }

    section.innerHTML = resultados;
}
