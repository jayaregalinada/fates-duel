import { TYPES } from './entities/Card';
import BattleEvent, { EVENT_TYPES } from './events/BattleEvent';

/**
 * @param {import('./entities/Player').default} player
 * @param {import('./entities/Player').default} enemy
 */
export default function BattleField(player, enemy) {
  /**
   * @type {import('./Game').default}
   */
  let game;

  this.players = [player, enemy];

  /**
   * @param {import('./Game').default} theGame
   */
  this.setGame = (theGame) => {
    game = theGame;
  };

  this.getGame = () => game;

  this.fields = {
    [player.symbol]: [],
    [enemy.symbol]: [],
  };

  /**
   * @param {import('./entities/Player').default|null} thePlayer
   * @returns {import('./entities/Player').default}
   */
  const getCurrentPlayer = (thePlayer = null) => {
    /**
     * This will replace the argument thePlayer from the game's current player if not provided
     * @type {import('./entities/Player').default}
     */
    const currentPlayer = thePlayer ?? game.currentPlayer();

    return currentPlayer;
  };

  /**
   * @param {import('./entities/Player').default|null} enemyPlayer
   *
   * @returns {import('./entities/Player').default}
   */
  const getEnemyPlayer = (enemyPlayer = null) => {
    const theEnemyPlayer = enemyPlayer ?? game.currentEnemy();

    return theEnemyPlayer;
  };

  /**
   * @param {import('./entities/Card').default} card
   * @param {import('./entities/Player').default} currentPlayer
   */
  const summon = (card, currentPlayer) => {
    if (card.manaCost <= currentPlayer.mana === false) {
      throw Error('Unable to summon, not enough mana');
    }
    currentPlayer.deductMana(card.manaCost);
  };

  /**
   * @param {import('./entities/Card').default[]} minionCards
   */
  const removeFatigue = (minionCards) => {
    for (let i = 0; i < minionCards.length; i += 1) {
      const minion = minionCards[i];

      if (minion.allowedTurn <= game.currentTurnCount()) {
        minion.removeSummoningSickness();
      }
    }
  };

  this.refreshSummonFatigue = () => {
    const fields = [this.fields[player.symbol], this.fields[enemy.symbol]];
    fields.forEach((minionCards) => {
      removeFatigue(minionCards);
    });
  };

  /**
   * Add minion to the battle field.
   *
   * @param {import('./entities/Card').default} card
   * @param {import('./entities/Player').default} thePlayer
   */
  this.addToField = (cardIndex, thePlayer = null) => {
    const currentPlayer = getCurrentPlayer(thePlayer);

    const card = currentPlayer.cards[cardIndex];

    summon(card, currentPlayer);

    // This will check if the card is a minion
    // If not, it will throw an error
    if (card.type !== TYPES.minion) {
      throw Error('Only minions are allowed to enter the field');
    }

    // This will increment the allowedTurn to check if the card can attack
    card.toAllowedTurn(game.currentTurnCount());

    this.fields[currentPlayer.symbol].push(card);
    currentPlayer.cards.splice(cardIndex, 1);
    game.dispatchEvent(
      new BattleEvent(EVENT_TYPES.addedToField, {
        card,
      })
    );
  };

  /**
   * Weapon will improve the Player's minion HP and ATK
   *
   * @param {number} cardIndex
   * @param {number} cardTargetIndex
   * @param {import('./entities/Player').default|null} thePlayer
   */
  this.addWeapon = (cardIndex, cardTargetIndex, thePlayer = null) => {
    const currentPlayer = getCurrentPlayer(thePlayer);

    const card = currentPlayer.cards[cardIndex];

    summon(card, currentPlayer);

    if (card.type !== TYPES.weapon) {
      throw Error('Only weapon type are allowed');
    }

    /**
     * @type {import('./entities/Card').default}
     */
    const cardTarget = this.fields[currentPlayer.symbol][cardTargetIndex];

    if (cardTarget.type !== TYPES.minion) {
      throw Error('Only minion can benefit to the weapon');
    }

    cardTarget.addHealth(card.health);
    cardTarget.addAttack(card.attack);

    currentPlayer.cards.splice(cardIndex, 1);

    game.dispatchEvent(
      new BattleEvent(EVENT_TYPES.addedWeapon, {
        card,
        cardTarget,
      })
    );
  };

  /**
   * This will add spell to the target card.
   * Spell can target player and enemy's minion
   *
   * @param {number} cardIndex
   * @param {number} cardTargetIndex
   * @param {import('./entities/Player').default} targetPlayer
   * @param {import('./entities/Player').default|null} thePlayer
   */
  this.addSpell = (
    cardIndex,
    cardTargetIndex,
    targetPlayer,
    thePlayer = null
  ) => {
    const currentPlayer = getCurrentPlayer(thePlayer);

    const card = currentPlayer.cards[cardIndex];

    summon(card, currentPlayer);

    if (card.type !== TYPES.spell) {
      throw Error('Only spell type are allowed');
    }

    /**
     * @type {import('./entities/Card').default}
     */
    const cardTarget = this.fields[targetPlayer.symbol][cardTargetIndex];

    if (cardTarget.type !== TYPES.minion) {
      throw Error('Only minion can be targeted to the spell');
    }

    card.action(cardTarget);

    currentPlayer.cards.splice(cardIndex, 1);

    game.dispatchEvent(
      new BattleEvent(EVENT_TYPES.addedSpell, {
        card,
        cardTarget,
      })
    );
  };

  this.attack = (
    cardIndex,
    targetCardIndex,
    targetPlayer = null,
    thePlayer = null
  ) => {
    const currentPlayer = getCurrentPlayer(thePlayer);
    const enemyPlayer = getEnemyPlayer(targetPlayer);

    /**
     * @type {import('./entities/Card').default}
     */
    const card = this.fields[currentPlayer.symbol][cardIndex];

    /**
     * @type {import('./entities/Card').default}
     */
    const targetCard = this.fields[enemyPlayer.symbol][targetCardIndex];

    // Player's card cannot attack because of summoning sickness
    if (card.summoningSickness) {
      throw Error('Card is suffering summoning sickness, cannot attack');
    }

    // The target's card cannot be attack because of summoning sickness
    if (targetCard.summoningSickness) {
      throw Error('Target Card is suffering summoning sickness, cannot damage');
    }

    // Damage both cards
    // Both cards will return true (i.e Die) or false (i.e Live)
    const targetCardStatus = targetCard.damage(card.attack);
    const cardStatus = card.damage(targetCard.attack);

    // If the targetCard dies or health becomes zero (0)
    // Remove the targetCard from the field
    if (targetCardStatus) {
      this.fields[enemyPlayer.symbol].splice(targetCardIndex, 1);
    }

    // If the card dies or health becomes zero (0)
    // Remove the card from the field
    if (cardStatus) {
      this.fields[currentPlayer.symbol].splice(cardIndex, 1);
    }

    game.dispatchEvent(new BattleEvent('attack'));
  };
}
