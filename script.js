const CARD_COUNT = 15;
const NEW_ON_REFRESH = 8;
let QA_BANK = [];
let lastIds = [];

const shuffle = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const pickInitialCards = (count) => shuffle(QA_BANK).slice(0, count);

const pickWithNewCards = () => {
  const shuffled = shuffle(QA_BANK);
  const newOnes = shuffled.filter((item) => !lastIds.includes(item.id)).slice(0, NEW_ON_REFRESH);
  const remainingNeeded = CARD_COUNT - newOnes.length;
  const remainingPool = shuffled.filter((item) => !newOnes.some((n) => n.id === item.id)).slice(0, remainingNeeded);
  const selection = [...newOnes, ...remainingPool].slice(0, CARD_COUNT);
  return selection;
};

const createCardHTML = (item) => `
  <article class="card" aria-label="${item.q}">
    <div class="card__inner">
      <div class="card__face card__face--front">
        <p class="tag">Question</p>
        <h2>${item.q}</h2>
      </div>
      <div class="card__face card__face--back">
        <p class="tag">Answer</p>
        <h3>${item.a}</h3>
      </div>
    </div>
  </article>
`;

const addCardInteractivity = (card) => {
  card.addEventListener('click', () => {
    card.classList.toggle('card--flipped');
  });

  card.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      card.classList.toggle('card--flipped');
    }
  });

  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-pressed', 'false');
  card.addEventListener('transitionend', () => {
    const flipped = card.classList.contains('card--flipped');
    card.setAttribute('aria-pressed', String(flipped));
  });
};

const renderCards = () => {
  const grid = document.getElementById('card-grid');
  const cards = lastIds.length === 0 ? pickInitialCards(CARD_COUNT) : pickWithNewCards();
  grid.innerHTML = cards.map(createCardHTML).join('');
  grid.querySelectorAll('.card').forEach(addCardInteractivity);
  lastIds = cards.map((c) => c.id);
};

document.addEventListener('DOMContentLoaded', () => {
  const refreshBtn = document.getElementById('refresh-btn');
  refreshBtn.disabled = true;

  const loadBank = async () => {
    try {
      const res = await fetch('data/questions.json');
      const data = await res.json();
      QA_BANK = data;
      refreshBtn.disabled = false;
      renderCards();
    } catch (err) {
      console.error('Failed to load questions.json', err);
    }
  };

  refreshBtn.addEventListener('click', renderCards);
  loadBank();
});

