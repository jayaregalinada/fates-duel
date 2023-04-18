import BattleFieldCardElementFactory from '../factories/BattleFieldCardElementFactory';
import MusicRenderer from './MusicRenderer';
import PlayerInfoRenderer from './PlayerInfoRenderer';

/**
 * @param {HTMLElement} element
 */
function emptyElement(element) {
  while (element.firstElementChild) {
    element.firstElementChild.remove();
  }
}

/**
 * @param  {...HTMLElement} elements
 */
function emptyElements(...elements) {
  elements.forEach((element) => {
    emptyElement(element);
  });
}

/**
 * @param {import('../Game').default} game
 */
function GameRenderer(game, config) {
  this.config = config;

  this.playerInfoRender = new PlayerInfoRenderer(game, config);

  this.musicRenderer = new MusicRenderer();

  /**
   * @param {HTMLElement} playerCardsEl
   * @param {HTMLElement} enemyCardsEl
   */
  this.renderCards = (playerCardsEl, enemyCardsEl) => {
    emptyElements(playerCardsEl, enemyCardsEl);

    const [player, enemy] = game.players;

    player.cards.forEach((card) => {
      playerCardsEl.appendChild(card.elementFactory());
    });
    enemy.cards.forEach((card) => {
      enemyCardsEl.appendChild(card.elementFactory());
    });
  };

  this.renderBattleFields = (playerBattleEl, enemyBattleEl) => {
    game.battleField.refreshSummonFatigue();
    emptyElements(playerBattleEl, enemyBattleEl);

    const [player, enemy] = game.players;

    const playerMinions = game.battleField.fields[player.symbol];
    const enemyMinions = game.battleField.fields[enemy.symbol];

    playerMinions.forEach((minion) => {
      playerBattleEl.appendChild(new BattleFieldCardElementFactory(minion));
    });
    enemyMinions.forEach((minion) => {
      enemyBattleEl.appendChild(new BattleFieldCardElementFactory(minion));
    });
  };

  this.render = () => {
    const { playerCardsEl, enemyCardsEl, playerBattleEl, enemyBattleEl } =
      this.config;

    this.renderCards(playerCardsEl, enemyCardsEl);
    this.renderBattleFields(playerBattleEl, enemyBattleEl);

    this.playerInfoRender.render();

    this.musicRenderer.suffleSongs();
    this.musicRenderer.play();
  };
}

export default GameRenderer;
