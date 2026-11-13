const produtosIniciais = [
    { nome: "Teclado Mecânico Start", categoria: "Teclados", preco: 249.90, estoque: 10, imagem: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80" },
    { nome: "Teclado Compacto Basic", categoria: "Teclados", preco: 159.90, estoque: 7, imagem: "https://images.unsplash.com/photo-1720969839368-ab949e88d3b7?auto=format&fit=crop&w=600&q=80" },
    { nome: "Mouse Gamer Speed", categoria: "Mouses", preco: 119.90, estoque: 15, imagem: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=80" },
    { nome: "Mouse Sem Fio Office", categoria: "Mouses", preco: 79.90, estoque: 12, imagem: "https://images.unsplash.com/photo-1612631673101-2366dce365b4?auto=format&fit=crop&w=600&q=80" },
    { nome: "Headset Play", categoria: "Headsets", preco: 189.90, estoque: 5, imagem: "https://images.unsplash.com/photo-1548030415-e1eb1c684c9b?auto=format&fit=crop&w=600&q=80" },
    { nome: "Suporte para Headset", categoria: "Acessórios", preco: 69.90, estoque: 8, imagem: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80" }
];

const bannerInicial = {
    titulo: "Monte o seu setup",
    texto: "Periféricos de qualidade com preços especiais."
};

let produtos = [];

function carregarDados() {
    let produtosSalvos = localStorage.getItem("produtos");
    let bannerSalvo = localStorage.getItem("banner");

    if (produtosSalvos == null) {
        produtos = produtosIniciais;
        salvarProdutos();
    } else {
        produtos = JSON.parse(produtosSalvos);
    }

    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].imagem == null || produtos[i].imagem == "") {
            if (produtos[i].categoria == "Mouses") {
                produtos[i].imagem = produtosIniciais[2].imagem;
            } else if (produtos[i].categoria == "Headsets") {
                produtos[i].imagem = produtosIniciais[4].imagem;
            } else if (produtos[i].categoria == "Acessórios") {
                produtos[i].imagem = produtosIniciais[5].imagem;
            } else {
                produtos[i].imagem = produtosIniciais[0].imagem;
            }
        }
    }
    salvarProdutos();

    if (bannerSalvo == null) {
        localStorage.setItem("banner", JSON.stringify(bannerInicial));
        bannerSalvo = JSON.stringify(bannerInicial);
    }

    let banner = JSON.parse(bannerSalvo);
    document.getElementById("tituloBanner").value = banner.titulo;
    document.getElementById("textoBanner").value = banner.texto;

    mostrarTabela();
    atualizarResumo();
}

function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

function mostrarTabela() {
    let tabela = document.getElementById("tabelaProdutos");
    let mensagemVazia = document.getElementById("tabelaVazia");
    let i;

    tabela.innerHTML = "";

    for (i = 0; i < produtos.length; i++) {
        let preco = produtos[i].preco.toFixed(2).replace(".", ",");

        tabela.innerHTML +=
            "<tr>" +
                "<td>" + produtos[i].nome + "</td>" +
                "<td>" + produtos[i].categoria + "</td>" +
                "<td>R$ " + preco + "</td>" +
                "<td>" + produtos[i].estoque + "</td>" +
                "<td>" +
                    '<button class="botao-editar" onclick="editarProduto(' + i + ')">Editar</button>' +
                    '<button class="botao-excluir" onclick="excluirProduto(' + i + ')">Excluir</button>' +
                "</td>" +
            "</tr>";
    }

    if (produtos.length == 0) {
        mensagemVazia.style.display = "block";
    } else {
        mensagemVazia.style.display = "none";
    }
}

function atualizarResumo() {
    let quantidadeComEstoque = 0;
    let i;

    for (i = 0; i < produtos.length; i++) {
        if (produtos[i].estoque > 0) {
            quantidadeComEstoque = quantidadeComEstoque + 1;
        }
    }

    document.getElementById("totalProdutos").innerText = produtos.length;
    document.getElementById("produtosEstoque").innerText = quantidadeComEstoque;
}

document.getElementById("formProduto").addEventListener("submit", function(evento) {
    evento.preventDefault();

    let indice = document.getElementById("indiceProduto").value;
    let nome = document.getElementById("nomeProduto").value;
    let categoria = document.getElementById("categoriaProduto").value;
    let preco = Number(document.getElementById("precoProduto").value);
    let estoque = Number(document.getElementById("estoqueProduto").value);
    let imagem = document.getElementById("imagemProduto").value;

    let produto = {
        nome: nome,
        categoria: categoria,
        preco: preco,
        estoque: estoque,
        imagem: imagem
    };

    if (indice == "") {
        produtos.push(produto);
        alert("Produto cadastrado com sucesso!");
    } else {
        produtos[indice] = produto;
        alert("Produto alterado com sucesso!");
    }

    salvarProdutos();
    limparFormulario();
    mostrarTabela();
    atualizarResumo();
});

function editarProduto(indice) {
    document.getElementById("indiceProduto").value = indice;
    document.getElementById("nomeProduto").value = produtos[indice].nome;
    document.getElementById("categoriaProduto").value = produtos[indice].categoria;
    document.getElementById("precoProduto").value = produtos[indice].preco;
    document.getElementById("estoqueProduto").value = produtos[indice].estoque;
    document.getElementById("imagemProduto").value = produtos[indice].imagem;
    document.getElementById("botaoSalvar").innerText = "Salvar alterações";
    document.getElementById("botaoCancelar").style.display = "inline-block";
    document.getElementById("cadastro").scrollIntoView();
}

function excluirProduto(indice) {
    let resposta = confirm("Deseja realmente excluir este produto?");

    if (resposta == true) {
        produtos.splice(indice, 1);
        salvarProdutos();
        mostrarTabela();
        atualizarResumo();
        alert("Produto excluído.");
    }
}

function limparFormulario() {
    document.getElementById("formProduto").reset();
    document.getElementById("indiceProduto").value = "";
    document.getElementById("botaoSalvar").innerText = "Cadastrar produto";
    document.getElementById("botaoCancelar").style.display = "none";
}

function cancelarEdicao() {
    limparFormulario();
}

document.getElementById("formBanner").addEventListener("submit", function(evento) {
    evento.preventDefault();

    let banner = {
        titulo: document.getElementById("tituloBanner").value,
        texto: document.getElementById("textoBanner").value
    };

    localStorage.setItem("banner", JSON.stringify(banner));
    alert("Banner alterado com sucesso!");
});

carregarDados();
