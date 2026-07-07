// 📦 Banco de Dados de Produtos Oficial da sua Loja 
const PRODUCTS_DATA = [
    { id: 1, title: "Kasane Teto - Cosplay Completo", category: "Anime / Vocaloid", price: 560.90, image: "Tetoo.jpeg" },
    { id: 2, title: "Hatsune Miku - Cosplay Completo", category: "Anime / Vocaloid", price: 479.99, image: "Hatsune-Miku.jpeg" },
    { id: 3, title: "Akita Neru - Cosplay Completo", category: "Anime / Vocaloid", price: 545.79, image: "Akita-Neru.jpeg" },
    { id: 4, title: "Peruca Satoru Gojo Branca", category: "Acessórios / Wigs", price: 89.90, image: "GojoWig.jpeg" },
    { id: 5, title: "Kamado Tanjirou - Cosplay Completo", category: "Anime", price: 789.90, image: "TanjiroU.jpeg" },
    { id: 6, title: "Marin Kitagawa - Cosplay Completo", category: "Anime", price: 356.80, image: "MarinKitagawa.jpeg" },
    { id: 7, title: "Kanao Tsuyuri - Cosplay Completo", category: "Anime", price: 347.67, image: "Kanao.jpg" },
    { id: 8, title: "Ayanokoji Kiyotaka - Cosplay Completo", category: "Anime", price: 568.90, image: "Ayanokoji.jpeg" },
    { id: 9, title: "Hitori Gotoh - Cosplay Completo", category: "Anime", price: 245.70, image: "Bocchi.jpg" },
    { id: 10, title: "Kagamine Rin - Cosplay Completo", category: "Anime / Vocaloid", price: 168.89, image: "kagaminerin.jpeg" },
    { id: 11, title: "Kaito - Cosplay Completo", category: "Anime / Vocaloid", price: 280.00, image: "Kaitp.jpeg" },
    { id: 12, title: "Kaneki's Mask - Cosplay", category: "Anime / Accessories", price: 95.60, image: "Kaneki Mask.jpeg" },
    { id: 13, title: "Peruca Izumi Miyamura Preta", category: "Anime / Wigs", price: 99.90, image: "Miyamura.jpeg" },
    { id: 14, title: "Ryomen Sukuna - Cosplay Completo", category: "Anime", price: 685.68, image: "Sukuna.jpg" },
    { id: 15, title: "Makima - Cosplay Completo", category: "Anime", price: 570.99, image: "Makima.webp" },
    { id: 16, title: "Izuku Midoriya - Cosplay Completo", category: "Anime", price: 322.22, image: "Deku.webp" },
    { id: 17, title: "Killua Zoldyck - Cosplay Completo", category: "Anime", price: 145.90, image: "Killua.webp" },
    { id: 18, title: "Astolfo - Cosplay Completo", category: "Anime", price: 579.90, image: "Astolfo.webp" },
    { id: 19, title: "Kaoruko Waguri - Cosplay Completo", category: "Anime", price: 852.97, image: "Waguri.webp" },
    { id: 20, title: "Pomni - Cosplay Completo", category: "Glitch", price: 390.01, image: "Pomni.webp" },
    { id: 21, title: "Mangá Kaoru Hana Wa rin to saku - Volume 1", category: "Mangá", price: 59.80, image: "Kaoru.webp" },
    { id: 22, title: "Mangá Demon Slayer - Volume 1", category: "Mangá", price: 39.99, image: "Demon slayer.jpg" },
    { id: 23, title: "Mangá Jujutso Kaisen 0 - Edição Especial", category: "Mangá", price: 199.90, image: "0.jpeg" },
    { id: 24, title: "Mangá One Piece - Volume 2", category: "Mangá", price: 45.70, image: "One Piece Vol -2.jpg" },
    { id: 25, title: "Jax Floppy Hat", category: "Glitch", price: 55.00, image: "JaxFloppyHat4.webp" },
    { id: 26, title: "Bubble Hoodie", category: "Glitch", price: 145.00, image: "Bubble.webp" },
    { id: 27, title: "Jax Hooded Jacket", category: "Glitch", price: 150.00, image: "JaxBlusaa.webp" },
    { id: 28, title: "Maid Jax Plushie", category: "Glitch", price: 150.00, image: "maid-jax-plush-2.webp" }

];

