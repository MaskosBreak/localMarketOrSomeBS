$(document).ready(function(){

    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || []
    const listaElement = $("#lista")
    const totalElement = $("#total")

function exibirCarrinho(){
    listaElement.empty()
    let totalPreco = 0

    $.each(carrinho, function(index, item){
        const preco = item.preco ? parseFloat(item.preco).toFixed(2) : "0.00"
        const listItem = $("<li>").text(`${item.desc} - Preço: $${preco}`)

        const removeButton = $("<button>").text("❌").css("margin-left", "10px").click(function(){

            removerItem(index)
        })

        listItem.append(removeButton)
        listaElement.append(listItem)

        totalPreco += parseFloat(item.preco) || 0
    })
    totalElement.text(`Total: $${totalPreco.toFixed(2)}`)
    }
    function removerItem(index){
        carrinho.splice(index, 1)
        localStorage.setItem("carrinho", JSON.stringify(carrinho))
        exibirCarrinho()
    }
    exibirCarrinho()
})
function gerar(){
    const listaElement = document.getElementById("lista")
    const totalElement = document.getElementById("total")
    const listaClone = listaElement.cloneNode(true)
    $(listaClone).find("button").remove()
    const listaHtml = listaClone.innerHTML
    const totalHtml = totalElement.innerHTML
    const conteudoHTML = `
    <html>
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
            <h1>Pedido Confirmado</h1>
            <h3>Agradecemos sua compra e sua preferência.</h3>
            <br>
            ${listaHtml}
            <br>
            <br>
            ${totalHtml}
        </body>
    </html>

    `
    const blob = new Blob([conteudoHTML], {type: "application/msword"} )
    const link = document.createElement("a")
    link.style.display = "none"

    link.href = URL.createObjectURL(blob)
    link.download = "pedido.doc"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    document.getElementById("pedido").style.display = "block"
}

function sucessClose(){
    document.getElementById("pedido").style.display = "none"
}