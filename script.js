// 購物車資料
let cart = [];

// 商品詳情相關變數
let currentProduct = null;
let productModal = null;

// 當網頁載入完成時執行
document.addEventListener('DOMContentLoaded', () => {
    initializeCategories();
    displayFilteredProducts(products);
    loadCart();

    // 添加即時搜尋功能
    document.getElementById('searchInput').addEventListener('input', applyFilters);
    document.getElementById('categoryFilter').addEventListener('change', applyFilters);

    // 初始化 Modal
    productModal = new bootstrap.Modal(document.getElementById('productModal'));
});

// 顯示商品列表
function displayProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = products.map(product => `
        <div class="col-md-3 col-sm-6">
            <div class="card">
                <div class="position-relative">
                    <img src="${product.image}" class="card-img-top product-img" alt="${product.name}"
                         onclick="showProductDetails(${product.id})" style="cursor: pointer;">
                    <span class="filter-badge position-absolute top-0 end-0 m-2">
                        ${product.category}
                    </span>
                </div>
                <div class="card-body">
                    <h5 class="card-title" style="cursor: pointer;" onclick="showProductDetails(${product.id})">
                        ${product.name}
                    </h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">
                        <strong>價格: $${product.price}</strong>
                        <br>
                        <small class="text-muted">庫存: ${product.stock}</small>
                    </p>
                    <button class="btn btn-primary w-100" onclick="addToCart(${product.id})" 
                            ${product.stock === 0 ? 'disabled' : ''}>
                        ${product.stock === 0 ? '已售完' : '加入購物車'}
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
    const cartBadgeCount = document.getElementById('cartBadgeCount');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const cartSubtotal = document.getElementById('cartSubtotal');

    if (cart.length === 0) {
        cartItems.innerHTML = '';
        emptyCartMessage.style.display = 'block';
    } else {
        emptyCartMessage.style.display = 'none';
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price}</div>
                    <div class="cart-quantity-controls">
                        <button onclick="updateQuantity(${item.id}, -1)" 
                                ${item.quantity <= 1 ? 'disabled' : ''}>
                            <i class="fas fa-minus"></i>
                        </button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)"
                                ${item.quantity >= products.find(p => p.id === item.id).stock ? 'disabled' : ''}>
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = total;
    cartSubtotal.textContent = total;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartBadgeCount.textContent = totalItems;
}

// 從購物車移除商品
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCart();
}

// 清空購物車
function clearCart() {
    if (confirm('確定要清空購物車嗎？')) {
        cart = [];
        updateCart();
        saveCart();
    }
}

// 結帳功能
function checkout() {
    if (cart.length === 0) {
        alert('購物車是空的！');
        return;
    }
    
    // 確認庫存
    const stockCheck = cart.every(item => {
        const product = products.find(p => p.id === item.id);
        return product && product.stock >= item.quantity;
    });

    if (!stockCheck) {
        alert('抱歉，某些商品庫存不足，請調整購買數量。');
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
    alert('訂單已成立！感謝您的購買。');
    cart = [];
    updateCart();
    saveCart();
    displayProducts(); // 重新顯示商品列表以更新庫存狀態
}

// 初始化分類選項
function initializeCategories() {
    const categories = [...new Set(products.map(p => p.category))];
    const categorySelect = document.getElementById('categoryFilter');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// 搜尋和篩選商品
function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const category = document.getElementById('categoryFilter').value;

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesMinPrice = !minPrice || product.price >= parseInt(minPrice);
        const matchesMaxPrice = !maxPrice || product.price <= parseInt(maxPrice);
        const matchesCategory = !category || product.category === category;

        return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesCategory;
    });

    displayFilteredProducts(filteredProducts);
}

// 重置所有篩選條件
function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    document.getElementById('categoryFilter').value = '';
    displayFilteredProducts(products);
}

// 顯示篩選後的商品
function displayFilteredProducts(filteredProducts) {
    const productsContainer = document.getElementById('products');
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = '<div class="col-12 text-center"><h3>沒有找到符合條件的商品</h3></div>';
        return;
    }

    productsContainer.innerHTML = filteredProducts.map(product => `
        <div class="col-md-3 col-sm-6">
            <div class="card">
                <img src="${product.image}" class="card-img-top product-img" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">價格: $${product.price}</p>
                    <p class="card-text">庫存: ${product.stock}</p>
                    <p class="card-text"><small class="text-muted">分類: ${product.category}</small></p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})" 
                            ${product.stock === 0 ? 'disabled' : ''}>
                        加入購物車
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// 顯示商品詳情
function showProductDetails(productId) {
    currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) return;

    // 更新 Modal 內容
    document.getElementById('modalProductName').textContent = currentProduct.name;
    document.getElementById('modalCategory').textContent = currentProduct.category;
    document.getElementById('modalStock').textContent = 
        currentProduct.stock > 0 ? `庫存: ${currentProduct.stock}` : '已售完';
    document.getElementById('modalPrice').textContent = currentProduct.price;
    document.getElementById('modalDescription').textContent = currentProduct.description;
    
    // 設置主圖片
    const mainImage = document.getElementById('modalMainImage');
    mainImage.src = currentProduct.images[0];
    mainImage.alt = currentProduct.name;

    // 生成縮圖
    const thumbnails = document.querySelector('.product-thumbnails');
    thumbnails.innerHTML = currentProduct.images.map((img, index) => `
        <img src="${img}" alt="${currentProduct.name}" 
             onclick="changeMainImage(${index})"
             class="${index === 0 ? 'active' : ''}">
    `).join('');

    // 更新特色列表
    document.getElementById('modalFeatures').innerHTML = 
        currentProduct.features.map(feature => `<li>${feature}</li>`).join('');

    // 設置加入購物車按鈕
    const addToCartBtn = document.getElementById('modalAddToCart');
    addToCartBtn.disabled = currentProduct.stock === 0;
    addToCartBtn.onclick = () => {
        const quantity = parseInt(document.getElementById('modalQuantity').value);
        addToCartWithQuantity(currentProduct.id, quantity);
        productModal.hide();
    };

    // 重置數量
    document.getElementById('modalQuantity').value = 1;

    // 顯示 Modal
    productModal.show();
}

// 切換主圖片
function changeMainImage(index) {
    if (!currentProduct || !currentProduct.images[index]) return;
    
    const mainImage = document.getElementById('modalMainImage');
    mainImage.src = currentProduct.images[index];
    
    // 更新縮圖選中狀態
    document.querySelectorAll('.product-thumbnails img').forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
}

// 更新 Modal 中的商品數量
function updateModalQuantity(change) {
    const quantityInput = document.getElementById('modalQuantity');
    const currentValue = parseInt(quantityInput.value);
    const newValue = currentValue + change;
    
    if (newValue > 0 && newValue <= currentProduct.stock) {
        quantityInput.value = newValue;
    }
}

// 帶數量的加入購物車函數
function addToCartWithQuantity(productId, quantity) {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock === 0) return;

    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        if (cartItem.quantity + quantity <= product.stock) {
            cartItem.quantity += quantity;
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
            quantity: quantity
        });
    }

    // 添加動畫效果
    const cartButton = document.querySelector('.btn-outline-light');
    cartButton.classList.add('add-to-cart-animation');
    setTimeout(() => cartButton.classList.remove('add-to-cart-animation'), 500);

    updateCart();
    saveCart();
}