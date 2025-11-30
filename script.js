// Mobile menu 
const menuBtn = document.getElementById('menu-btn');
const navbar = document.getElementById('navbar');

if (menuBtn && navbar) {
  menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('show');
  });
}

// Cart panel elements
const cartIcon = document.querySelector('.cart-icon');
const cartPanel = document.getElementById('cart-panel');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

// Cart data (front-end only)
let cartItems = [];

// Update cart UI
function updateCartUI() {
  if (!cartItemsContainer || !cartTotalElement) return;

  cartItemsContainer.innerHTML = '';

  let total = 0;

  cartItems.forEach((item, index) => {
    total += item.price;

    const div = document.createElement('div');
    div.classList.add('cart-item');

    div.innerHTML = `
      <span class="item-name">${item.name}</span>
      <span class="item-price">RS- ${item.price.toFixed(2)}</span>
      <button class="remove-item" data-index="${index}">✕</button>
    `;

    cartItemsContainer.appendChild(div);
  });

  cartTotalElement.textContent = `RS- ${total.toFixed(2)}`;

  // remove buttons 
  const removeButtons = cartItemsContainer.querySelectorAll('.remove-item');
  removeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.getAttribute('data-index'), 10);
      if (!isNaN(index)) {
        cartItems.splice(index, 1);  
        updateCartUI();             
      }
    });
  });
}

// Open cart
if (cartIcon && cartPanel) {
  cartIcon.addEventListener('click', () => {
    cartPanel.classList.add('show');
  });
}

// Close cart
if (closeCartBtn && cartPanel) {
  closeCartBtn.addEventListener('click', () => {
    cartPanel.classList.remove('show');
  });
}

// Add to Cart buttons
const cartButtons = document.querySelectorAll('.add-cart');

cartButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.menu-card');
    if (!card) return;

    const itemName = card.querySelector('h3')?.textContent || 'Coffee';
    const priceText = card.querySelector('.price')?.textContent || '0';
    const priceNumber = parseFloat(priceText.replace(/\D/g, '')) || 0;

    cartItems.push({
      name: itemName,
      price: priceNumber,
    });

    updateCartUI();
    if (cartPanel) {
      cartPanel.classList.add('show');
    }
  });
});
