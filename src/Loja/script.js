let produtos

window.onload = function () {
    var storedUser = localStorage.getItem("usuario")
    
    if (!storedUser) {
        console.error("Usuário não encontrado no localStorage")
        return
    }
    
    var user = JSON.parse(storedUser)
    
    if (!user || !user.dataEntrada) {
        console.error("Dados do usuário incompletos")
        return
    }
    
    var dataEntrada = new Date(user.dataEntrada)
    
    if (isNaN(dataEntrada.getTime())) {
        console.error("Formato de data inválido:", user.dataEntrada)
        return
    }

    var dataFormatada = dataEntrada.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric"
    })

    document.getElementById('user').textContent = user.name || "Usuário desconhecido"
    document.getElementById('perfil').textContent = dataFormatada
    document.getElementById('idPerfil').textContent = user.id || "ID não disponível"
}

document.addEventListener("DOMContentLoaded", function () {
    fetch("../Dados/data.json")
        .then((response) => response.json())
        .then((data) => {
            produtos = data

            const produtosContainer = document.getElementById("produtos-container")

            produtos.forEach((produto, index) => {
                const card = document.createElement("div")
                card.innerHTML = `
                    <div class="card" style="width: 18rem;">
                        <img src="${produto.imagem}" class="card-img-top" alt="${produto.desc}">
                        <div class="card-body">
                            <h5 class="card-title">${produto.desc}</h5>
                            <p class="card-text">Custo: $${produto.preco}</p>
                            <a href="#" class="btn btn-primary adicionar" data-indice="${index}">
                                Encaminhar
                            </a>
                        </div>
                    </div>
                `
                produtosContainer.appendChild(card)
            })

            document.getElementById("produtos-container").addEventListener("click", function(event){
                const btn = event.target.closest(".adicionar")
                if (!btn) return

                const indexDoProduto = btn.dataset.indice 
                const produtoSelecionado = produtos[indexDoProduto]
                let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []
                carrinho.push(produtoSelecionado)
                localStorage.setItem("carrinho", JSON.stringify(carrinho))
                alert("Produto adicionado com sucesso!")
            })
        }).catch((error) => console.log("Erro ao carregar dados", error))

})

