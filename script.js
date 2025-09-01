//daftar produk dengan gambar
const products = [
  { id: 1, name: 'GARRY', price: 5000, img: 'img/p1.jpeg'},
  { id: 2, name: 'SARI GANDUM', price: 4000, img: 'img/p2.jpeg'},
  { id: 3, name: 'ROSTA', price: 10000, img: 'img/p3.jpeg' },
  { id: 4, name: 'NEXTAR', price: 3000, img: 'img/p4.jpeg'},
  { id: 5, name: 'DILAN', price: 11000, img: 'img/p5.jpeg' },
];

//keranjang belanja
let cart = [];

//fungsi untuk menampilkan daftar produk
function displayProducts() {
  const produkContainer = document.getElementById('products');
  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Rp${product.price}</p>
            <button onclick="addToCart(${product.id})">Tambah ke keranjang</button>
        `;
    produkContainer.appendChild(productDiv);
  });
}

//fungsi untuk menambah produk ke keranjang belanja
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const cartItem = cart.find(item => item.id === productId);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}

// fungsi untuk menampilkan isi keranjang belanja
function updateCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';

  let totalPrice = 0;
  cart.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} x ${item.quantity} - Rp ${item.price * item.quantity}`;
    cartItemsContainer.appendChild(listItem);

    totalPrice += item.price * item.quantity;
  });

  document.getElementById('total-price').textContent = totalPrice;
}

//fungsi untuk mewlakukan checkout
function checkout() {
  if (cart.length === 0) {
    alert('keranjang anda kosong.');
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const payment = prompt(`total belanja anda Rp ${total}. masukkan jumlah pembayaran:`);

  if (parseFloat(payment) >= total) {
    alert(`pembayaran berhasil kembalian anda: Rp ${payment - total}`);
    cart = [];
    updateCart();
  } else {
    alert('uang anda tidak mencukupi.');
  }
}

//event listener untuk tombol check out
document.getElementById('checkout-btn').addEventListener('click', checkout);

//tampilkan produk saat halaman di muat
displayProducts();


