import { createImage, createDiv, createStats } from './CardElementFactory';

function createSummoningSicknessEffect() {
  const el = document.createElement('div');
  el.classList.add('summoning-sickness');

  for (let i = 0; i < 3; i += 1) {
    const z = document.createElement('span');
    z.textContent = 'z';
    el.appendChild(z);
  }

  return el;
}

/**
 * @param {import('../entities/Card').default} card
 */
function BattleFieldCardElementFactory(card) {
  const el = document.createElement('div');
  el.classList.add('minion');

  if (card.summoningSickness) {
    el.classList.add('minion-tired');
    el.appendChild(createSummoningSicknessEffect());
  }

  el.appendChild(createImage(card.imagePath));
  const stats = createStats(
    createDiv(card.attack, 'stat', 'attack'),
    createDiv(card.health, 'stat', 'health')
  );
  el.appendChild(stats);

  return el;
}

export default BattleFieldCardElementFactory;
