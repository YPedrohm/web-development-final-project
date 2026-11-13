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
let categoriaEscolhida = "Todos";
let carrinho = [];

function carregarDados() {
    let produtosSalvos = localStorage.getItem("produtos");
    let bannerSalvo = localStorage.getItem("banner");
    let carrinhoSalvo = localStorage.getItem("carrinho");

    if (produtosSalvos == null) {
        produtos = produtosIniciais;
        localStorage.setItem("produtos", JSON.stringify(produtos));
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
    localStorage.setItem("produtos", JSON.stringify(produtos));

    if (bannerSalvo == null) {
        localStorage.setItem("banner", JSON.stringify(bannerInicial));
        bannerSalvo = JSON.stringify(bannerInicial);
    }

    if (carrinhoSalvo != null) {
        carrinho = JSON.parse(carrinhoSalvo);
    }

    let banner = JSON.parse(bannerSalvo);
    document.getElementById("tituloBanner").innerText = banner.titulo;
    document.getElementById("textoBanner").innerText = banner.texto;

    atualizarCarrinho();
    mostrarProdutos();
}

function mostrarProdutos() {
    let lista = document.getElementById("listaProdutos");
    let mensagemVazia = document.getElementById("mensagemVazia");
    let ordenacao = document.getElementById("ordenacao").value;
    let produtosParaMostrar = [];
    let i;

    for (i = 0; i < produtos.length; i++) {
        if (categoriaEscolhida == "Todos" || produtos[i].categoria == categoriaEscolhida) {
            produtosParaMostrar.push(produtos[i]);
        }
    }

    if (ordenacao == "menor") {
        produtosParaMostrar.sort(function(a, b) {
            return a.preco - b.preco;
        });
    } else if (ordenacao == "maior") {
        produtosParaMostrar.sort(function(a, b) {
            return b.preco - a.preco;
        });
    }

    lista.innerHTML = "";

    for (i = 0; i < produtosParaMostrar.length; i++) {
        let produto = produtosParaMostrar[i];
        let indiceOriginal = produtos.indexOf(produto);
        let preco = produto.preco.toFixed(2).replace(".", ",");
        let textoBotao = "Adicionar ao carrinho";
        let desabilitado = "";

        if (produto.estoque <= 0) {
            textoBotao = "Sem estoque";
            desabilitado = "disabled";
        }

        lista.innerHTML +=
            '<div class="produto">' +
                '<img class="foto-produto" src="' + produto.imagem + '" alt="' + produto.nome + '">' +
                '<div class="dados-produto">' +
                    '<span class="categoria">' + produto.categoria + '</span>' +
                    '<h3>' + produto.nome + '</h3>' +
                    '<p class="preco">R$ ' + preco + '</p>' +
                    '<p class="estoque">Estoque: ' + produto.estoque + ' unidade(s)</p>' +
                    '<button onclick="adicionarCarrinho(' + indiceOriginal + ')" ' + desabilitado + '>' +
                        textoBotao +
                    '</button>' +
                '</div>' +
            '</div>';
    }

    if (produtosParaMostrar.length == 0) {
        mensagemVazia.style.display = "block";
    } else {
        mensagemVazia.style.display = "none";
    }
}

function filtrarCategoria(categoria) {
    categoriaEscolhida = categoria;
    mostrarProdutos();
}

function adicionarCarrinho(indice) {
    if (produtos[indice].estoque > 0) {
        carrinho.push(produtos[indice].nome);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        atualizarCarrinho();
        alert("Produto adicionado ao carrinho!");
    }
}

function atualizarCarrinho() {
    document.getElementById("quantidadeCarrinho").innerText = carrinho.length;
}

function mostrarCarrinho() {
    if (carrinho.length == 0) {
        alert("O carrinho está vazio.");
    } else {
        alert("Você possui " + carrinho.length + " produto(s) no carrinho.");
    }
}

window.addEventListener("storage", function() {
    produtos = JSON.parse(localStorage.getItem("produtos"));
    carregarDados();
});

carregarDados();
