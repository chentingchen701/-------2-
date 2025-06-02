// 購物車資料
let cart = [];

// 商品詳情相關變數
let currentProduct = null;
let productModal = null;

// 變數宣告
let checkoutModal = null;
let orderCompleteModal = null;

// 個人化功能相關變數
let wishlist = [];
let viewHistory = [];
let historyModal = null;

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

    // 初始化結帳相關 Modal
    checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    orderCompleteModal = new bootstrap.Modal(document.getElementById('orderCompleteModal'));

    // 初始化個人化功能
    loadWishlist();
    loadHistory();
    historyModal = new bootstrap.Modal(document.getElementById('historyModal'));
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

// 更新結帳功能
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

    // 更新結帳明細
    updateCheckoutSummary();
    
    // 顯示結帳 Modal
    checkoutModal.show();
}

// 更新結帳明細
function updateCheckoutSummary() {
    const checkoutItems = document.getElementById('checkoutItems');
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = calculateShipping(subtotal);
    const total = subtotal + shipping;

    // 顯示訂單明細
    checkoutItems.innerHTML = cart.map(item => `
        <div class="d-flex justify-content-between align-items-center mb-2">
            <div>
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;" class="me-2">
                ${item.name} x ${item.quantity}
            </div>
            <div>$${item.price * item.quantity}</div>
        </div>
    `).join('');

    // 更新金額
    document.getElementById('checkoutSubtotal').textContent = subtotal;
    document.getElementById('checkoutShipping').textContent = shipping;
    document.getElementById('checkoutTotal').textContent = total;
}

// 計算運費
function calculateShipping(subtotal) {
    return subtotal >= 1000 ? 0 : 60;
}

// 確認訂單
function confirmOrder() {
    const form = document.getElementById('checkoutForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // 更新庫存
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            product.stock -= item.quantity;
        }
    });

    // 準備訂單摘要
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = calculateShipping(subtotal);
    const total = subtotal + shipping;
    const orderNumber = generateOrderNumber();

    // 更新訂單完成資訊
    document.getElementById('orderSummary').innerHTML = `
        <div class="mt-4">
            <p class="mb-2">訂單編號：${orderNumber}</p>
            <p class="mb-2">訂購金額：$${subtotal}</p>
            <p class="mb-2">運費：$${shipping}</p>
            <p class="mb-2"><strong>總計：$${total}</strong></p>
        </div>
    `;

    // 清空購物車
    cart = [];
    updateCart();
    saveCart();
    displayProducts();

    // 關閉結帳 Modal，顯示完成 Modal
    checkoutModal.hide();
    orderCompleteModal.show();
}