const state = {
    products: PRODUCTS_DATA,
    filteredProducts: [...PRODUCTS_DATA],
    cart: new Map(JSON.parse(localStorage.getItem('cc_cart')) || []),
    currentUser: JSON.parse(localStorage.getItem('cc_user')) || null,
    searchQuery: '',
    sortBy: 'all',
    currentId: null
};

const qs = (el) => document.querySelector(el);
const formatPrice = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

/* 🎨 RE-RENDERIZAR VITRINE COMPATÍVEL COM GRID */
function renderProducts() {
    const grid = qs('#productsGrid');
    if (!grid) return;

    state.filteredProducts = state.products.filter(p => 
        p.title.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(state.searchQuery.toLowerCase())
    );

    if (state.sortBy === 'price-asc') state.filteredProducts.sort((a,b) => a.price - b.price);
    if (state.sortBy === 'price-desc') state.filteredProducts.sort((a,b) => b.price - a.price);

    if(state.filteredProducts.length === 0) {
        grid.innerHTML = `<p class="no-results">Nenhum cosplay encontrado.</p>`;
        return;
    }

    grid.innerHTML = state.filteredProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-img-wrapper">
                <img src="${product.image}" alt="${product.title}" loading="lazy" onerror="this.src='https://placehold.co/300x300?text=Cosplay'">
            </div>
            <div class="product-info">
                <div>
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.title}</h3>
                </div>
                <div class="product-meta">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    <button class="add-cart-btn" data-id="${product.id}">+ Carrinho</button>
                </div>
            </div>
        </div>
    `).join('');
}

/* 🛒 RENDEREZAR ITENS DO CARRINHO */
function renderCart() {
    const container = qs('#cartItemsContainer');
    const totalValueEl = qs('#cartTotalValue');
    if (!container || !totalValueEl) return;
    
    if (state.cart.size === 0) {
        container.innerHTML = `<p class="empty-cart-msg">Seu carrinho está vazio 😭</p>`;
        totalValueEl.textContent = formatPrice(0);
        return;
    }

    let totalGeral = 0;
    let htmlContent = [];

    state.cart.forEach((quantity, id) => {
        const item = state.products.find(p => p.id === id);
        if (item) {
            const subtotal = item.price * quantity;
            totalGeral += subtotal;
            htmlContent.push(`
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}" onerror="this.src='https://placehold.co/50x50?text=Item'">
                    <div class="cart-item-details">
                        <h4>${item.title}</h4>
                        <p>${quantity}x — ${formatPrice(item.price)}</p>
                    </div>
                    <button class="remove-cart-item-btn" data-id="${id}">&times;</button>
                </div>
            `);
        }
    });

    container.innerHTML = htmlContent.join('');
    totalValueEl.textContent = formatPrice(totalGeral);
}

function addToCart(id) {
    const qty = state.cart.get(id) || 0;
    state.cart.set(id, qty + 1);
    saveCartData();
    showToast("Adicionado ao carrinho! 🛒");
}

function removeFromCart(id) {
    state.cart.delete(id);
    saveCartData();
    renderCart();
    showToast("Item removido! 🗑️");
}

function saveCartData() {
    localStorage.setItem('cc_cart', JSON.stringify(Array.from(state.cart.entries())));
    updateCartBadge();
}

function updateCartBadge() {
    const badge = qs('#cartBadge');
    if (!badge) return;
    const total = Array.from(state.cart.values()).reduce((a,b) => a + b, 0);
    badge.textContent = total;
    badge.hidden = total === 0;
}

/* 🔐 COMPORTAMENTO DA INTERFACE DE LOGIN */
function updateAuthUI() {
    const btn = qs('#loginToggleBtn');
    if (!btn) return;

    if (state.currentUser) {
        btn.textContent = `Olá, ${state.currentUser.name.split(' ')[0]}`;
        if(qs('#loginFormSection')) qs('#loginFormSection').style.display = 'none';
        if(qs('#registerFormSection')) qs('#registerFormSection').style.display = 'none';
        if(qs('#userProfileSection')) qs('#userProfileSection').style.display = 'block';
        if(qs('#loggedUserName')) qs('#loggedUserName').textContent = state.currentUser.name;
    } else {
        btn.textContent = "Minha Conta";
        if(qs('#loginFormSection')) qs('#loginFormSection').style.display = 'block';
        if(qs('#registerFormSection')) qs('#registerFormSection').style.display = 'none';
        if(qs('#userProfileSection')) qs('#userProfileSection').style.display = 'none';
    }
}

function showToast(msg) {
    const container = qs('#toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

function openModal(modalId) { 
    const modal = qs(modalId);
    if(modal) {
        modal.classList.add('active'); 
        if(modalId === '#cartLightbox') renderCart(); 
    }
}

function closeModal(modalId) { 
    const modal = qs(modalId);
    if(modal) modal.classList.remove('active'); 
}

/* ==========================================================================
   EVENTOS PRINCIPAIS
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartBadge();
    updateAuthUI();

    let codigoGerado = null;
    let dadosTemporariosUsuario = null;

    const safeAddEvent = (id, event, callback) => {
        const el = qs(id);
        if (el) el.addEventListener(event, callback);
    };

    safeAddEvent('#searchInput', 'input', (e) => { state.searchQuery = e.target.value; renderProducts(); });
    safeAddEvent('#sortSelect', 'change', (e) => { state.sortBy = e.target.value; renderProducts(); });

    const grid = qs('#productsGrid');
    if (grid) {
        grid.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            if(!card) return;
            const id = parseInt(card.dataset.id);
            
            if(e.target.classList.contains('add-cart-btn')) { 
                e.stopPropagation(); 
                addToCart(id); 
            } else {
                const product = state.products.find(p => p.id === id);
                if(!product) return;
                state.currentId = id;
                if (qs('#lightboxImg')) qs('#lightboxImg').src = product.image;
                if (qs('#lightboxTitle')) qs('#lightboxTitle').textContent = product.title;
                if (qs('#lightboxCategory')) qs('#lightboxCategory').textContent = product.category;
                if (qs('#lightboxPrice')) qs('#lightboxPrice').textContent = formatPrice(product.price);
                openModal('#productLightbox');
            }
        });
    }

    safeAddEvent('#cartToggleBtn', 'click', () => openModal('#cartLightbox'));
    safeAddEvent('#cartCloseBtn', 'click', () => closeModal('#cartLightbox'));
    safeAddEvent('#cartBackdrop', 'click', () => closeModal('#cartLightbox'));
    
    safeAddEvent('#loginToggleBtn', 'click', () => openModal('#loginLightbox'));
    safeAddEvent('#loginCloseBtn', 'click', () => closeModal('#loginLightbox'));
    safeAddEvent('#loginBackdrop', 'click', () => closeModal('#loginLightbox'));

    safeAddEvent('#productCloseBtn', 'click', () => closeModal('#productLightbox'));
    safeAddEvent('#productBackdrop', 'click', () => closeModal('#productLightbox'));
    safeAddEvent('#lightboxAddCartBtn', 'click', () => { addToCart(state.currentId); closeModal('#productLightbox'); });

    safeAddEvent('#cartItemsContainer', 'click', (e) => {
        if (e.target.classList.contains('remove-cart-item-btn')) {
            removeFromCart(parseInt(e.target.dataset.id));
        }
    });

    safeAddEvent('#switchToRegister', 'click', (e) => { 
        e.preventDefault(); 
        if(qs('#loginFormSection')) qs('#loginFormSection').style.display = 'none'; 
        if(qs('#registerFormSection')) qs('#registerFormSection').style.display = 'block'; 
    });

    safeAddEvent('#switchToLogin', 'click', (e) => { 
        e.preventDefault(); 
        if(qs('#registerFormSection')) qs('#registerFormSection').style.display = 'none'; 
        if(qs('#loginFormSection')) qs('#loginFormSection').style.display = 'block'; 
    });

    safeAddEvent('#cancelVerification', 'click', (e) => { 
        e.preventDefault(); 
        if(qs('#verificationSection')) qs('#verificationSection').style.display = 'none'; 
        if(qs('#registerFormSection')) qs('#registerFormSection').style.display = 'block'; 
    });

    safeAddEvent('#registerForm', 'submit', (e) => {
        e.preventDefault();
        const name = qs('#regName').value;
        const email = qs('#regEmail').value;
        const password = qs('#regPassword').value;

        codigoGerado = Math.floor(10000 + Math.random() * 90000).toString();
        dadosTemporariosUsuario = { name, email, password };

        alert(`📬 [Moon Bloom]\n\nSeu código de ativação é: ${codigoGerado}`);

        if(qs('#registerFormSection')) qs('#registerFormSection').style.display = 'none';
        if(qs('#verificationSection')) qs('#verificationSection').style.display = 'block';
        showToast("Código enviado! Verifique seu e-mail.");
    });

    safeAddEvent('#verificationForm', 'submit', (e) => {
        e.preventDefault();
        const codigoDigitado = qs('#verificationCodeInput').value.trim();

        if (codigoDigitado === codigoGerado) {
            const registeredUsers = JSON.parse(localStorage.getItem('cc_all_users')) || [];
            registeredUsers.push(dadosTemporariosUsuario);
            localStorage.setItem('cc_all_users', JSON.stringify(registeredUsers));
            
            showToast("Conta ativada com sucesso! 🥳");
            qs('#registerForm').reset();
            qs('#verificationForm').reset();
            
            if(qs('#verificationSection')) qs('#verificationSection').style.display = 'none';
            if(qs('#loginFormSection')) qs('#loginFormSection').style.display = 'block';
        } else {
            showToast("Código incorreto! ❌");
        }
    });

    safeAddEvent('#loginForm', 'submit', (e) => {
        e.preventDefault();
        const email = qs('#loginEmail').value;
        const password = qs('#loginPassword').value;

        const registeredUsers = JSON.parse(localStorage.getItem('cc_all_users')) || [];
        const userFound = registeredUsers.find(u => u.email === email && u.password === password);

        if (userFound) {
            state.currentUser = userFound;
            localStorage.setItem('cc_user', JSON.stringify(userFound));
            updateAuthUI();
            showToast(`Bem-vindo de volta! 🎭`);
            closeModal('#loginLightbox');
            qs('#loginForm').reset();
        } else {
            showToast("E-mail ou senha incorretos! ❌");
        }
    });

    safeAddEvent('#logoutBtn', 'click', () => {
        state.currentUser = null;
        localStorage.removeItem('cc_user');
        updateAuthUI();
        showToast("Você saiu da conta.");
        closeModal('#loginLightbox');
    });

    safeAddEvent('#checkoutBtn', 'click', () => {
        if (!state.currentUser) {
            showToast("Você precisa fazer login para comprar! 🔐");
            openModal('#loginLightbox');
            closeModal('#cartLightbox');
        } else {
            showToast("Pedido gerado! Obrigado pela compra! 📦🚀");
            state.cart.clear();
            saveCartData();
            closeModal('#cartLightbox');
        }
    });
});
const bgMusic = qs('#bgMusic');
const bgMusicSource = qs('#bgMusicSource');
const musicToggleBtn = qs('#musicToggleBtn');

if (bgMusic && bgMusicSource && musicToggleBtn) {
  // Coloque aqui o link do arquivo de áudio (MP3/OGG) hospedado no seu site
  bgMusicSource.src = 'joaohonaiser/Prova-Eliane/(OLD VERSION) Master Of Puppets - ft. Kasane Teto【SynthV Cover】 - Tangerines VA (youtube).mp3';

  let isPlaying = false;

  const updateButton = () => {
    musicToggleBtn.textContent = isPlaying ? '⏸️ Música' : '▶️ Música';
  };

  const startMusic = async () => {
    try {
      bgMusic.volume = 0.3; // ajuste se quiser
      await bgMusic.play();
      isPlaying = true;
      updateButton();
    } catch (err) {
      // geralmente acontece se o browser bloquear autoplay (ok: usuário clica no botão)
      showToast('Clique na música para tocar.');
    }
  };

  const pauseMusic = () => {
    bgMusic.pause();
    isPlaying = false;
    updateButton();
  };

  safeAddEvent('#musicToggleBtn', 'click', async () => {
    if (!isPlaying) startMusic();
    else pauseMusic();
  });

  // opcional: sincronizar estado se terminar/der erro
  bgMusic.addEventListener('play', () => {
    isPlaying = true;
    updateButton();
  });
  bgMusic.addEventListener('pause', () => {
    isPlaying = false;
    updateButton();
  });
}
