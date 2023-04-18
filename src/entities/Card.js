import CardElementFactory from '../factories/CardElementFactory';

export const TYPES = {
  minion: 'minion',
  spell: 'spell',
  weapon: 'weapon',
};

function resolveImagePath(name) {
  const theName = name.toLowerCase().replaceAll(' ', '-');

  return `./assets/cards/${theName}.png`;
}

function Card(
  name,
  type,
  attack,
  health,
  manaCost,
  description = null,
  fn = null
) {
  this.name = name;
  this.health = health;
  this.type = type;
  this.attack = attack;
  this.description = description;
  this.manaCost = manaCost;
  this.allowedTurn = 0;
  this.imagePath = resolveImagePath(name);
  this.summoningSickness = true;

  this.toAllowedTurn = (currentTurnCount) => {
    this.allowedTurn = currentTurnCount + 1;
    this.summoningSickness = this.allowedTurn > currentTurnCount;
  };

  this.removeSummoningSickness = () => {
    this.summoningSickness = false;
  };

  this.addHealth = (hp) => {
    this.health += hp;
  };

  this.addAttack = (atk) => {
    this.attack += atk;
  };

  /**
   * @param {import('../Game').default} game
   */
  this.action = (game) => {
    fn(game);
  };

  this.elementFactory = (show = true) =>
    new CardElementFactory(show ? this : undefined);

  // This will damage the card and return if the card died
  this.damage = (atk) => {
    this.health -= atk;

    return this.isDied();
  };

  this.isDied = () => this.health <= 0;
}

// We added separate factory function for easier to compose Card instance and lesser arguments
export function SpellCard(
  name,
  attack,
  manaCost,
  description = null,
  fn = null
) {
  return new Card(name, TYPES.spell, attack, 0, manaCost, description, fn);
}

export function MinionCard(
  name,
  attack,
  health,
  manaCost,
  description = null,
  fn = null
) {
  return new Card(
    name,
    TYPES.minion,
    attack,
    health,
    manaCost,
    description,
    fn
  );
}

export function WeaponCard(
  name,
  attack,
  manaCost,
  health = 0,
  description = null,
  fn = null
) {
  return new Card(
    name,
    TYPES.weapon,
    attack,
    health,
    manaCost,
    description,
    fn
  );
}

export default Card;