// 生成訂單編號
function generateOrderNumber() {
    const date = new Date();
    const timestamp = date.getTime().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return 'ORD' + timestamp + random;
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
    showLoading();
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

    // 使用 setTimeout 來模擬搜尋過程，提供更好的使用者體驗
    setTimeout(() => {
        displayFilteredProducts(filteredProducts);
    }, 300);
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
    showLoading();
    const productsContainer = document.getElementById('products');
    
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = '<div class="col-12 text-center"><h3>沒有找到符合條件的商品</h3></div>';
        hideLoading();
        return;
    }

    productsContainer.innerHTML = filteredProducts.map(product => `
        <div class="col-md-3 col-sm-6">
            <div class="card">
                <div class="position-relative">
                    <img src="${product.image}" 
                         class="card-img-top product-img" 
                         alt="${product.name}"
                         onload="handleImageLoad(this)"
                         onclick="showProductDetails(${product.id})" 
                         style="cursor: pointer;">
                    <span class="filter-badge position-absolute top-0 end-0 m-2">
                        ${product.category}
                    </span>
                    <button class="btn btn-sm position-absolute top-0 start-0 m-2 ${wishlist.includes(product.id) ? 'btn-danger' : 'btn-outline-danger'}"
                            onclick="toggleWishlist(${product.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <div class="card-body">
                    <h5 class="card-title" style="cursor: pointer;" 
                        onclick="showProductDetails(${product.id})">
                        ${product.name}
                    </h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">
                        <strong>價格: $${product.price}</strong>
                        <br>
                        <small class="text-muted">庫存: ${product.stock}</small>
                    </p>
                    <button class="btn btn-primary w-100" 
                            onclick="addToCart(${product.id})" 
                            ${product.stock === 0 ? 'disabled' : ''}>
                        ${product.stock === 0 ? '已售完' : '加入購物車'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // 確保所有圖片都載入完成後再隱藏載入動畫
    const images = productsContainer.getElementsByTagName('img');
    let loadedImages = 0;
    
    function checkAllImagesLoaded() {
        loadedImages++;
        if (loadedImages === images.length) {
            hideLoading();
        }
    }

    if (images.length === 0) {
        hideLoading();
    } else {
        Array.from(images).forEach(img => {
            if (img.complete) {
                checkAllImagesLoaded();
            } else {
                img.addEventListener('load', checkAllImagesLoaded);
                img.addEventListener('error', checkAllImagesLoaded);
            }
        });
    }
}

// 優化商品詳情載入
function showProductDetails(productId) {
    showLoading();
    currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) {
        hideLoading();
        return;
    }

    // 添加到瀏覽歷史
    addToHistory(productId);

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

    // 處理圖片載入
    const mainImage = document.getElementById('modalMainImage');
    let loadedImages = 0;
    const totalImages = currentProduct.images.length + 1; // 主圖 + 縮圖

    function checkModalImagesLoaded() {
        loadedImages++;
        if (loadedImages === totalImages) {
            hideLoading();
            productModal.show();
        }
    }

    mainImage.onload = checkModalImagesLoaded;
    currentProduct.images.forEach(img => {
        const tempImage = new Image();
        tempImage.onload = checkModalImagesLoaded;
        tempImage.src = img;
    });
}

// 通知提示功能
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 2000);
    }, 100);
}

// 優化圖片載入
function handleImageLoad(img) {
    img.classList.add('loaded');
}

// 願望清單功能
function loadWishlist() {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
        wishlist = JSON.parse(savedWishlist);
        updateWishlistUI();
    }
}

function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
}

function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index === -1) {
        wishlist.push(productId);
        showToast('已加入願望清單！');
    } else {
        wishlist.splice(index, 1);
        showToast('已從願望清單移除！');
    }
    saveWishlist();
}

function updateWishlistUI() {
    const wishlistItems = document.getElementById('wishlistItems');
    const wishlistCount = document.getElementById('wishlistCount');
    const wishlistBadgeCount = document.getElementById('wishlistBadgeCount');
    const emptyWishlistMessage = document.getElementById('emptyWishlistMessage');

    wishlistCount.textContent = wishlist.length;
    wishlistBadgeCount.textContent = wishlist.length;

    if (wishlist.length === 0) {
        wishlistItems.innerHTML = '';
        emptyWishlistMessage.style.display = 'block';
        return;
    }

    emptyWishlistMessage.style.display = 'none';
    wishlistItems.innerHTML = wishlist.map(id => {
        const product = products.find(p => p.id === id);
        if (!product) return '';
        return `
            <div class="wishlist-item mb-3">
                <div class="card">
                    <div class="row g-0">
                        <div class="col-4">
                            <img src="${product.image}" class="img-fluid rounded-start" alt="${product.name}">
                        </div>
                        <div class="col-8">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">$${product.price}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <button class="btn btn-sm btn-danger" onclick="toggleWishlist(${product.id})">
                                        <i class="fas fa-heart-broken"></i> 移除
                                    </button>
                                    <button class="btn btn-sm btn-primary" onclick="addToCart(${product.id})">
                                        <i class="fas fa-cart-plus"></i> 加入購物車
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// 瀏覽歷史功能
function loadHistory() {
    const savedHistory = localStorage.getItem('viewHistory');
    if (savedHistory) {
        viewHistory = JSON.parse(savedHistory);
    }
}

function saveHistory() {
    localStorage.setItem('viewHistory', JSON.stringify(viewHistory));
}

function addToHistory(productId) {
    // 移除重複的記錄
    viewHistory = viewHistory.filter(id => id !== productId);
    // 添加到開頭
    viewHistory.unshift(productId);
    // 限制記錄數量為20筆
    if (viewHistory.length > 20) {
        viewHistory.pop();
    }
    saveHistory();
}

function showHistory() {
    const historyItems = document.getElementById('historyItems');
    const emptyHistoryMessage = document.getElementById('emptyHistoryMessage');

    if (viewHistory.length === 0) {
        historyItems.innerHTML = '';
        emptyHistoryMessage.style.display = 'block';
    } else {
        emptyHistoryMessage.style.display = 'none';
        historyItems.innerHTML = viewHistory.map(id => {
            const product = products.find(p => p.id === id);
            if (!product) return '';
            return `
                <div class="col-md-6 col-lg-4 mb-3">
                    <div class="card h-100">
                        <img src="${product.image}" class="card-img-top history-img" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">$${product.price}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <button class="btn btn-sm ${wishlist.includes(product.id) ? 'btn-danger' : 'btn-outline-danger'}"
                                        onclick="toggleWishlist(${product.id})">
                                    <i class="fas fa-heart"></i>
                                </button>
                                <button class="btn btn-sm btn-primary" onclick="addToCart(${product.id})">
                                    <i class="fas fa-cart-plus"></i> 加入購物車
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    historyModal.show();
}

function clearHistory() {
    if (confirm('確定要清除所有瀏覽記錄嗎？')) {
        viewHistory = [];
        saveHistory();
        showHistory();
    }
}

// 顯示載入動畫
function showLoading() {
    document.querySelector('.loading-overlay').style.display = 'block';
    document.querySelector('.loading-spinner').style.display = 'block';
}

// 隱藏載入動畫
function hideLoading() {
    document.querySelector('.loading-overlay').style.display = 'none';
    document.querySelector('.loading-spinner').style.display = 'none';
}