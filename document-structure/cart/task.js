const cartProductsContainer = document.querySelector('.cart__products');
const cartTitle = document.querySelector('.cart__title');
const products = document.querySelectorAll('.product');

let cart = {};

function updateCartVisibility() {
  const hasProducts = Object.keys(cart).length > 0;
  cartTitle.style.display = hasProducts ? 'block' : 'none';
  cartProductsContainer.style.display = hasProducts ? 'flex' : 'none';
  
  if (!hasProducts) {
    cartProductsContainer.innerHTML = '';
  }
}

function renderCart() {
  cartProductsContainer.innerHTML = '';
  
  Object.entries(cart).forEach(([id, product]) => {
    const cartProduct = document.createElement('div');
    cartProduct.classList.add('cart__product');
    cartProduct.setAttribute('data-id', id);
    
    const image = document.createElement('img');
    image.classList.add('cart__product-image');
    image.src = product.src;
    
    const count = document.createElement('div');
    count.classList.add('cart__product-count');
    count.textContent = product.count;

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('cart__product-remove');
    removeBtn.textContent = 'Удалить';
    removeBtn.style.cssText = 'position: absolute; bottom: 0; right: 0; background: red; color: white; border: none; padding: 5px; cursor: pointer;';
    removeBtn.addEventListener('click', () => {
      delete cart[id];
      saveCart();
      renderCart();
      updateCartVisibility();
    });
    
    cartProduct.appendChild(image);
    cartProduct.appendChild(count);
    cartProduct.appendChild(removeBtn);
    
    cartProductsContainer.appendChild(cartProduct);
  });
  
  updateCartVisibility();
}

function animateProductToCart(productImage, cartImage) {
  const clone = productImage.cloneNode(true);
  clone.classList.add('product-shadow');
  document.body.appendChild(clone);
  
  const startRect = productImage.getBoundingClientRect();
  const endRect = cartImage ? cartImage.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2 };
  
  const dx = endRect.left - startRect.left;
  const dy = endRect.top - startRect.top;
  
  const steps = 20;
  const stepX = dx / steps;
  const stepY = dy / steps;
  
  clone.style.position = 'fixed';
  clone.style.left = startRect.left + 'px';
  clone.style.top = startRect.top + 'px';
  clone.style.zIndex = '1000';
  clone.style.width = startRect.width + 'px';
  clone.style.height = startRect.height + 'px';
  clone.style.transition = 'none';
  
  let currentStep = 0;
  
  const interval = setInterval(() => {
    currentStep++;
    clone.style.left = (startRect.left + stepX * currentStep) + 'px';
    clone.style.top = (startRect.top + stepY * currentStep) + 'px';
    clone.style.opacity = (1 - currentStep / steps).toString();
    
    if (currentStep >= steps) {
      clearInterval(interval);
      clone.remove();
    }
  }, 30);
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
  const saved = localStorage.getItem('cart');
  if (saved) {
    cart = JSON.parse(saved);
    renderCart();
  }
}

products.forEach(product => {
  const valueEl = product.querySelector('.product__quantity-value');
  const decBtn = product.querySelector('.product__quantity-control_dec');
  const incBtn = product.querySelector('.product__quantity-control_inc');
  const addBtn = product.querySelector('.product__add');
  const productImage = product.querySelector('.product__image');
  const id = product.dataset.id;
  
  decBtn.addEventListener('click', () => {
    let value = parseInt(valueEl.textContent);
    if (value > 1) {
      value--;
      valueEl.textContent = value;
    }
  });
  
  incBtn.addEventListener('click', () => {
    let value = parseInt(valueEl.textContent);
    value++;
    valueEl.textContent = value;
  });
  
  addBtn.addEventListener('click', () => {
    const quantity = parseInt(valueEl.textContent);
    const imageSrc = productImage.src;
    
    if (!cart[id]) {
      cart[id] = { src: imageSrc, count: 0 };
    }
    
    cart[id].count += quantity;
    
    const firstCartImage = cartProductsContainer.querySelector('.cart__product-image');
    animateProductToCart(productImage, firstCartImage);
    
    renderCart();
    saveCart();
  });
});

document.addEventListener('DOMContentLoaded', loadCart);