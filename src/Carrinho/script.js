$(document).ready(function(){

    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || []
    const listaElement = $("#lista")
    const totalElement = $("#total")

function exibirCarrinho(){
    listaElement.empty()
    let totalPreco = 0

    $.each(carrinho, function(index, item){
        const listItem = $("<li>").text(`${item.desc} - Preço: $${item.preco.toFixed(2)}`)

        const removeButton = $("<button>").text("❌").css("margin-left", "10px").click(function(){

            removerItem(index)
        })

        listItem.append(removeButton)
        listaElement.append(listItem)

        totalPreco += item.preco
    })
    totalElement.text(`Total: $${totalPreco.toFixed(2)}`)
    }
    function removerIem(index){
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
    const listaHTML = listaClone.innerHTML
    const totalHTML = totalElement.innerHTML
    const conteudoHTML = `
    <html>
        <head>
            <meta charset="UTF-8">
    `
}