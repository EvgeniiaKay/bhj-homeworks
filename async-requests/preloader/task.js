const loader = document.getElementById('loader');
const items = document.getElementById('items');

function renderCurrencies(currencies) {
  items.innerHTML = '';
  Object.values(currencies).forEach(currency => {
    const itemHTML = `
      <div class="item">
        <div class="item__code">${currency.CharCode}</div>
        <div class="item__value">${currency.Value}</div>
        <div class="item__currency">руб.</div>
      </div>
    `;
    items.insertAdjacentHTML('beforeend', itemHTML);
  });
}

async function loadCurrencies() {
  try {
    loader.classList.add('loader_active');
    
    const response = await fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses');
    if (!response.ok) throw new Error('Ошибка сети');
    
    const data = await response.json();
    const currencies = data.response.Valute;
    
    localStorage.setItem('currencies', JSON.stringify(currencies));
    
    renderCurrencies(currencies);
  } catch (error) {
    console.error('Ошибка загрузки:', error);
  } finally {
    loader.classList.remove('loader_active');
  }
}

function loadCachedCurrencies() {
  const cached = localStorage.getItem('currencies');
  if (cached) {
    const currencies = JSON.parse(cached);
    renderCurrencies(currencies);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadCachedCurrencies();
  loadCurrencies();
});