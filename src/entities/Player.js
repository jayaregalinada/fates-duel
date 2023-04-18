import shuffleCards from '../utils/shuffleCards';

export const MAX_MANA = 10;
export const MIN_MANA = 0;
export const MAX_HEALTH = 100;
const MANA_INCREMENT = 1;

/**
 * @param {string} name
 * @param {import('./Card').default[]} cardsData
 * @param {import('./Hero').default} hero
 */
function Player(name, cardsData, hero) {
  this.name = name;
  this.health = MAX_HEALTH;
  this.deck = shuffleCards(cardsData);
  this.symbol = Symbol(name);
  this.mana = MIN_MANA;
  this.hero = hero;

  let totalMana = MIN_MANA;

  this.getTotalMana = () => totalMana;

  /**
   * @type {import('./Card').default[]}
   */
  this.cards = [];

  this.deductHealth = (health) => {
    this.health -= health;

    return this.isDead();
  };

  this.draw = () => {
    this.cards.push(this.deck[0]);
    this.deck.splice(0, 1);
  };

  this.incrementTotalMana = () => {
    if (totalMana < MAX_MANA) {
      totalMana += MANA_INCREMENT;
    }
  };

  this.resetMana = () => {
    this.mana = totalMana;
  };

  this.deductMana = (mana) => {
    this.mana -= mana;
  };

  this.isDead = () => this.health <= 0;
}

export default Player;
