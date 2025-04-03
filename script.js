document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("productForm");
    const productList = document.getElementById("productList");
    const loginForm = document.getElementById("loginForm");
    const adminPanel = document.getElementById("adminPanel");

    // Verificar se o usuário já está autenticado
    if (localStorage.getItem("isAdmin") === "true") {
        loginForm.style.display = "none";
        adminPanel.style.display = "block";
    }

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
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h2>${produto.nome}</h2>
                <p>${produto.descricao}</p>
                <p><strong>Preço:</strong> R$ ${produto.preco}</p>
                <a href="${produto.link}" class="botao" target="_blank">Comprar</a>
                ${localStorage.getItem("isAdmin") === "true" ? `<button class="remover" onclick="removerProduto(${index})">X</button>` : ""}
            `;
            productList.appendChild(produtoElemento);
        });
    }

    // Adicionar produto ao LocalStorage
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const descricao = document.getElementById("descricao").value;
        const preco = document.getElementById("preco").value;
        const link = document.getElementById("link").value;
        const imagemInput = document.getElementById("imagem").files[0];
        if (imagemInput) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const produto = {
                    nome, 
                    descricao, 
                    preco, 
                    link, 
                    imagem: e.target.result // CONVERTENDO PARA BASE64
                };
                salvarProduto(produto);
                exibirProdutos();
                form.reset();
            };
            reader.readAsDataURL(imagemInput);
        }
    });

    // Remover Produto
    window.removerProduto = function (index) {
        let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
        produtos.splice(index, 1);
        localStorage.setItem("produtos", JSON.stringify(produtos));
        exibirProdutos();
    };

    // Função de Login
    window.login = function () {
        const senha = document.getElementById("password").value;
        if (senha === "admin123") {
            localStorage.setItem("isAdmin", "true");
            loginForm.style.display = "none";
            adminPanel.style.display = "block";
            exibirProdutos();
        } else {
            alert("Senha incorreta!");
        }
    };

    // Função de Logout
    window.logout = function () {
        localStorage.removeItem("isAdmin");
        loginForm.style.display = "block";
        adminPanel.style.display = "none";
        exibirProdutos();
    };

    exibirProdutos();
});
