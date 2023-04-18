import Player from './entities/Player';
import GameRenderer from './renderers/GameRenderer';
import GameEvent from './events/GameEvent';

// All configuration
const INITIAL_CARD_COUNT = 3;

/**
 * @param {import('./BattleField').default} battleField
 */
export default function Game(battleField) {
  // An indicator that the game alread started
  // To avoid accidentally init() the game again
  let gameStart = 0;

  // The index of which player current turn
  // We don't what this to expose
  // 0 is always the player
  // 1 is always the enemy
  let turnIndex = 0;

  // The counter of turn
  let turnCount = 0;

  /**
   * @type {Document|undefined}
   */
  let doc;

  battleField.setGame(this);

  /**
   * @param {Player} player
   */
  const startDraw = (player) => {
    if (player instanceof Player === false) {
      throw Error('Need players');
    }

    for (let draw = 0; draw < INITIAL_CARD_COUNT; draw += 1) {
      player.draw();
    }
  };

  const getInvertedTurnIndex = () => (turnIndex === 0 ? 1 : 0);

  this.battleField = battleField;

  this.players = battleField.players;

  this.setDocument = (theDoc) => {
    doc = theDoc;
  };

  this.endTurn = () => {
    // Only this function can change the turnIndex
    // The player MUST end their turn to change the turnIndex
    turnIndex = getInvertedTurnIndex();

    // Only this function can increment the turnCount
    // eslint-disable-next-line operator-assignment
    turnCount = turnCount + 1;

    this.dispatchEvent(new GameEvent('endTurn'));
  };

  this.currentPlayer = () => this.players[turnIndex];

  this.currentPlayerIndex = () => turnIndex;

  this.startTurn = () => {
    this.currentPlayer().draw();
    this.currentPlayer().incrementTotalMana();
    this.currentPlayer().resetMana();
    this.dispatchEvent(new GameEvent('startTurn', { turnIndex, turnCount }));
  };

  this.currentEnemy = () => this.players[getInvertedTurnIndex()];

  this.currentTurnCount = () => turnCount;

  this.renderer = undefined;

  this.dispatchEvent = (event) => {
    doc.dispatchEvent(
      new CustomEvent(event.eventType, { detail: event.detail })
    );
    doc.dispatchEvent(new CustomEvent('game:render'));
  };

  /**
   * @param {Window} win
   * @param {Document} theDoc
   */
  this.start = (win, theDoc) => {
    if (gameStart === 1) {
      throw Error('Game already started');
    }

    this.players.forEach((player) => {
      startDraw(player);
    });

    this.renderer = new GameRenderer(this, {
      playerCardsEl: theDoc.getElementById('player-cards'),
      enemyCardsEl: theDoc.getElementById('enemy-cards'),
      playerBattleEl: theDoc.getElementById('player-minions'),
      enemyBattleEl: theDoc.getElementById('enemy-minions'),
      playerHealthEl: theDoc.getElementById('player-health'),
      playerManaEl: theDoc.getElementById('player-mana'),
      enemyHealthEl: theDoc.getElementById('enemy-health'),
      enemyManaEl: theDoc.getElementById('enemy-mana'),
      playerHeroEl: theDoc.getElementById('player-hero'),
      enemyHeroEl: theDoc.getElementById('enemy-hero'),
    });

    // eslint-disable-next-line no-param-reassign
    win.game = this;
    this.setDocument(theDoc);
    this.startTurn();

    this.render();

    gameStart = 1;
  };

  this.render = () => {
    this.renderer.render();
  };

  this.addToField = (cardIndex) => {
    this.battleField.addToField(cardIndex);
  };

  this.addWeapon = (cardIndex, cardTargetIndex) => {
    this.battleField.addWeapon(cardIndex, cardTargetIndex);
  };

  this.addSpell = (cardIndex, cardTargetIndex, targetPlayer) => {
    this.battleField.addSpell(cardIndex, cardTargetIndex, targetPlayer);
  };
}
