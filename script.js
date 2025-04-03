document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("productForm");
    const productList = document.getElementById("productList");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const descricao = document.getElementById("descricao").value;
        const preco = document.getElementById("preco").value;
        const link = document.getElementById("link").value;
        const imagemInput = document.getElementById("imagem");

        if (nome && descricao && preco && link) {
            const produto = {
                nome,
                descricao,
                preco,
                link,
                imagem: ""
            };

            // Processar a imagem
            const reader = new FileReader();
            reader.onload = function (e) {
                produto.imagem = e.target.result;
                salvarProduto(produto);
                exibirProdutos();
            };
            if (imagemInput.files[0]) {
                reader.readAsDataURL(imagemInput.files[0]);
            } else {
                salvarProduto(produto);
                exibirProdutos();
            }

            form.reset();
        }
    });

    function salvarProduto(produto) {
        let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
        produtos.push(produto);
        localStorage.setItem("produtos", JSON.stringify(produtos));
    }

    function exibirProdutos() {
        productList.innerHTML = "";
        let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

        produtos.forEach((produto, index) => {
            const produtoElemento = document.createElement("div");
            produtoElemento.classList.add("produto");
            produtoElemento.innerHTML = `
                ${produto.imagem ? `<img src="${produto.imagem}" alt="${produto.nome}">` : ""}
                <h2>${produto.nome}</h2>
                <p>${produto.descricao}</p>
                <p><strong>Preço:</strong> R$ ${produto.preco}</p>
                <a href="${produto.link}" class="botao" target="_blank">Comprar</a>
                <button onclick="removerProduto(${index})">Remover</button>
            `;
            productList.appendChild(produtoElemento);
        });
    }

    window.removerProduto = function (index) {
        let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
        produtos.splice(index, 1);
        localStorage.setItem("produtos", JSON.stringify(produtos));
        exibirProdutos();
    };

    exibirProdutos();
});
