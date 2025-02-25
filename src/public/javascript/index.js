const socket = io();

const price = document.getElementById("price")
const description = document.getElementById("description")
const stock = document.getElementById("stock")
const title = document.getElementById("title");
const category = document.getElementById("category");
const output = document.getElementById("output");
const code = document.getElementById("code");
const actions = document.getElementById("actions");
const btn = document.getElementById("send");

btn.addEventListener('click', () => {

    console.log(
        "enviando productos"
    )

    socket.emit('product:add', {
        price: price.value,
        description: description.value,
        stock: stock.value,
        title: title.value,
        category: category.value,
        code: code.value,
    })

    price.value = ''
    description.value = ''
    stock.value = ''
    title.value = ''
    category.value = ''
    code.value = ''
});

socket.on('productsRender', (data) => {
    actions.innerHTML = '';
    const products = data.map((prod) => {
        return `<p><strong>${prod.title}</strong> ${prod.description}</p> 
        <button onclick="deleteProduct('${prod.id}')">Delete</button>`; 
    }).join(' ')
    output.innerHTML = products;
})

function deleteProduct(productId) {
    socket.emit('product:delete', productId);
}