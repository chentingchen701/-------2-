// 購物車資料
let cart = [];

// 當網頁載入完成時執行
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    loadCart();
});

// 顯示商品列表
function displayProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = products.map(product => `
        <div class="col-md-3 col-sm-6">
            <div class="card">
                <img src="${product.image}" class="card-img-top product-img" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">價格: $${product.price}</p>
                    <p class="card-text">庫存: ${product.stock}</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})" 
                            ${product.stock === 0 ? 'disabled' : ''}>
                        加入購物車
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// 加入購物車
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock === 0) return;

    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        if (cartItem.quantity < product.stock) {
            cartItem.quantity++;
        } else {
            alert('已達到最大庫存量！');
            return;
        }
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    updateCart();
    saveCart();
}

// 更新購物車顯示
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="d-flex align-items-center">
                <img src="${item.image}" alt="${item.name}">
                <div class="ms-3">
                    <h6>${item.name}</h6>
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <p>$${item.price * item.quantity}</p>
                </div>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = total;
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// 更新商品數量
function updateQuantity(productId, change) {
    const cartItem = cart.find(item => item.id === productId);
    const product = products.find(p => p.id === productId);

    if (!cartItem || !product) return;

    const newQuantity = cartItem.quantity + change;
    if (newQuantity > 0 && newQuantity <= product.stock) {
        cartItem.quantity = newQuantity;
    } else if (newQuantity === 0) {
        cart = cart.filter(item => item.id !== productId);
    }

    updateCart();
    saveCart();
}

// 儲存購物車資料到 localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// 從 localStorage 載入購物車資料
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// 結帳功能
function checkout() {
    if (cart.length === 0) {
        alert('購物車是空的！');
        return;
    }

    // 更新庫存
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            product.stock -= item.quantity;
        }
    });

    // 清空購物車
    cart = [];
    saveCart();
    updateCart();
    displayProducts();
    
    alert('感謝您的購買！');
}